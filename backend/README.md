# Gatera Backend

Rust API for wallet transfer screening. The service exposes a single MVP endpoint:

```text
POST /transaction
```

It evaluates the wallet on the other side of a treasury transfer and returns a final decision with only the triggered heuristics.

## Requirements

- Rust toolchain
- An Etherscan API key for the current chain data provider

## Environment

Create `backend/.env`:

```env
ETHERSCAN_API_KEY=your_key_here
```

The `.env` file is ignored by git.

## Run Locally

From the backend directory:

```bash
cargo run
```

The API listens on:

```text
http://127.0.0.1:3000
```

The server logs startup information with `tracing`.

## Example Request

```bash
curl -X POST http://127.0.0.1:3000/transaction \
  -H 'content-type: application/json' \
  -d '{
    "transferDirection": "Outbound",
    "amountEur": 1200.0,
    "chain": "Ethereum",
    "walletAddress": "0xPUT_WALLET_ADDRESS_HERE",
    "travelRuleInfoComplete": true,
    "walletPreviouslyVerified": false,
    "txHistoryWindow": 100
  }'
```

## Response Shape

```json
{
  "decision": "VerifyOwnership",
  "heuristics": [
    {
      "kind": "SelfHostedAboveThreshold",
      "rationale": "Unknown analyzed wallet is treated as self-hosted-like and transfer amount is above 1,000 EUR",
      "score": 1.0
    }
  ]
}
```

## Development Checks

```bash
cargo fmt
cargo check
```

## Notes

- The backend currently uses Etherscan for account history.
- Token pricing is fetched from Coinbase and DexScreener.
- Scores are normalized from `0.00` to `1.00`.
- The public response includes only triggered heuristics.
- If the backend runs on port `3000`, run the frontend on another port, for example `3001`.
