---
title: Getting started
---

This document describes how one can set up their own Counterparty "Federated Node" system, on Linux, Windows or OS X.

A Federated Node is a self-contained system that runs the some or all of the Counterparty software stack, via Docker. Each system operates as a Bitcoin and Counterparty "full node". Using this toolset, one can generally get started running the Counterparty software much quicker and more easily than a manual installation of the various components.

The document is primarily intended for power users and developers.

### Node Services
<a name="services"></a>
Services run on a Federated Node include some or all of the following:

* **counterparty-server**: `counterparty-lib` + `counterparty-cli`. Implements support for the core Counterparty protocol, via a provided REST API and command line interface.
* **counterblock**: Provides additional services (required by `counterwallet` and potentially other services) beyond those offered in the API provided by `counterparty-server`. It features a full-fledged JSON RPC-based API, and has an extensible architecture to support custom plugins.
* **counterwallet**: The reference Web wallet for Counterparty. This is a collection of HTML, CSS and javascript resources, served by `nginx`.
* **bitcoind**: Reference Bitcoin implementation, used by `counterparty-server` to sync to the Bitcoin blockchain.
* **addrindexrs**: Bitcoin address index service. Maintains an updated database of UTXOs for usage in the counterparty services.
* **armory_utxsvr**: A service used by ``counterblock`` with Counterwallet to support [Offline Armory transactions](http://counterparty.io/docs/create_armory_address/). This service requires Armory itself, which is automatically installed as part of the Federated Node setup procedure.
* **nginx**: Reverse proxies `counterwallet` access. Not used with `counterparty-server`-only or `counterblock`-only nodes.
* **mongodb and redis**: Used by `counterblock`.

Please note that Federated Node should not be installed on a system which already has one or more of conflicting services running on the ports used by Federated Node. The Federated Node install script checks that required ports are unused and exits to avoid conflict. If you have a non-essential Web, mongodb or other service running on the target system you can disable them or bind them to a different port to be able to pass the built-in check and avoid application conflicts.

### Hardware / OS requirements
<a name="requirements"></a>

- **Memory**: 4GB RAM (`bitcoind`, `counterparty-server` only), 8GB+ RAM (full stack)
- **Disk space:** The exact disk space required will be dependent on what services are run on the node:
    - For ``bitcoin`` databases: **~610GB** (mainnet), **~37GB** (testnet)
    - For ``addrindexrs`` database: **~130GB** (mainnet), **~9GB** (testnet)
    - For ``counterparty`` databases: **~9GB** (mainnet), **~2GB** (testnet)
    - For ``armory_utxsvr``: **~650GB** (mainnet), **~40GB** (testnet)
- **OS:** *Please note that Ubuntu Linux is the recommended OS at this time, as most of our testing is performed on it. Windows and OS X support is considered in BETA.*
    - **Linux**: We recommend Ubuntu 22.04 LTS 64-bit, but other, modern versions of Linux should work, as long as they support the newest released version of Docker
    - **Windows**: Windows 7 or higher, or Server 2008 or higher. 64-bit required
    - **OS X**: 10.8 "Mountain Lion" or higher
