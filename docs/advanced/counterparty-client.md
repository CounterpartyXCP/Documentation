---
title: Counterparty Client
---

# Counterparty Client (`xcp`)

The **Counterparty Client** is a command-line tool that talks to a Counterparty
[v2 API](../advanced/api-v2/node-api.md) server and includes a local, encrypted
Bitcoin wallet. It **composes, signs, and broadcasts** Counterparty transactions
for you, and also exposes the full API as CLI commands.

It ships as two identical binaries — **`xcp`** (short) and
**`counterparty-client`**. This page uses `xcp` throughout.

With a single command you can:

- send assets (XCP, tokens, NFTs) and BTC,
- create ("mint") your own tokens,
- open a dispenser, place a DEX order, pay a dividend, and use every other
  `compose_*` operation,
- query any API route.

Your private keys are generated and stored **locally** and never leave your
machine — the client signs every transaction itself.

:::warning Beta software
The client is new. Test it on `signet`, `testnet4`, or `regtest` before using it
with real funds on `mainnet`, and **back up your keys** (see
[Backups](#backups)).
:::

---

## Installation

There are no pre-built binaries yet, so you build from source. You need
[Rust](https://rustup.rs) **1.88 or newer** (stable).

```sh
git clone https://github.com/CounterpartyXCP/counterparty-core.git
cd counterparty-core/counterparty-client

# Build the release binaries into ./target/release/{xcp,counterparty-client}
cargo build --release

# …or install them onto your PATH (~/.cargo/bin)
cargo install --path .
```

Verify the install:

```sh
xcp --version
```

---

## Choosing a network

Select the network with a global flag. **The default is `mainnet`**, so every
example below adds `--testnet4` — drop that flag (or swap it) to change network.

| Flag         | Network  | Default API endpoint                       |
|--------------|----------|--------------------------------------------|
| `--mainnet`  | Mainnet  | `https://api.counterparty.io:4000`         |
| `--signet`   | Signet   | `https://signet.counterparty.io:34000`     |
| `--testnet4` | Testnet4 | `https://testnet4.counterparty.io:44000`   |
| `--regtest`  | Regtest  | `http://localhost:24000`                    |

These defaults are written to a config file the first time you run the client. To
point it at **your own** Counterparty API server, edit the matching
`[network_configs.<network>]` table in that file (see
[File locations](#file-locations)).

---

## Quick start: create an address

Before you can send or mint anything you need an address in the wallet. The first
wallet command will ask you to set a password (**at least 12 characters** — see
[Security](#security)).

```sh
# Address types: bech32 (default), p2pkh, taproot
xcp --testnet4 wallet new_address --label savings
```

:::danger Write down your recovery phrase
`new_address` prints a **BIP39 recovery phrase once, at creation** — write it
down and keep it safe. It is never stored and cannot be shown again. It is the
only way to recover this address if you lose the wallet file.
:::

Already have a key or seed phrase? Import it instead:

```sh
# Read the secret from a file (recommended — keeps it out of your shell history)
xcp --testnet4 wallet import_address --mnemonic "@/path/to/seed.txt"

# …or omit the secret flag to be prompted for it without echo
xcp --testnet4 wallet import_address --address-type taproot
```

List your addresses and check balances at any time:

```sh
xcp --testnet4 wallet list_addresses
xcp --testnet4 wallet address_balances --address <your-address>
```

:::tip Fund the address first
Every Counterparty transaction is a Bitcoin transaction, so the sending address
needs a little **BTC** to pay the miner fee. On testnet4/signet, use a public
faucet. To send an existing token you of course also need a balance of that token.
:::

---

## Sending assets

`xcp wallet transaction send` composes the transfer via the API, signs it
locally, shows you a summary, asks for confirmation, then broadcasts it.

```sh
# Send 10 XCP
xcp --testnet4 wallet transaction send \
    --address <your-address> \
    --destination <recipient-address> \
    --asset XCP \
    --quantity 10
```

The same command sends any token or NFT — just change `--asset`:

```sh
# Send 1 NFT (an indivisible asset)
xcp --testnet4 wallet transaction send \
    --address <your-address> \
    --destination <recipient-address> \
    --asset MYCOLLECTION \
    --quantity 1
```

**`--quantity` is human-readable.** For a *divisible* asset, `--quantity 10`
means 10.0 units (decimals up to 8 places are allowed). For an *indivisible*
asset it must be a whole number. The client looks up the asset's divisibility and
converts the amount for you — you never work in satoshis here.

:::note Safety check before signing
For `send`, `enhanced_send`, and `sweep`, the client re-decodes the transaction
returned by the server and verifies that the asset, quantity, and destination
match what you asked for — and that the BTC only goes to your own change address
or the intended recipient. It **refuses to sign on any mismatch**, so these
transfers are safe even against a misbehaving or man-in-the-middled API server.
:::

Add `-y` / `--yes` to skip the confirmation prompt (useful for scripting).

---

## Minting a token

There are two ways to create a token. Pick the one that fits your goal:

- **[Issuance](#option-a-issue-a-token)** — you mint the whole supply to
  yourself in one transaction. Simplest; best when *you* hold the tokens and
  distribute them however you like.
- **[Fair minting](#option-b-fair-minting)** — you publish minting *rules*, then
  anyone (including you) mints tokens for themselves under those rules. Best for a
  fair, decentralized distribution.

### Option A: Issue a token

`issuance` creates the asset (if it doesn't exist yet) and credits the supply to
your address:

```sh
# Create 1000 units of a new, indivisible token
xcp --testnet4 wallet transaction issuance \
    --address <your-address> \
    --asset MYTOKEN \
    --quantity 1000 \
    --divisible false \
    --description "My first Counterparty token"
```

- Drop `--divisible false` (the default is divisible) to make a token with up to
  8 decimal places; `--quantity` is then human-readable just like `send`.
- `--asset` must be a valid Counterparty asset name. A **named** asset (e.g.
  `MYTOKEN`) requires burning **0.5 XCP** as an anti-spam fee, handled
  automatically as part of the issuance — so the address needs a 0.5 XCP balance.
  Numeric assets (names of the form `A` followed by a large number) are free.
- To mint **more** of an asset you already own later, run `issuance` again for the
  same `--asset` with the additional `--quantity`.

See [Counterparty Assets](./assets/counterparty-assets.md) for asset naming rules,
subassets, and NFTs.

### Option B: Fair minting

Fair minting is a two-step, decentralized flow. First the issuer opens a
**fairminter** that defines the rules; then anyone submits a **fairmint** to
create tokens for themselves under those rules. See the
[Fair Minting specification](../advanced/specifications/fairminter.md) for the
full model.

**1. Open the fairminter** (run by the token creator):

```sh
# Anyone may mint MYTOKEN by paying 1 XCP per unit, up to a 10,000-unit hard cap
xcp --testnet4 wallet transaction fairminter \
    --address <your-address> \
    --asset MYTOKEN \
    --price 1 \
    --hard_cap 10000 \
    --max_mint_per_tx 100 \
    --description "Fair mint for MYTOKEN"
```

Common options (all amounts are human-readable, converted using the asset's
divisibility; `--price` is in XCP):

| Flag                  | Meaning                                                         |
|-----------------------|----------------------------------------------------------------|
| `--price`             | XCP paid per unit minted (`0` makes minting free)              |
| `--hard_cap`          | Maximum total supply that can ever be minted                   |
| `--soft_cap`          | Minimum that must be minted for the sale to succeed            |
| `--max_mint_per_tx`   | Maximum units mintable in a single fairmint                    |
| `--premint_quantity`  | Amount credited to you when the fairminter opens               |
| `--start_block` / `--end_block` | Block window during which minting is open           |
| `--divisible`         | Whether the token supports decimals (default `true`)          |
| `--description`       | Free-text description / metadata                               |

:::note
`--price` and `--max_mint_per_tx` cannot both be `0`, and `--soft_cap` must be
less than `--hard_cap`. Fair-minting rules and edge cases are described in the
[specification](../advanced/specifications/fairminter.md).
:::

**2. Mint from an open fairminter** (run by anyone who wants the token):

```sh
# Mint 100 units of MYTOKEN (pays the fairminter's price in XCP)
xcp --testnet4 wallet transaction fairmint \
    --address <your-address> \
    --asset MYTOKEN \
    --quantity 100
```

If the fairminter is **free** (`--price 0`), omit `--quantity` — each mint gives
`max_mint_per_tx` units.

---

## Querying the API

Every API route is available under `api`. Run `xcp api --help` to list them all.

```sh
# Look up an asset
xcp --testnet4 api get_asset_info --asset XCP

# Get a block by height
xcp --testnet4 api get_block_by_height --block_index 100000

# --json prints plain JSON for piping into tools like jq
xcp --testnet4 --json api get_block_by_height --block_index 100000 | jq .result.block_hash
```

Output is colored YAML when printed to a terminal, and plain text when piped or
redirected. Use the global `--json` flag for machine-readable JSON on stdout.

:::note Raw compose commands use satoshis
The `wallet transaction …` commands convert amounts for you. The raw
`api compose_*` routes are the expert path and expect **quantities in satoshis**,
because they are forwarded to the API verbatim.
:::

---

## Sign and broadcast separately

`wallet transaction` does compose → sign → broadcast in one step, but you can
split signing and broadcasting when needed (e.g. offline signing):

```sh
xcp --testnet4 wallet sign --rawtransaction <hex> [--utxos <json>]
xcp --testnet4 wallet broadcast --rawtransaction <signed-hex>
```

---

## Security

- **Local signing.** Private keys are generated and used on your machine only,
  and are never sent to the API server.
- **At-rest encryption.** The wallet is a single encrypted file
  (ChaCha20-Poly1305), with the password stretched by the memory-hard **Argon2id**
  KDF over a random per-wallet salt. Passwords must be at least 12 characters,
  reasonably varied, not all-digits, and not a well-known weak password.
- **Transaction verification.** For `send` / `enhanced_send` / `sweep`, the client
  independently verifies the composed transaction before signing (see the
  [note above](#sending-assets)). Other types (issuance, order, dispenser, …)
  cannot be fully verified offline — the client warns and falls back to the
  confirmation prompt, so review the summary before confirming.
- **HTTPS enforced.** On any public network the client refuses cleartext
  `http://` API URLs and pins its HTTP client to HTTPS. Only regtest (localhost)
  may use `http://`.
- **Automation.** For headless use you can set `XCP_WALLET_PASSWORD` instead of
  the OS keyring, but an environment variable is visible to other processes and
  can leak into logs — prefer the keyring for interactive use.

### Backups

Each address is an **independent key**; there is no single wallet-wide seed.

- `new_address` shows a BIP39 recovery phrase **once** — write it down.
- Reveal an address's private key (WIF) at any time — a complete backup of that
  one address:

  ```sh
  xcp --testnet4 wallet export_address --address <your-address>
  ```

- The encrypted `wallet.db` file is also worth backing up, but a lost or
  corrupted file can only be recovered from the per-address phrases/WIFs above.

To clear the password cached in your OS keyring:

```sh
xcp wallet disconnect
```

---

## File locations

| Purpose   | Location                                                          |
|-----------|------------------------------------------------------------------|
| Config    | `<data_dir>/counterparty-client/config.toml`                     |
| Wallet DB | `<data_dir>/counterparty-client/<network>/wallet.db` (encrypted) |
| API cache | `<cache_dir>/counterparty-client/<network>/…`                    |

`<data_dir>` and `<cache_dir>` follow your OS convention — for example on macOS
`~/Library/Application Support` and `~/Library/Caches`, and on Linux
`~/.local/share` and `~/.cache`. Override the config path with `--config-file`.

---

## Other commands

```sh
xcp --update-cache        # refresh the cached list of API endpoints
xcp completion            # generate shell completions (bash, zsh, fish, …)
xcp --help                # top-level help; add --help to any subcommand
```
