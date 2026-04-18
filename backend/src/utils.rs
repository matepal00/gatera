pub fn is_eth_address(address: &str) -> bool {
    address.len() == 42
        && address.starts_with("0x")
        && address
            .chars()
            .skip(2)
            .all(|character| character.is_ascii_hexdigit())
}
