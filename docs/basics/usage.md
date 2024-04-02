---
title: Basic Usage
---

## Configuration

Manual configuration is not necessary for most use cases, but example configuration files may be found in the `docker/` directory.

By default, the **configuration files** are named `server.conf` and `client.conf` and are located in the following directories:

* Linux: `~/.config/counterparty/`
* Windows: `%APPDATA%\Counterparty\`

Client and server log files are named `counterparty.client.[testnet.]log` and `counterparty.server.[testnet.]log` and are located in the following directories:

* Linux: `~/.cache/counterparty/log/`
* Windows: `%APPDATA%\Local\Counterparty\counterparty\Logs`

Counterparty API activity is logged to `server.[testnet.]api.log` and `client.[testnet.]api.log`.

Counterparty database files are by default named `counterparty.[testnet.]db` and are located in the following directories:

* Linux: `~/.local/share/counterparty`
* Windows: `%APPDATA%\Roaming\Counterparty\counterparty`

All configurable parameters in the configuration file can also be passed as arguments to the `counterpart-core` command. Use `counterparty-core --help` to see the list of these options.

## Counterparty Wallet

* NOTE: The `counterparty-wallet` CLI is currently non-functional and unsupported.


## Quickly Catch Up with the Network

You will not be able to run `counterparty-core` until `addrindexrs` has caught up (and its RPC server is running), which in turn requires `bitcoind` have caught up as well. The command to start the Counterparty server process is simply `counterparty-core start`. However, simply running this command requires a long time to catch up with the network, and Counterparty must have parsed all published blocks before being operational.

There are two ways to speed up the process of catching up with the network:

1. `counterparty-core bootstrap` downloads a recent snapshot of a Counterparty database from a centralized server maintained by the Counterparty Core development team. Because this method does not involve verifying the history of Counterparty transactions yourself, **the `bootstrap` command should not be used for mission-critical, commercial or public-facing nodes.**

```bash
counterparty-core bootstrap
```

1. `counterparty-core kickstart` will perform a complete catchup in around 8 to 24 hours. However, this method requires first stopping Bitcoin Core (while leaving `addrindexrs` running, so that Counterparty Core can read the Bitcoin block files directly from `bitcoind`'s database.

```bash
counterparty-core kickstart
```


## Start the Server

Once the Counterparty server has caught up with the network, you may start the server simply with:

```bash
counterparty-core start
```