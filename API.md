# API Documentation

## Base URL

Local development:

```text
http://127.0.0.1:3000
```

## Authentication

The API itself does not currently require client authentication.

The backend requires an Etherscan API key in:

```text
backend/.env
```

```env
ETHERSCAN_API_KEY=your_key_here
```

## POST `/transaction`

Screens a counterparty wallet involved in a transfer with the company's treasury.

The wallet sent in `walletAddress` is the analyzed wallet.

`transferDirection` is always relative to the company's treasury:

| Value | Meaning |
| --- | --- |
| `Inbound` | Funds move from the analyzed wallet into the company's treasury. |
| `Outbound` | Funds move from the company's treasury to the analyzed wallet. |

## Request Body

All fields are required.

```json
{
  "transferDirection": "Outbound",
  "amountEur": 1200.0,
  "chain": "Ethereum",
  "walletAddress": "0xPUT_WALLET_ADDRESS_HERE",
  "travelRuleInfoComplete": true,
  "walletPreviouslyVerified": false,
  "txHistoryWindow": 100
}
```

### Fields

| Field | Type | Description |
| --- | --- | --- |
| `transferDirection` | enum | Direction of the transfer relative to the company's treasury. |
| `amountEur` | number | Current transfer amount in EUR. Must be positive. |
| `chain` | enum | Blockchain network. Currently only `Ethereum`. |
| `walletAddress` | string | Counterparty wallet address being analyzed. Must be an Ethereum address. |
| `travelRuleInfoComplete` | boolean | Whether required Travel Rule information for this specific transfer is complete. |
| `walletPreviouslyVerified` | boolean | Whether ownership/control of this wallet was already verified by the firm. |
| `txHistoryWindow` | integer | Number of recent records to analyze. Current maximum is `500`. |

### Enum Values

`transferDirection`:

```text
Inbound
Outbound
```

`chain`:

```text
Ethereum
```

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

## Response Body

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

### Response Fields

| Field | Type | Description |
| --- | --- | --- |
| `decision` | enum | Final decision for the transfer. |
| `heuristics` | array | Only heuristics that triggered. Empty when decision is `Allow`. |

### Decision Values

| Decision | Meaning |
| --- | --- |
| `Allow` | No relevant risk signal was triggered. |
| `AllowWithMonitoring` | Weak or medium signal triggered; transfer can proceed with monitoring. |
| `VerifyOwnership` | Ownership/control verification is required before proceeding. |
| `ManualReview` | Strong wallet-risk signal triggered; human review is required. |
| `Hold` | Required Travel Rule information is missing. |

### Heuristic Values

| Heuristic | Meaning |
| --- | --- |
| `MissingTransferInformation` | Required Travel Rule information for this transfer is incomplete. |
| `SelfHostedAboveThreshold` | Unknown/self-hosted-like wallet and transfer amount is above `1,000 EUR`. |
| `LinkedTransfers` | Multiple smaller transfers look linked and exceed `1,000 EUR` together. |
| `PassThroughBehavior` | Funds commonly enter and quickly leave the analyzed wallet. |
| `HighVelocity` | Wallet has unusually high short-window activity. |
| `HigherRiskCounterparties` | Wallet frequently interacts with DeFi, bridges, or unknown addresses. |
| `BridgeObfuscationExposure` | Wallet has bridge/privacy-tool-like exposure. |
| `UnclearSourceOfFunds` | Inbound funds are fragmented across many sources. |

## Error Responses

Validation errors return `400`.

```json
{
  "error": "walletAddress must be a valid Ethereum address"
}
```

External provider or upstream errors return `502`.

```json
{
  "error": "missing ETHERSCAN_API_KEY env var"
}
```

## Notes

- The API currently supports Ethereum only.
- Transaction history is fetched from Etherscan.
- Token pricing is fetched from Coinbase and DexScreener.
- Scores are normalized from `0.00` to `1.00`.
- The public response only includes heuristics that triggered.
