---
title: Docker Kickstart
---

### 1) Create a Persistent Volume 

```bash
docker volume create -d local -o type=none -o o=bind -o device=<BITCOIN_DATA_DIR>/ data
```

### 2) Start bitcoind

```bash
docker run --name bitcoind -v data:/bitcoin/.bitcoin -p 8332:8332 kylemanna/bitcoind:latest -chain=main -rpcallowip=0.0.0.0/0 -rpcbind=0.0.0.0 -rpcuser=rpc -rpcpassword=rpc -listen=1 -server=1 -printtoconsole=1 -addresstype=legacy -txindex=1 -prune=0 -dbcache=4000 -mempoolfullrbf=1
```

### 3) Start addrindexrs

```bash

export DAEMON_RPC_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' bitcoind)

docker run --name addrindexrs -v data:/root/.bitcoin -v data:/data -p 8432:8432 -e ADDRINDEXRS_JSONRPC_IMPORT=${ADDRINDEXRS_JSONRPC_IMPORT:-false} counterparty/addrindexrs:v0.4.6 --network=main --indexer-rpc-host=0.0.0.0 --daemon-rpc-host=$DAEMON_RPC_HOST --daemon-rpc-port=8332 --cookie=rpc:rpc -vvv --db-dir=/data/
```

### 4) Run kickstart


```bash

export DAEMON_RPC_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' bitcoind)
export ADDRINDEXRS_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' addrindexrs)


docker run -it -v data:/root/.bitcoin -v data:/data -p 4000:4000 -e XDG_DATA_HOME=/data/ -e XDG_LOG_HOME=/data/ counterparty kickstart --mainnet --backend-connect=$DAEMON_RPC_HOST --indexd-connect=$ADDRINDEXRS_HOST --rpc-host=0.0.0.0 -v
```
 
Follow on screen prompt and kill `bitcoind`when `addrindexrs` is done syncing.

`docker stop bitcoind`

Press `y` to continue kickstart 

Note: Due to resource limitations, this process can sometimes stall.  If you `ctrl-c` and then restart, `kickstart` will pick up where it left off.




