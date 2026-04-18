use reqwest::Client;
use serde::Deserialize;
use std::collections::HashMap;

const COINBASE_PRICE_URL_PREFIX: &str = "https://api.coinbase.com/v2/prices";
const DEXSCREENER_TOKENS_URL_PREFIX: &str = "https://api.dexscreener.com/tokens/v1";
const ETHEREUM_DEXSCREENER_CHAIN_ID: &str = "ethereum";
const DEXSCREENER_MAX_ADDRESSES: usize = 30;

pub async fn fetch_eth_price_eur(client: &Client) -> Result<f64, String> {
    fetch_coinbase_spot_price_eur(client, "ETH").await
}

pub async fn fetch_token_prices_eur(
    client: &Client,
    token_addresses: &[String],
) -> Result<HashMap<String, f64>, String> {
    if token_addresses.is_empty() {
        return Ok(HashMap::new());
    }

    let usd_eur = fetch_coinbase_spot_price_eur(client, "USD")
        .await
        .unwrap_or(0.93);
    let mut prices = HashMap::new();

    for chunk in token_addresses.chunks(DEXSCREENER_MAX_ADDRESSES) {
        let token_addresses = chunk.join(",");
        let url = format!(
            "{DEXSCREENER_TOKENS_URL_PREFIX}/{ETHEREUM_DEXSCREENER_CHAIN_ID}/{token_addresses}"
        );
        let response: Vec<DexScreenerPair> = client
            .get(url)
            .send()
            .await
            .map_err(|error| format!("dexscreener token price request failed: {error}"))?
            .error_for_status()
            .map_err(|error| {
                format!("dexscreener token price api returned an error status: {error}")
            })?
            .json()
            .await
            .map_err(|error| format!("invalid dexscreener token price json response: {error}"))?;

        let mut best_liquidity_by_address: HashMap<String, f64> = HashMap::new();
        for pair in response {
            let token_address = pair.base_token.address.to_ascii_lowercase();
            let Some(price_usd) = pair.price_usd.and_then(|price| price.parse::<f64>().ok()) else {
                continue;
            };
            if price_usd <= 0.0 {
                continue;
            }

            let liquidity_usd = pair
                .liquidity
                .and_then(|liquidity| liquidity.usd)
                .unwrap_or_default();
            let current_best = best_liquidity_by_address
                .get(&token_address)
                .copied()
                .unwrap_or(-1.0);
            if liquidity_usd >= current_best {
                best_liquidity_by_address.insert(token_address.clone(), liquidity_usd);
                prices.insert(token_address, price_usd * usd_eur);
            }
        }
    }

    Ok(prices)
}

async fn fetch_coinbase_spot_price_eur(client: &Client, symbol: &str) -> Result<f64, String> {
    let url = format!("{COINBASE_PRICE_URL_PREFIX}/{symbol}-EUR/spot");
    let response: CoinbasePriceResponse = client
        .get(url)
        .send()
        .await
        .map_err(|error| format!("{symbol}/EUR price request failed: {error}"))?
        .error_for_status()
        .map_err(|error| format!("{symbol}/EUR price api returned an error status: {error}"))?
        .json()
        .await
        .map_err(|error| format!("invalid {symbol}/EUR price api json response: {error}"))?;

    let price = response
        .data
        .amount
        .parse::<f64>()
        .map_err(|error| format!("invalid {symbol}/EUR price amount: {error}"))?;

    if price <= 0.0 {
        return Err(format!(
            "price api returned non-positive {symbol}/EUR price"
        ));
    }

    Ok(price)
}

#[derive(Debug, Deserialize)]
struct CoinbasePriceResponse {
    data: CoinbasePriceData,
}

#[derive(Debug, Deserialize)]
struct CoinbasePriceData {
    amount: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct DexScreenerPair {
    base_token: DexScreenerToken,
    price_usd: Option<String>,
    liquidity: Option<DexScreenerLiquidity>,
}

#[derive(Debug, Deserialize)]
struct DexScreenerToken {
    address: String,
}

#[derive(Debug, Deserialize)]
struct DexScreenerLiquidity {
    usd: Option<f64>,
}
