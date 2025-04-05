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

All configurable parameters in the configuration file can also be passed as arguments to the `counterpart-server` command. Use `counterparty-server --help` to see the list of these options.

## Counterparty CLI

* NOTE: The `counterparty-client` CLI is currently non-functional and unsupported.


## Quickly Catch Up with the Network

You will not be able to run `counterparty-server` until `addrindexrs` has caught up (and its RPC server is running), which in turn requires `bitcoind` have caught up as well. The command to start the Counterparty server process is simply `counterparty-server start`. However, simply running this command requires a long time to catch up with the network, and Counterparty must have parsed all published blocks before being operational.

There is a way to speed up the process of catching up with the network:

`counterparty-server bootstrap` downloads a recent snapshot of a Counterparty database from a centralized server maintained by the Counterparty Core development team. Because this method does not involve verifying the history of Counterparty transactions yourself, **the `bootstrap` command should not be used for mission-critical, commercial or public-facing nodes.**

```bash
counterparty-server bootstrap
```

## Start the Server

Once the Counterparty server has caught up with the network, you may start the server simply with `counterparty start`:

```bash
counterparty-server start
```

Note: During database initialization, `counterparty-server` performs a database integrity check. Depending on your configuration, this operation may take more or less time. You can disable this check with the `--skip-db-check` flag.

Important: By default, `counterparty-server` uses cookie authentication to connect to Bitcoin Core. If the directory containing the Bitcoin Core data (`datadir` in the Bitcoin Core configuration file) is different from `~/.bitcoin/`, you must specify the path to the cookie with the `--backend-cookie-file` flag:


```bash
counterparty-server start --backend-cookie-file /data/.cookie
```