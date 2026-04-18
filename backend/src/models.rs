use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TransactionRequest {
    pub transfer_direction: TransferDirection,
    pub amount_eur: f64,
    pub chain: Chain,
    pub wallet_address: String,
    pub travel_rule_info_complete: bool,
    pub wallet_previously_verified: bool,
    pub tx_history_window: i64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TransactionResponse {
    pub decision: Decision,
    pub heuristics: Vec<HeuristicResult>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HeuristicResult {
    pub kind: HeuristicKind,
    pub rationale: &'static str,
    pub score: f64,
}

impl HeuristicResult {
    pub fn new(kind: HeuristicKind, rationale: &'static str, score: f64) -> Self {
        Self {
            kind,
            rationale,
            score: round_score(score),
        }
    }

    pub fn binary(kind: HeuristicKind, triggered: bool, rationale: &'static str) -> Self {
        Self {
            kind,
            rationale,
            score: if triggered { 1.0 } else { 0.0 },
        }
    }
}

fn round_score(score: f64) -> f64 {
    (score.clamp(0.0, 1.0) * 100.0).round() / 100.0
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ApiError {
    pub error: String,
}

#[derive(Debug)]
pub struct HistoricalTransaction {
    pub timestamp: u64,
    pub amount_eur: f64,
    pub token: String,
    pub direction: Direction,
    pub counterparty_address: String,
    pub counterparty_type: CounterpartyType,
}

#[derive(Debug, Clone, Copy, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "PascalCase")]
pub enum Direction {
    Inbound,
    Outbound,
}

#[derive(Debug, Clone, Copy, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "PascalCase")]
pub enum TransferDirection {
    Inbound,
    Outbound,
}

impl TransferDirection {
    pub fn as_analyzed_wallet_direction(self) -> Direction {
        match self {
            TransferDirection::Inbound => Direction::Outbound,
            TransferDirection::Outbound => Direction::Inbound,
        }
    }
}

#[derive(Debug, Clone, Copy, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub enum Chain {
    Ethereum,
}

#[derive(Debug, Clone, Copy, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "PascalCase")]
pub enum CounterpartyType {
    Casp,
    Defi,
    Bridge,
    Unknown,
}

#[derive(Debug, Serialize, PartialEq, Eq)]
#[serde(rename_all = "PascalCase")]
pub enum Decision {
    Allow,
    AllowWithMonitoring,
    VerifyOwnership,
    ManualReview,
    Hold,
}

#[derive(Debug, Clone, Copy, Serialize, PartialEq, Eq)]
#[serde(rename_all = "PascalCase")]
pub enum HeuristicKind {
    MissingTransferInformation,
    SelfHostedAboveThreshold,
    LinkedTransfers,
    PassThroughBehavior,
    HighVelocity,
    HigherRiskCounterparties,
    BridgeObfuscationExposure,
    UnclearSourceOfFunds,
}
