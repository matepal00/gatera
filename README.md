# Wallet Transfer Screening Process

## What The API Does

The company provides one wallet address.

This is the wallet used by the counterparty in a transfer with the company's treasury.

The transfer direction is always described from the company's treasury perspective:

| Direction | Meaning |
| --- | --- |
| `Inbound` | Money comes from the analyzed wallet into the company's treasury. |
| `Outbound` | Money leaves the company's treasury and goes to the analyzed wallet. |

We do not rely on the caller to tell us whether the wallet is risky.

We check the wallet ourselves.

## Step 1: Get Wallet History

We fetch recent Ethereum activity for the analyzed wallet:

- normal ETH transactions
- ERC-20 token transfers

Then we calculate EUR values for assets where pricing is available.

## Step 2: Label Known Counterparties

For each historical wallet interaction, we try to label the other address:

- CASP / exchange
- DeFi
- bridge
- unknown

`Unknown` does not mean bad.

It means we cannot confidently identify the address.

For risk controls, unknown wallets are treated as self-hosted-like.

## Step 3: Check Procedural Triggers

We check whether this transfer has missing required Travel Rule information.

If required information is missing, the decision is:

```text
Hold
```

This means the transfer should not be completed automatically until the missing information is collected.

We also check whether:

- the analyzed wallet is unknown / self-hosted-like
- the transfer is above `1,000 EUR`
- the wallet was not previously verified

If all are true, the decision is:

```text
VerifyOwnership
```

## Step 4: Check Wallet Behavior

We analyze the wallet's historical behavior:

- Does money quickly come in and go out again?
- Are there many transactions in a short time?
- Is the wallet mostly interacting with unknown, DeFi, or bridge addresses?
- Has it interacted with bridges?
- Are funds coming from many unrelated sources?
- Does it look like transfers were split into smaller amounts?

## Step 5: Make A Decision

### `Hold`

Required Travel Rule information for this transfer is missing.

### `ManualReview`

The wallet shows strong risk signals, such as:

- pass-through behavior
- bridge exposure
- unclear source of funds

### `VerifyOwnership`

The wallet is unknown / self-hosted-like, the transfer is above `1,000 EUR`, and the wallet was not previously verified.

### `AllowWithMonitoring`

The wallet does not need immediate manual review or ownership verification, but at least one weaker risk or procedural signal is present.

### `Allow`

No relevant risk signal was triggered.

## Response

The API returns:

- the final decision
- only the heuristics that actually triggered

Each triggered heuristic includes:

- a short reason
- a score from `0.00` to `1.00`

Higher score means the signal is stronger.
