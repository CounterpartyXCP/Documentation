---
title: Getting Started
---

## Install Counterparty Core

The simplest way to get your Counterparty node up and running is to use **Docker Compose**, which may be installed as described [here](https://docs.docker.com/compose/install/).

*Note: It is required that you use Docker Compose V2, and it is suggested that you install the plugin as opposed to the standalone `docker-compose` executable*.

Clone the repo:

```bash
git clone git@github.com:CounterpartyXCP/counterparty-core.git
cd counterparty-core
```

Next, create the directory that will be used to store Counterparty data.
**To run a node you must have at least 1.5TB free.**
<!-- By default, the program will use: `~/.local/share/counterparty-docker-data`.
You can modify the parent directory (`~/.local/share`) by setting **`$COUNTERPARTY_DOCKER_DATA`**.
You will need to manually create the data directory even when using the default: -->

```bash
mkdir ~/.local/share/counterparty-docker-data
```

Now we can start the program.

```bash
docker compose --profile mainnet up -d
```

Use `docker compose logs` to view output from services. For example:

```bash
docker compose --profile mainnet logs --tail=10 -f bitcoind
docker compose --profile mainnet logs --tail=10 -f addrindexrs
docker compose --profile mainnet logs --tail=10 -f counterparty-core
```

You can use the `testnet` profile to run a `testnet` node:

```
docker compose --profile testnet up -d
```

NOTES:
- By default, this Docker Compose script makes use of the `bootstrap` functionality.
- When working with a low-memory system, you can tell AddrIndexRs to use JSON-RPC to communicate with Bitcoin Core using the environment variable `ADDRINDEXRS_JSONRPC_IMPORT`: `ADDRINDEXRS_JSONRPC_IMPORT=true docker compose up -d`

## Upgrade Counterparty Core

Download the latest version of `counterparty-core` and restart `counterparty-server`

```bash
cd counterparty-core
git pull
docker compose stop counterparty-core
docker compose --profile mainnet up -d
```

NOTE:
If you were using a custom version of `docker-compose.yml` that uses the `latest` or `develop` tag, it is recommended to delete the old image before restarting the server:

```bash
docker compose stop counterparty-core
docker rmi counterparty/counterparty:latest
docker compose --profile mainnet up -d
```
