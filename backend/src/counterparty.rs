use crate::models::CounterpartyType;

pub fn classify_counterparty(counterparty_address: &str) -> CounterpartyType {
    let normalized_address = counterparty_address.to_ascii_lowercase();

    if address_in(&normalized_address, KNOWN_BRIDGES) {
        return CounterpartyType::Bridge;
    }

    if address_in(&normalized_address, KNOWN_DEFI_PROTOCOLS) {
        return CounterpartyType::Defi;
    }

    if address_in(&normalized_address, KNOWN_CASPS) {
        return CounterpartyType::Casp;
    }

    CounterpartyType::Unknown
}

fn address_in(address: &str, known_addresses: &[KnownAddress]) -> bool {
    known_addresses
        .iter()
        .any(|known_address| known_address.address == address)
}

struct KnownAddress {
    address: &'static str,
    _label: &'static str,
}

const KNOWN_BRIDGES: &[KnownAddress] = &[
    KnownAddress {
        address: "0x3ee18b2214aff97000d974cf647e7c347e8fa585",
        _label: "Wormhole Token Bridge",
    },
    KnownAddress {
        address: "0x98f3c9e6e3face36baad05fe09d375ef1464288b",
        _label: "Wormhole Core Bridge",
    },
    KnownAddress {
        address: "0x28b5a0e9c621a5badaa536219b3a228c8168cf5d",
        _label: "Circle CCTP TokenMessenger V2",
    },
    KnownAddress {
        address: "0x81d40f21f12a8f0e3252bccb954d722d4c464b64",
        _label: "Circle CCTP MessageTransmitter V2",
    },
    KnownAddress {
        address: "0xbd3fa81b58ba92a82136038b25adec7066af3155",
        _label: "Circle CCTP TokenMessenger V1",
    },
    KnownAddress {
        address: "0x0a992d191deec32afe36203ad87d7d289a738f81",
        _label: "Circle CCTP MessageTransmitter V1",
    },
    KnownAddress {
        address: "0x8731d54e9d02c286767d56ac03e8037c07e01e98",
        _label: "Stargate Router",
    },
    KnownAddress {
        address: "0xb8901acb165ed027e32754e0ffe830802919727f",
        _label: "Hop Protocol Bridge",
    },
];

const KNOWN_DEFI_PROTOCOLS: &[KnownAddress] = &[
    KnownAddress {
        address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
        _label: "Uniswap V2 Router02",
    },
    KnownAddress {
        address: "0xe592427a0aece92de3edee1f18e0157c05861564",
        _label: "Uniswap V3 SwapRouter",
    },
    KnownAddress {
        address: "0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b",
        _label: "Uniswap Universal Router",
    },
    KnownAddress {
        address: "0x000000000022d473030f116ddee9f6b43ac78ba3",
        _label: "Uniswap Permit2",
    },
    KnownAddress {
        address: "0x1111111254eeb25477b68fb85ed929f73a960582",
        _label: "1inch Aggregation Router V5",
    },
    KnownAddress {
        address: "0x1111111254fb6c44bac0bed2854e76f90643097d",
        _label: "1inch Aggregation Router V4",
    },
    KnownAddress {
        address: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
        _label: "0x Exchange Proxy",
    },
    KnownAddress {
        address: "0x881d40237659c251811cec9c364ef91dc08d300c",
        _label: "Metamask Swap Router",
    },
    KnownAddress {
        address: "0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2",
        _label: "Aave V3 Pool",
    },
    KnownAddress {
        address: "0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9",
        _label: "Aave V2 LendingPool",
    },
    KnownAddress {
        address: "0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b",
        _label: "Compound Comptroller",
    },
    KnownAddress {
        address: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
        _label: "Compound cETH",
    },
    KnownAddress {
        address: "0x0000000022d53366457f9d5e68ec105046fc4383",
        _label: "Curve Address Provider",
    },
    KnownAddress {
        address: "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
        _label: "Curve 3pool",
    },
    KnownAddress {
        address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
        _label: "Lido stETH",
    },
    KnownAddress {
        address: "0x9008d19f58aabd9ed0d60971565aa8510560ab41",
        _label: "CoW Protocol GPv2Settlement",
    },
];

const KNOWN_CASPS: &[KnownAddress] = &[
    KnownAddress {
        address: "0x28c6c06298d514db089934071355e5743bf21d60",
        _label: "Binance hot wallet",
    },
    KnownAddress {
        address: "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
        _label: "Binance hot wallet",
    },
    KnownAddress {
        address: "0xdfd5293d8e347dfe59e90efd55b2956a1343963d",
        _label: "Binance hot wallet",
    },
    KnownAddress {
        address: "0x71660c4005ba85c37ccec55d0c4493e66fe775d3",
        _label: "Coinbase hot wallet",
    },
    KnownAddress {
        address: "0x503828976d22510aad0201ac7ec88293211d23da",
        _label: "Coinbase hot wallet",
    },
    KnownAddress {
        address: "0x2910543af39aba0cd09dbb2d50200b3e800a63d2",
        _label: "Kraken hot wallet",
    },
    KnownAddress {
        address: "0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13",
        _label: "Kraken hot wallet",
    },
];
