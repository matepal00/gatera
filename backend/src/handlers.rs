use crate::ethereum::fetch_transaction_history;
use crate::heuristics::{calculate_heuristics, decide};
use crate::models::{ApiError, TransactionRequest, TransactionResponse};
use crate::utils::is_eth_address;
use axum::{Json, http::StatusCode};
use reqwest::Client;
use std::time::Duration;

const MAX_HISTORY_TXS: usize = 500;

pub async fn evaluate_transaction(
    Json(transaction): Json<TransactionRequest>,
) -> Result<Json<TransactionResponse>, (StatusCode, Json<ApiError>)> {
    validate_request(&transaction)?;

    let client = Client::builder()
        .timeout(Duration::from_secs(60))
        .build()
        .map_err(internal_error)?;

    let history = fetch_transaction_history(&client, &transaction)
        .await
        .map_err(internal_error)?;
    let mut heuristics = calculate_heuristics(&transaction, &history);
    let decision = decide(&transaction, &heuristics);
    heuristics.retain(|heuristic| heuristic.score > 0.0);

    Ok(Json(TransactionResponse {
        decision,
        heuristics,
    }))
}

fn validate_request(transaction: &TransactionRequest) -> Result<(), (StatusCode, Json<ApiError>)> {
    if transaction.amount_eur <= 0.0 || !transaction.amount_eur.is_finite() {
        return Err(bad_request("amountEur must be a positive finite number"));
    }

    if transaction.tx_history_window <= 0 {
        return Err(bad_request("txHistoryWindow must be greater than zero"));
    }

    if transaction.tx_history_window as usize > MAX_HISTORY_TXS {
        return Err(bad_request(
            "txHistoryWindow cannot be greater than 500 in this MVP",
        ));
    }

    if !is_eth_address(&transaction.wallet_address) {
        return Err(bad_request(
            "walletAddress must be a valid Ethereum address",
        ));
    }

    Ok(())
}

fn bad_request(message: &str) -> (StatusCode, Json<ApiError>) {
    (
        StatusCode::BAD_REQUEST,
        Json(ApiError {
            error: message.to_owned(),
        }),
    )
}

fn internal_error(error: impl ToString) -> (StatusCode, Json<ApiError>) {
    (
        StatusCode::BAD_GATEWAY,
        Json(ApiError {
            error: error.to_string(),
        }),
    )
}
