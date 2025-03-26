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
rpcuser=rpc
rpcpassword=rpc
server=1
addresstype=legacy
txindex=1
mempoolfullrbf=1
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

Install the `counterparty-wallet` library:

```bash
cd counterparty-core/counterparty-wallet
pip3 install .
```

On most platforms you need to update your $PATH variable so that `counterparty-server` and `counterparty-wallet` are accessible. For example:

```
export PATH=$PATH:/home/username/.local/bin/
```
Look at the `counterparty-core` and `counterparty-wallet` installation logs to find out the path of the binaries on your system.

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


## Install Electrs

It is optionally possible to install Electrs. It allows to compose transactions, without the `inputs_set` parameter, for addresses not in the Bitcoin Core wallet.

```bash
git clone https://github.com/mempool/electrs
cd electrs
cargo install --path=.
```

Start `electrs` with:

```bash
electrs --cookie=rpc:rpc -vvv
```

When working with a remote full node or low-memory system, you can tell `electrs` to use JSON-RPC to communicate with `bitcoind` using the flag `--jsonrpc-import`.
You can also limit the resources available for `electrs` with:

```bash
ulimit -n 8192
```

Use `electrs -h` for more options.

To connect Electrs to the Counterparty Server use the flag `--electrs-url`:

```bash
counterparty-server start --electrs-url=http://localhost:3000
```