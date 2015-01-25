Setting up a Counterblock Federated Node
==============================================

Introduction
-------------

A Counterblock Federated Node is a self-contained server that runs the software necessary to support one or more "roles".
Such roles may be:

- Counterwallet server
- Vending machine (future)
- Block explorer server (future)
- A plain old ``counterpartyd`` server

Each backend server runs multiple services (some required, and some optional, or based on the role chosen).
As each server is self-contained, they can be combined by the client-side software to allow for high-availability/load balancing.

For instance, software such as Counterwallet may then utilize these backend servers in making API calls either sequentially (i.e. failover) or in
parallel (i.e. consensus-based). For instance, with Counterwallet, when a user logs in, this list is shuffled so that
in aggregate, user requests are effectively load-balanced across available servers. Indeed, by setting up multiple such
(Counterblock) Federated Nodes, one can utilize a similar redundancy/reliability model in one's own 3rd party application
that Counterwallet utilizes. Or, one can utilize a simplier configuration based on a single, stand-alone server.

This document describes how one can set up their own Counterblock Federated Node server(s). It is primarily intended
for system administrators and developers.

Upgrading a Federated Node
--------------------------

To update the system with new code releases, you simply need to rerun the **setup_federated_node** script, like so:
    
    cd ~xcp/counterpartyd_build
    sudo ./setup_federated_node.py

As prompted, you should be able to choose just to update (“U”), instead of to rebuild. However, you would choose the rebuild option if there were updates to the **counterpartyd_build** system files for the federated node itself (such as the **nginx** configuration, or the init scripts) that you wanted/needed to apply. Otherwise, update should be fine.



Federated Node Services
-------------------------

A federated node runs several services on the same system. Let's look at what some of these are:

###counterpartyd (Required)

``counterpartyd`` is the Counterparty reference client itself. It's responsibilities include parsing out Counterparty
transactions from the Bitcoin blockchain. It has a basic command line interface, and a reletively low-level API for
getting information on specific transactions, or general state info.

###counterblockd (Required, unless counterpartyd only)

The ``counterblockd`` daemon provides a more high-level API that layers on top of ``counterpartyd``'s API, and includes extended
information, such as market and price data, trade operations, asset history, and more. It is used extensively by Counterwallet
itself, and is appropriate for use by applications that require additional API-based functionality beyond the scope of
what ``counterpartyd`` provides.

``counterblockd`` also provides a proxy-based interface to all ``counterpartyd`` API methods, via the ``proxy_to_counterpartyd`` API call.

###insight (Optional)

``insight`` allows for local querying of balance information and UTXOs for arbitrary addresses. This is a feature not available
to ``bitcoind`` itself. Alternatives to running ``insight`` on the server are using a service like ``blockr.io``, which
both ``counterpartyd`` and ``counterblockd`` support. For the most reliable service, we recommend that production
servers (at least) run ``insight`` locally.

###armory_utxsvr (Optional)

This service is used by ``counterblockd`` with Counterwallet, to allow for the creation of unsigned transaction
ASCII text blocks, which may then be used with an [Offline Armory configuration](https://bitcoinarmory.com/about/using-our-wallet/).
This service requires Armory itself, which is automatically installed as part of the Federated Node setup procedure.

###nginx (Optional)

``nginx`` normally frontends communications on Counterwallet, Vending, etc nodes. Not used with counterpartyd-only nodes.

###Counterwallet, etc.

The specific end-functionality, that builds off of the base services provided.


Federated Node Provisioning
--------------------------------

###Production

Here are the recommendations and/or requirements when setting up a production-grade Counterblock Federated Node:

**Server Hardware/Network Recommendations:**

- Xeon E3+ or similar-class processor
- 16GB+ RAM (ECC)
- Disk drives in RAID-1 (mirrored) configuration (SSD prefered)
- Hosted in a secure data center with physical security and access controls
- DDOS protection recommended if you will be offering your service to others

**Disk Space Requirements:**

The exact disk space required will be dependent on what services are run on the node:

- Base System: **20GB** (to be safe)
- ``counterpartyd``, ``counterblockd`` databases: **~200MB**
- ``insight``: **~30GB** (mainnet), **~3GB** (testnet)
- ``armory_utxsvr``: **~25GB** (mainnet), **~3GB** (testnet)

Generally, we recommend building on a server with at least 120GB of available disk space.

**Server Software:**

- Ubuntu 14.04 64-bit required

**Server Security:**

The build script includes basic automated security hardening.

Before running this script, we strongly advise the following:

- SSH should run on a different port, with root access disabled
- Use ufw (software firewall) in addition to any hardware firewalls:

  - sudo ufw allow ssh   #(or whatever your ssh port is, as '12345/tcp', in place of 'ssh')
  - sudo ufw allow http
  - sudo ufw allow https
  - sudo ufw enable

- Only one or two trusted individuals should have access to the box. All root access through ``sudo``.
- Utilize 2FA (two-factor authentication) on SSH and any other services that require login.
  `Duo 
