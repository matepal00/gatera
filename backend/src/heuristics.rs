use crate::counterparty::classify_counterparty;
use crate::models::{
    CounterpartyType, Decision, Direction, HeuristicKind, HeuristicResult, HistoricalTransaction,
    TransactionRequest,
};
use std::collections::HashMap;

const SECONDS_1H: u64 = 60 * 60;
const SECONDS_24H: u64 = 24 * SECONDS_1H;

pub fn decide(transaction: &TransactionRequest, heuristics: &[HeuristicResult]) -> Decision {
    let triggered = |kind| {
        heuristics
            .iter()
            .any(|heuristic| heuristic.kind == kind && heuristic.score > 0.0)
    };

    if triggered(HeuristicKind::MissingTransferInformation) {
        return Decision::Hold;
    }

    if triggered(HeuristicKind::BridgeObfuscationExposure)
        || triggered(HeuristicKind::UnclearSourceOfFunds)
        || triggered(HeuristicKind::PassThroughBehavior)
    {
        return Decision::ManualReview;
    }

    if triggered(HeuristicKind::SelfHostedAboveThreshold) && !transaction.wallet_previously_verified
    {
        return Decision::VerifyOwnership;
    }

    if triggered(HeuristicKind::LinkedTransfers)
        || triggered(HeuristicKind::HighVelocity)
        || triggered(HeuristicKind::HigherRiskCounterparties)
    {
        return Decision::AllowWithMonitoring;
    }

    Decision::Allow
}

pub fn calculate_heuristics(
    transaction: &TransactionRequest,
    history: &[HistoricalTransaction],
) -> Vec<HeuristicResult> {
    vec![
        missing_transfer_information(transaction),
        self_hosted_above_threshold(transaction),
        linked_transfers(transaction, history),
        pass_through_behavior(history),
        high_velocity(history),
        higher_risk_counterparties(transaction, history),
        bridge_obfuscation_exposure(history),
        unclear_source_of_funds(history),
    ]
}

fn missing_transfer_information(transaction: &TransactionRequest) -> HeuristicResult {
    HeuristicResult::binary(
        HeuristicKind::MissingTransferInformation,
        !transaction.travel_rule_info_complete,
        "Required Travel Rule information for this transfer is incomplete",
    )
}

fn self_hosted_above_threshold(transaction: &TransactionRequest) -> HeuristicResult {
    let wallet_type = classify_counterparty(&transaction.wallet_address);
    let is_self_hosted_like = wallet_type == CounterpartyType::Unknown;

    HeuristicResult::binary(
        HeuristicKind::SelfHostedAboveThreshold,
        is_self_hosted_like && transaction.amount_eur > 1_000.0,
        "Unknown analyzed wallet is treated as self-hosted-like and transfer amount is above 1,000 EUR",
    )
}

fn linked_transfers(
    transaction: &TransactionRequest,
    history: &[HistoricalTransaction],
) -> HeuristicResult {
    let now = latest_timestamp(history);
    let expected_history_direction = transaction
        .transfer_direction
        .as_analyzed_wallet_direction();
    let recent = history.iter().filter(|tx| {
        tx.direction == expected_history_direction
            && now.saturating_sub(tx.timestamp) <= SECONDS_24H
            && tx.amount_eur < 1_000.0
    });

    let mut groups: HashMap<(Direction, String), Vec<&HistoricalTransaction>> = HashMap::new();
    for tx in recent {
        groups
            .entry((tx.direction, tx.counterparty_address.clone()))
            .or_default()
            .push(tx);
    }

    let max_intensity = groups
        .values()
        .map(|txs| {
            let sum: f64 = txs.iter().map(|tx| tx.amount_eur).sum();
            let count_score = txs.len() as f64 / 3.0;
            let amount_score = sum / 1_000.0;
            if txs.len() >= 3 && sum > 1_000.0 {
                count_score.min(amount_score).min(1.0)
            } else {
                0.0
            }
        })
        .fold(0.0, f64::max);

    HeuristicResult::new(
        HeuristicKind::LinkedTransfers,
        "At least three sub-1,000 EUR transfers to the same counterparty exceed 1,000 EUR in 24h",
        max_intensity,
    )
}

fn pass_through_behavior(history: &[HistoricalTransaction]) -> HeuristicResult {
    let inbound: Vec<_> = history
        .iter()
        .filter(|tx| tx.direction == Direction::Inbound)
        .collect();

    let pass_through_events = inbound
        .iter()
        .filter(|inbound_tx| {
            history.iter().any(|candidate| {
                candidate.direction == Direction::Outbound
                    && candidate.timestamp >= inbound_tx.timestamp
                    && candidate.timestamp - inbound_tx.timestamp <= SECONDS_1H
                    && candidate.amount_eur >= inbound_tx.amount_eur * 0.7
            })
        })
        .count();

    let ratio = if inbound.is_empty() {
        0.0
    } else {
        pass_through_events as f64 / inbound.len() as f64
    };

    let score = if ratio >= 0.5 && inbound.len() >= 2 {
        ratio
    } else {
        0.0
    };

    HeuristicResult::new(
        HeuristicKind::PassThroughBehavior,
        "At least 50% of inbound transfers are followed by a >=70% outbound transfer within 60 minutes",
        score,
    )
}

fn high_velocity(history: &[HistoricalTransaction]) -> HeuristicResult {
    let now = latest_timestamp(history);
    let mut recent: Vec<_> = history
        .iter()
        .filter(|tx| now.saturating_sub(tx.timestamp) <= SECONDS_24H)
        .collect();
    recent.sort_by_key(|tx| tx.timestamp);

    let tx_count_24h = recent.len();
    let max_txs_in_1h = recent
        .iter()
        .enumerate()
        .map(|(index, tx)| {
            recent[index..]
                .iter()
                .take_while(|candidate| {
                    candidate.timestamp.saturating_sub(tx.timestamp) <= SECONDS_1H
                })
                .count()
        })
        .max()
        .unwrap_or(0);

    let avg_gap_minutes = if recent.len() < 2 {
        f64::MAX
    } else {
        let total_gap_seconds: u64 = recent
            .windows(2)
            .map(|pair| pair[1].timestamp.saturating_sub(pair[0].timestamp))
            .sum();
        total_gap_seconds as f64 / (recent.len() - 1) as f64 / 60.0
    };

    let count_score = if tx_count_24h >= 20 {
        (tx_count_24h as f64 / 20.0).min(1.0)
    } else {
        0.0
    };
    let hour_score = if max_txs_in_1h >= 10 {
        (max_txs_in_1h as f64 / 10.0).min(1.0)
    } else {
        0.0
    };
    let gap_score = if tx_count_24h >= 10 && avg_gap_minutes < 10.0 {
        ((10.0 - avg_gap_minutes) / 10.0).clamp(0.0, 1.0)
    } else {
        0.0
    };
    let score = count_score.max(hour_score).max(gap_score);

    HeuristicResult::new(
        HeuristicKind::HighVelocity,
        "High short-window activity: >=20 tx/24h, >=10 tx/1h, or >=10 tx/24h with avg gap below 10 minutes",
        score,
    )
}

fn higher_risk_counterparties(
    transaction: &TransactionRequest,
    history: &[HistoricalTransaction],
) -> HeuristicResult {
    if history.is_empty() {
        let wallet_type = classify_counterparty(&transaction.wallet_address);

        return HeuristicResult::binary(
            HeuristicKind::HigherRiskCounterparties,
            is_higher_risk_counterparty(wallet_type),
            "Analyzed wallet type is higher risk and no chain history was found",
        );
    }

    let high_risk_count = history
        .iter()
        .filter(|tx| is_higher_risk_counterparty(tx.counterparty_type))
        .count();
    let total_volume: f64 = history.iter().map(|tx| tx.amount_eur).sum();
    let high_risk_volume: f64 = history
        .iter()
        .filter(|tx| is_higher_risk_counterparty(tx.counterparty_type))
        .map(|tx| tx.amount_eur)
        .sum();

    let ratio = high_risk_count as f64 / history.len() as f64;
    let volume_ratio = if total_volume <= 0.0 {
        0.0
    } else {
        high_risk_volume / total_volume
    };

    let score = if ratio >= 0.4 || volume_ratio >= 0.5 {
        ratio.max(volume_ratio)
    } else {
        0.0
    };

    HeuristicResult::new(
        HeuristicKind::HigherRiskCounterparties,
        "At least 40% of tx count or 50% of volume is linked to DeFi, bridges, or unknown counterparties",
        score,
    )
}

fn bridge_obfuscation_exposure(history: &[HistoricalTransaction]) -> HeuristicResult {
    let bridge_count = history
        .iter()
        .filter(|tx| tx.counterparty_type == CounterpartyType::Bridge)
        .count();
    let bridge_ratio = if history.is_empty() {
        0.0
    } else {
        bridge_count as f64 / history.len() as f64
    };

    let score = if bridge_count >= 2 || bridge_ratio >= 0.15 {
        (bridge_count as f64 / 2.0)
            .max(bridge_ratio / 0.15)
            .min(1.0)
    } else {
        0.0
    };

    HeuristicResult::new(
        HeuristicKind::BridgeObfuscationExposure,
        "At least two bridge/privacy-tool interactions or >=15% bridge exposure in the fetched history",
        score,
    )
}

fn unclear_source_of_funds(history: &[HistoricalTransaction]) -> HeuristicResult {
    let now = latest_timestamp(history);
    let inbound: Vec<_> = history
        .iter()
        .filter(|tx| {
            tx.direction == Direction::Inbound
                && now.saturating_sub(tx.timestamp) <= 30 * SECONDS_24H
        })
        .collect();

    let mut volume_by_counterparty: HashMap<&str, f64> = HashMap::new();
    for tx in &inbound {
        *volume_by_counterparty
            .entry(tx.counterparty_address.as_str())
            .or_default() += tx.amount_eur;
    }

    let total_volume: f64 = inbound.iter().map(|tx| tx.amount_eur).sum();
    let largest_counterparty_share = if total_volume <= 0.0 {
        0.0
    } else {
        volume_by_counterparty.values().copied().fold(0.0, f64::max) / total_volume
    };
    let unique_counterparties = volume_by_counterparty.len();
    let score = if unique_counterparties >= 8 && largest_counterparty_share < 0.25 {
        let counterparty_score = (unique_counterparties as f64 / 8.0).min(1.0);
        let concentration_score = ((0.25 - largest_counterparty_share) / 0.25).clamp(0.0, 1.0);
        counterparty_score.min(concentration_score)
    } else {
        0.0
    };

    HeuristicResult::new(
        HeuristicKind::UnclearSourceOfFunds,
        "At least eight unique inbound counterparties and no source contributes 25% or more of inbound volume",
        score,
    )
}

fn is_higher_risk_counterparty(counterparty_type: CounterpartyType) -> bool {
    matches!(
        counterparty_type,
        CounterpartyType::Defi | CounterpartyType::Bridge | CounterpartyType::Unknown
    )
}

fn latest_timestamp(history: &[HistoricalTransaction]) -> u64 {
    history
        .iter()
        .map(|tx| tx.timestamp)
        .max()
        .unwrap_or_default()
}
