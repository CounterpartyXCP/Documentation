---
title: Getting Started
---

The simplest way to get your Counterparty node up and running is to use Docker Compose.

Install Docker Compose as described here https://docs.docker.com/compose/install/.

Then run node services in background with:

```bash
git clone git@github.com:CounterpartyXCP/counterparty-core.git
cd counterparty-core
mkdir ~/.local/share/counterparty-docker-data
docker-compose --profile mainnet up -d
```

**To run a node you must have at least 1.5TB free.** By default all data is stored in the `~/counterparty-docker-data` folder. You can modify this folder with the environment variable `$COUNTERPARTY_DOCKER_DATA`. For example:

```bash
COUNTERPARTY_DOCKER_DATA=/var/data docker compose up -d
```

Use `docker compose logs` to view output from services. For example:

```bash
docker-compose --profile mainnet logs --tail=10 -f bitcoind
docker-compose --profile mainnet logs --tail=10 -f addrindexrs
docker-compose --profile mainnet logs --tail=10 -f counterparty-core
```

You can use the `testnet` profile to run a `testnet` node:

```
docker-compose --profile testnet up -d
```

NOTES:
- By default, this Docker Compose script makes use of the `bootstrap` functionality, because Docker makes it hard to use `kickstart`. (See below.)
- When working with a low-memory system, you can tell `addrindexrs` to use JSON-RPC to communicate with `bitcoind` using the environment variable `ADDRINDEXRS_JSONRPC_IMPORT`: `ADDRINDEXRS_JSONRPC_IMPORT=true docker compose up -d`

