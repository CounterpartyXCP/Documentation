---
title: Manual Installation
---

Counterparty Core can be installed on most platforms but, for now, manual installation is being tested and is only officially supported on Ubuntu 22.04 and MacOS.

Dependencies:

- Bitcoin Core
- AddrIndexRS
- Python >= 3.10
- Rust
- Maturin
- LevelDB

## Install dependencies

### Install Bitcoin Core

Download the latest [Bitcoin Core](https://github.com/bitcoin/bitcoin/releases) and create
a `bitcoin.conf` file (by default located in `~.bitcoin/`) with the following options:

```
server=1
addresstype=legacy
txindex=1
rpcworkqueue=100
[main]
zmqpubrawtx=tcp://0.0.0.0:9332
zmqpubhashtx=tcp://0.0.0.0:9332
zmqpubsequence=tcp://0.0.0.0:9332
zmqpubrawblock=tcp://0.0.0.0:9333
[test]
zmqpubrawtx=tcp://0.0.0.0:19332
zmqpubhashtx=tcp://0.0.0.0:19332
zmqpubsequence=tcp://0.0.0.0:19332
zmqpubrawblock=tcp://0.0.0.0:19333
[testnet4]
zmqpubrawtx=tcp://0.0.0.0:49332
zmqpubhashtx=tcp://0.0.0.0:49332
zmqpubsequence=tcp://0.0.0.0:49332
zmqpubrawblock=tcp://0.0.0.0:49333
[regtest]
zmqpubrawtx=tcp://0.0.0.0:29332
zmqpubhashtx=tcp://0.0.0.0:29332
zmqpubsequence=tcp://0.0.0.0:29332
zmqpubrawblock=tcp://0.0.0.0:29333
```

Adding the following lines, and opening up port `8333` to incoming traffic, may improve your sync speed:

```
listen=1
dbcache=4000
```

### Install Rust

The recommended way to install Rust is to use `rustup`:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

See https://www.rust-lang.org/tools/install for more information.


### Install Python >= 3.10 and Maturin

On Ubuntu 22.04 and similar:

```bash
apt-get install -y python3 python3-dev python3-pip
pip3 install maturin
```

On MacOS:

```bash
brew install python
pip3 install maturin
```

See https://brew.sh/ to install Homewrew.


### Install LevelDB

On Ubuntu 22.04 and similar:

```bash
apt-get install -y libleveldb-dev
```

On MacOS:

```bash
brew install leveldb
```

## Install Counterparty Core

Download the latest version `counterparty-core`:

```bash
git clone https://github.com/CounterpartyXCP/counterparty-core.git
```

Install the `counterparty-rs` library:

```bash
cd counterparty-core/counterparty-rs
pip3 install .
```

Install the `counterparty-core` library:

```bash
cd counterparty-core/counterparty-core
pip3 install .
```

On most platforms you need to update your $PATH variable so that `counterparty-server` is accessible. For example:

```
export PATH=$PATH:/home/username/.local/bin/
```
Look at the `counterparty-core` installation logs to find out the path of the binaries on your system.

*Note for MacOS users*

Use this command if you get an error while installing one of the packages:

```bash
CFLAGS="-I/opt/homebrew/include -L/opt/homebrew/lib"
```

## Upgrade Counterparty Core

To update, simply follow the same procedure as for installation.

### Notes

#### Update from 10.0.0 to 10.1.0 or from 10.1.0 to 10.1.1

given the change of names of certain packages you must start by uninstalling the previous version:

```
pip uninstall counterparty-lib counterparty-cli counterparty-core
```


## Electrs Configuration

### What is Electrs?

Electrs (Electrum Server in Rust) provides an API for querying Bitcoin UTXO data. Counterparty uses this to compose transactions for addresses that are **not** in your Bitcoin Core wallet.

When you create a transaction using the Counterparty API, the server needs to know which UTXOs are available to spend. If the source address is in your Bitcoin Core wallet, this information is readily available. However, if the address is not in your wallet (common when using external wallets or hardware wallets), Counterparty queries an Electrs-compatible API to fetch the UTXO data.

### Default Public APIs

By default, Counterparty connects to public APIs based on your network:

| Network | Default Electrs URL |
|---------|---------------------|
| Mainnet | `https://blockstream.info/api` |
| Testnet3 | `https://blockstream.info/testnet/api` |
| Testnet4 | `https://mempool.space/testnet4/api` |
| Signet | `https://mempool.space/signet/api` |

These defaults work out of the box with no configuration required.

### Alternative Public APIs

You can use any Electrs-compatible API by setting the `--electrs-url` flag:

```bash
# Use Mempool.space for mainnet
counterparty-server start --electrs-url=https://mempool.space/api

# Use the Counterparty public Electrs instance
counterparty-server start --electrs-url=https://api.counterparty.io:3000
```

### Running Your Own Electrs Instance

For production or high-volume use cases, you may want to run your own Electrs instance. Benefits include:

- **Reliability**: No dependency on external services
- **Performance**: Lower latency for high-frequency operations
- **No rate limits**: Public APIs may throttle heavy usage

#### Installation

```bash
git clone https://github.com/mempool/electrs
cd electrs
cargo install --path=.
```

#### Running Electrs

Start `electrs` with:

```bash
electrs
```

When working with a remote full node or low-memory system, you can tell `electrs` to use JSON-RPC to communicate with `bitcoind`:

```bash
electrs --jsonrpc-import
```

You can also limit the resources available for `electrs`:

```bash
ulimit -n 8192
```

Use `electrs -h` for more options.

#### Connecting Counterparty to Your Local Electrs

```bash
counterparty-server start --electrs-url=http://localhost:3000
```

You can also set this in your `server.conf` configuration file:

```
electrs-url=http://localhost:3000
```