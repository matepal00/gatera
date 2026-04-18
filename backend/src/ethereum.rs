use crate::counterparty::classify_counterparty;
use crate::models::{Chain, Direction, HistoricalTransaction, TransactionRequest};
use crate::pricing::{fetch_eth_price_eur, fetch_token_prices_eur};
use reqwest::Client;
use serde::Deserialize;
use std::collections::HashSet;
use std::env;
use tokio::time::{Duration, sleep};

const ETHERSCAN_API_URL: &str = "https://api.etherscan.io/v2/api";
const ETHERSCAN_ETHEREUM_CHAIN_ID: &str = "1";
const ETH_DECIMALS: i32 = 18;
const ETHERSCAN_PAGE_SIZE: usize = 100;
const ETHERSCAN_REQUEST_DELAY: Duration = Duration::from_millis(400);

pub async fn fetch_transaction_history(
    client: &Client,
    transaction: &TransactionRequest,
) -> Result<Vec<HistoricalTransaction>, String> {
    match transaction.chain {
        Chain::Ethereum => {
            fetch_ethereum_transaction_history(
                client,
                &transaction.wallet_address,
                transaction.tx_history_window as usize,
            )
            .await
        }
    }
}

async fn fetch_ethereum_transaction_history(
    client: &Client,
    wallet_address: &str,
    limit: usize,
) -> Result<Vec<HistoricalTransaction>, String> {
    let api_key = env::var("ETHERSCAN_API_KEY")
        .map_err(|_| "missing ETHERSCAN_API_KEY env var".to_owned())?;
    let eth_price_eur = fetch_eth_price_eur(client).await?;

    let mut normal_txs = fetch_normal_transactions(client, wallet_address, limit, &api_key).await?;
    let token_txs = fetch_erc20_token_transfers(client, wallet_address, limit, &api_key).await?;
    let token_prices = fetch_token_prices_eur(client, &unique_token_addresses(&token_txs)).await?;
    let mut erc20_txs = map_token_transfers(wallet_address, token_txs, &token_prices);

    normal_txs.append(&mut erc20_txs);
    normal_txs.sort_by(|left, right| right.timestamp.cmp(&left.timestamp));
    normal_txs.truncate(limit);

    for tx in normal_txs.iter_mut().filter(|tx| tx.token == "ETH") {
        tx.amount_eur *= eth_price_eur;
    }

    normal_txs.retain(|tx| tx.amount_eur > 0.0);

    Ok(normal_txs)
}

async fn fetch_normal_transactions(
    client: &Client,
    wallet_address: &str,
    limit: usize,
    api_key: &str,
) -> Result<Vec<HistoricalTransaction>, String> {
    let wallet_address = wallet_address.to_ascii_lowercase();
    let mut mapped_transactions = Vec::new();
    let mut page = 1;

    while mapped_transactions.len() < limit {
        let transactions = fetch_etherscan_page::<NormalTransaction>(
            client,
            "txlist",
            wallet_address.as_str(),
            page,
            api_key,
        )
        .await?;
        let page_len = transactions.len();

        mapped_transactions.extend(
            transactions
                .into_iter()
                .filter(|tx| tx.is_error.as_deref() != Some("1"))
                .filter_map(|tx| map_normal_transaction(&wallet_address, tx)),
        );

        if page_len < ETHERSCAN_PAGE_SIZE {
            break;
        }
        page += 1;
    }

    mapped_transactions.truncate(limit);

    Ok(mapped_transactions)
}

async fn fetch_erc20_token_transfers(
    client: &Client,
    wallet_address: &str,
    limit: usize,
    api_key: &str,
) -> Result<Vec<TokenTransfer>, String> {
    let mut transfers = Vec::new();
    let mut page = 1;

    while transfers.len() < limit {
        let page_transfers =
            fetch_etherscan_page::<TokenTransfer>(client, "tokentx", wallet_address, page, api_key)
                .await?;
        let page_len = page_transfers.len();

        transfers.extend(page_transfers);

        if page_len < ETHERSCAN_PAGE_SIZE {
            break;
        }
        page += 1;
    }

    transfers.truncate(limit);

    Ok(transfers)
}

async fn fetch_etherscan_page<T>(
    client: &Client,
    action: &str,
    wallet_address: &str,
    page: usize,
    api_key: &str,
) -> Result<Vec<T>, String>
where
    T: for<'de> Deserialize<'de>,
{
    let page = page.to_string();
    let offset = ETHERSCAN_PAGE_SIZE.to_string();

    sleep(ETHERSCAN_REQUEST_DELAY).await;

    let response: EtherscanResponse<T> = client
        .get(ETHERSCAN_API_URL)
        .query(&[
            ("chainid", ETHERSCAN_ETHEREUM_CHAIN_ID),
            ("module", "account"),
            ("action", action),
            ("address", wallet_address),
            ("startblock", "0"),
            ("endblock", "99999999"),
            ("page", page.as_str()),
            ("offset", offset.as_str()),
            ("sort", "desc"),
            ("apikey", api_key),
        ])
        .send()
        .await
        .map_err(|error| format!("etherscan {action} request failed: {error}"))?
        .error_for_status()
        .map_err(|error| format!("etherscan {action} returned an error status: {error}"))?
        .json()
        .await
        .map_err(|error| format!("invalid etherscan {action} json response: {error}"))?;

    response.into_result(action)
}

fn map_normal_transaction(
    wallet_address: &str,
    tx: NormalTransaction,
) -> Option<HistoricalTransaction> {
    let from_lower = tx.from.to_ascii_lowercase();
    let to_lower = tx.to.to_ascii_lowercase();
    let direction = if to_lower == wallet_address {
        Direction::Inbound
    } else if from_lower == wallet_address {
        Direction::Outbound
    } else {
        return None;
    };
    let value_wei = tx.value.parse::<f64>().ok()?;
    let amount_eth = value_wei / 10_f64.powi(ETH_DECIMALS);
    if amount_eth <= 0.0 {
        return None;
    }

    let counterparty_address = match direction {
        Direction::Inbound => tx.from,
        Direction::Outbound => tx.to,
    };
    let counterparty_type = classify_counterparty(&counterparty_address);

    Some(HistoricalTransaction {
        timestamp: tx.time_stamp.parse().unwrap_or_default(),
        amount_eur: amount_eth,
        token: "ETH".to_owned(),
        direction,
        counterparty_address,
        counterparty_type,
    })
}

fn map_token_transfers(
    wallet_address: &str,
    transfers: Vec<TokenTransfer>,
    token_prices: &std::collections::HashMap<String, f64>,
) -> Vec<HistoricalTransaction> {
    let wallet_address = wallet_address.to_ascii_lowercase();

    transfers
        .into_iter()
        .filter_map(|transfer| {
            let from_lower = transfer.from.to_ascii_lowercase();
            let to_lower = transfer.to.to_ascii_lowercase();
            let direction = if to_lower == wallet_address {
                Direction::Inbound
            } else if from_lower == wallet_address {
                Direction::Outbound
            } else {
                return None;
            };

            let token_address = transfer.contract_address.to_ascii_lowercase();
            let price_eur = token_prices.get(&token_address)?;
            let decimals = transfer.token_decimal.parse::<i32>().ok()?;
            let raw_amount = transfer.value.parse::<f64>().ok()?;
            let token_amount = raw_amount / 10_f64.powi(decimals);
            let amount_eur = token_amount * price_eur;
            if amount_eur <= 0.0 {
                return None;
            }

            let counterparty_address = match direction {
                Direction::Inbound => transfer.from,
                Direction::Outbound => transfer.to,
            };
            let counterparty_type = classify_counterparty(&counterparty_address);

            Some(HistoricalTransaction {
                timestamp: transfer.time_stamp.parse().unwrap_or_default(),
                amount_eur,
                token: transfer.token_symbol,
                direction,
                counterparty_address,
                counterparty_type,
            })
        })
        .collect()
}

fn unique_token_addresses(transfers: &[TokenTransfer]) -> Vec<String> {
    transfers
        .iter()
        .map(|transfer| transfer.contract_address.to_ascii_lowercase())
        .collect::<HashSet<_>>()
        .into_iter()
        .collect()
}

#[derive(Debug, Deserialize)]
struct EtherscanResponse<T> {
    status: String,
    message: String,
    result: EtherscanResult<T>,
}

impl<T> EtherscanResponse<T> {
    fn into_result(self, action: &str) -> Result<Vec<T>, String> {
        match self.result {
            EtherscanResult::Items(items) if self.status == "1" => Ok(items),
            EtherscanResult::Items(items) if self.message == "No transactions found" => Ok(items),
            EtherscanResult::Message(message) if message == "No transactions found" => {
                Ok(Vec::new())
            }
            EtherscanResult::Message(message) => {
                Err(format!("etherscan {action} error: {message}"))
            }
            EtherscanResult::Items(_) => Err(format!(
                "etherscan {action} error: status={}, message={}",
                self.status, self.message
            )),
        }
    }
}

#[derive(Debug, Deserialize)]
#[serde(untagged)]
enum EtherscanResult<T> {
    Items(Vec<T>),
    Message(String),
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct NormalTransaction {
    time_stamp: String,
    from: String,
    to: String,
    value: String,
    is_error: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct TokenTransfer {
    time_stamp: String,
    from: String,
    to: String,
    value: String,
    contract_address: String,
    token_symbol: String,
    token_decimal: String,
}
