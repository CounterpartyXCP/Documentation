# Setting up a Counterparty Federated Node

## Introduction

A Federated Node is a self-contained system that runs the some or all of the Counterparty software stack, via Docker. Each system operates as a Bitcoin and Counterparty "full node", and can be combined by client-side software to allow for high-availability and load balancing.

This document describes how one can set up their own Counterblock Federated Node system. It is primarily intended for power users and developers. Currently this documentation is written for Linux-based installations, but will be enhanced in the future to work with Windows and Mac OS-based hosts.

(Note that as an alternative to building a Federated Node, one can manually install each of the services. Instructions for that are generally provided on each service's [respective Git repositories](https://github.com/CounterpartyXCP).)

### Node Services

Services run on a Federated Node include some or all of the following:

* **counterparty-server**: `counterparty-lib` + `counterparty-cli`. Implements support for the core Counterparty protocol, via a provided REST API and command line interface.
* **counterblock**: Provides additional services (required by `counterwallet` and potentially other services) beyond those offered in the API provided by `counterparty-server`. It features a full-fledged JSON RPC-based API, and has an extensible architecture to support custom plugins.
* **counterwallet**: The reference Web wallet for Counterparty. This is a collection of HTML, CSS and javascript resources, served by `nginx`.
* **bitcoind**: Reference Bitcoin implementation, used by `counterparty-server` to sync to the Bitcoin blockchain. We use the [`addrindex`](https://github.com/btcdrak/bitcoin/tree/addrindex-0.12) branch, as it has additional functionality Counterparty requires.
* **armory_utxsvr**: A service used by ``counterblock`` with Counterwallet to support [Offline Armory transactions](http://counterparty.io/docs/create_armory_address/). This service requires Armory itself, which is automatically installed as part of the Federated Node setup procedure.
* **nginx**: Reverse proxies `counterwallet` access. Not used with `counterparty-server`-only or `counterblock`-only nodes.
* **mongodb and redis**: Used by `counterblock`.

### Hardware / OS requirements

- **Memory**: 4GB RAM (`bitcoind`, `counterparty-server` only), 8GB+ RAM (full stack)
- **Disk space:** The exact disk space required will be dependent on what services are run on the node:
    - For ``bitcoin`` databases: **~70GB** (mainnet), **~4GB** (testnet)
    - For ``counterparty`` and ``counterblock`` databases: **~1.5GB** each
    - For ``armory_utxsvr``: **~30GB** (mainnet), **~3GB** (testnet)
- **OS:** We recommend Ubuntu 16.04 64-bit, but other versions of Linux may work, although we can offer no guarantees.

## Installation

**Update system & install dependencies**

*(The next sections assume a base machine running on Ubuntu. Similar steps apply for other OSes.)*

```
sudo apt-get update && apt-get upgrade
sudo apt-get -y install git curl
```

Install docker and docker-compose (see [here](https://docs.docker.com/compose/install/) for more info):
```
curl -fsSL https://get.docker.com/ | sh
sudo /bin/sh -c "curl -L https://github.com/docker/compose/releases/download/1.7.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
sudo chmod +x /usr/local/bin/docker-compose
```

**Clone and check out the code**
```
git clone https://github.com/CounterpartyXCP/federatednode.git && cd federatednode
sudo ln -sf `pwd`/fednode.py /usr/local/bin/fednode
```

**Build and link the containers**

Run the following command:
```
sudo fednode install <CONFIG> <BRANCH>
```

Where `<CONFIG>` is one of the following:

* **`base`** if you want to run `counterparty-server` only
* **`counterblock`** if you want to run `counterparty-server` and `counterblock`, but not `counterwallet`
* **`full`** if you would like to run a *full federated node configuration*: `counterparty-server`, `counterblock`, `counterwallet` and all required third-party services

And where `<BRANCH>` is one of the following:

* **`master`** (stable and recommended)
* **`develop`** (cutting edge, likely with bugs

For example:
```
# install a base configuration for the master branch
sudo fednode install base master

# install a full configuration for the develop branch
sudo fednode install full develop
```

**Wait for initial sync**

After installation, the services will be automatically started. To check the status, issue:
```
sudo fednode ps
```

Once the containers are installed and running, keep in mind that it will take some time for `bitcoind` to download the blockchain data. Once this is done, `counterparty-server` will fully start and sync, followed by `counterblock` (if in use). At that point, the server will be usuable.

You may check the sync status by tailing the appropriate service logs, e.g. for `bitcoind` and `counterparty-server` mainnet:
```
sudo fednode tail bitcoin
sudo fednode tail counterparty
```

**Access the system**

Once running, the system listens on the following ports:

* `counterparty-server`: 4000/tcp (mainnet), 14000/tcp (testnet)
* `counterblock`: 4001/tcp (mainnet), 14001/tcp (testnet)

For `counterparty-server`, use RPC username `rpc` and default password `1234`.

If `counterwallet` is installed, access to the following URLs will be possible:

* `http://<host>/` — directs to `https`
* `https://<host>/` - main production URL (uses minified JS/CSS)
* `https://<host>/src/` - development URL (uses un-minified JS/CSS)

**Post-installation tasks**

It’s highly recommended that you use a firewall on the system. Issue the appropriate commands, depending on what services you will be running and thus which ports you'd like to allow through:
```
# Always a good idea
sudo ufw allow ssh

# counterparty-server mainnet (4000) and testnet (14000)
sudo ufw allow 4000/tcp
sudo ufw allow 14000/tcp

# counterblock mainnet (4001) and testnet (14001)
sudo ufw allow 4001/tcp
sudo ufw allow 14001/tcp

# counterwallet
sudo ufw allow http
sudo ufw allow https

# ENABLE THE FIREWALL (verify your config first)
sudo ufw enable
```

**Additional security hardening (optional)**

If you are running a node in a production scenario, it is recommended that you properly secure it. If your host OS is Ubuntu Linux, you can optionally run a little script that will issue a number of commands to assist with this:
```
cd extras/host_security
./run.py
```

Note that this script will make several modifications to your host system as it runs. Feel free to review what it does [here](https://github.com/CounterpartyXCP/federatednode/blob/master/extras/host_security/run.py).


## Administration

**Checking status**

To check the status of the containers, run:
```
sudo fednode ps
```

**Viewing logs**

To tail the logs, use the following command:
```
sudo fednode tail <service>
```

Or, to view the entire log, run:
```
sudo fednode logs <service>
```

<a name="servicenames"></a>Where `<service>` may be one the following, or blank to tail all services:

* `counterparty` (`counterparty-server` mainnet)
* `counterblock` (`counterblock` mainnet)
* `bitcoin` (`bitcoin` mainnet)
* `armory_utxsvr` (`armory_utxsvr` mainnet)
* `counterparty-testnet`
* `counterblock-testnet`
* `bitcoin-testnet`
* `armory_utxsvr-testnet`
* `counterwallet`

**Stopping and restarting containers**

```
sudo fednode stop <service>
sudo fednode start <service>
sudo fednode restart <service>
```

Where `<service>` is one of the service names listed [above](#servicenames), or blank for all services.

**Issuing a single shell command**

```
sudo fednode exec <service> <CMD>
```

Where `<service>` is one of the service names listed [above](#servicenames), and `<CMD>` is an arbitrary shell command.

For example:
```
sudo fednode exec counterparty counterparty-server send --source=12u4Vymr3bGTywjMQDgBkwAnazwQuDqzJG --destination=1AanCo9CJSomhUEy2YrhfXrU1PboBhFaBq --quantity=1.5 --asset=XCP
sudo fednode cmd bitcoin-testnet bitcoin-cli getpeerinfo
sudo fednode exec counterblock ls /root
```

**Getting a shell in a conainer**

```
sudo fednode shell <service>
```

Where `<service>` is one of the service names listed [above](#servicenames).


## Updating, rebuilding, uninstalling

To pull the newest software from the git repositories and restart the appropriate daemon, issue the following command:

```
sudo fednode update <service>
```

<a name="servicenames_code"></a>Where `<service>` is one of the following, or blank for all applicable services:

* `counterparty`
* `counterparty-testnet`
* `counterblock`
* `counterblock-testnet`
* `armory_utxsvr`
* `armory_utxsvr-testnet`
* `counterwallet`

**Reparsing blockchain data**

Both `counterparty-server` and `counterblock` read in blockchain data and construct their own internal databases. To reset these databases and trigger a reparse of this blockchain data for one of the services, run:

```
sudo fednode reparse <service>
```

Where service is `counterparty`, `counterparty-testnet`, `counterblock`, or `counterblock-testnet`.

**Rebuilding a service container**

As a more extensive option, if you want to remove, rebuild and reinstall a container (downloading the newest container image/`Dockerfile` and utilizing that):

```
sudo fednode rebuild <service>
```

Where `<service>` is one of the service names listed [earlier](#servicenames), or blank for all services. Note that you are just looking to update the source code and restart the service, `update` is a better option.

**Uninstalling**

To uninstall the entire fednode setup, run:

```
sudo fednode uninstall
```

## Component development

The system allows for easy development and modification of the Counterparty software components. To do so, simply update code in the `counterparty-lib`, `counterparty-cli`, `counterblock` and/or `counterwallet` directories as you see fit. (Note that by default, the `master` branch is checked out of each component, and you'll probably want to switch to `develop` or some other branch before doing your work.)

Once done updating the source code, issue the following command(s) to load the new code:
```
fednode restart <service>
```

Where `<service>` is one of the services mentioned [here](#servicenames_code).

Note that HTTPS repository URLs are used by default for all of the repositories checked out under `src`. To use SSH URIs instead, specify the `--use-ssh-uris` to the install command.

## Counterwallet-Specific

If you are setting up a Counterwallet server, you will next need to create a `counterwallet.conf.json` configuration file.
Instructions for doing that are detailed in the *Counterwallet Configuration File* section later in this document. Once creating this file, open up a web browser, and go to the IP address/hostname of the server. You will then be presented to accept your self-signed SSL certificate, and after doing that, should see the Counterwallet login screen.

### Getting a SSL Certificate

By default, the system is set up to use a self-signed SSL certificate. If you are hosting your services for others, 
you should get your own SSL certificate from your DNS registrar so that your users don't see a certificate warning when
they visit your site. Once you have that certificate, create a nginx-compatible ``.pem`` file, and issue the following command:

```
sudo docker cp <certfile_path> federatednode_counterwallet_1:/etc/ssl/certs/counterwallet.pem
sudo docker cp <keyfile_path> federatednode_counterwallet_1:/etc/ssl/private/counterwallet.key
sudo fednode restart counterwallet
```

### Monitoring the Server

To monitor the server, you can use a 3rd-party service such as [Pingdom](http://www.pingdom.com) or [StatusCake](http://statuscake.com).
The federated node allows these (and any other monitoring service) to query the basic status of the Federated Node via making a HTTP GET call to one of the following URLs:

* ``/_api/`` (for mainnet) 
* ``/_t_api/`` (for testnet)

If all services are up, a HTTP 200 response with the following data will be returned:

    {"counterparty-server": "OK", "counterblock_ver": "1.3.0", "counterparty-server_ver": "9.31.0", "counterblock": "OK",
    "counterblock_check_elapsed": 0.0039348602294921875, "counterparty-server_last_block": {
    "block_hash": "0000000000000000313c4708da5b676f453b41d566832f80809bc4cb141ab2cd", "block_index": 311234,
    "block_time": 1405638212}, "local_online_users": 7, "counterparty-server_check_elapsed": 0.003687143325805664, 
    "counterblock_error": null, "counterparty-server_last_message_index": 91865}
    
Note the ``"counterparty-server": "OK"`` and ``"counterblock": "OK"`` items.

If all services but ``counterparty-server`` are up, a HTTP 500 response with ``"counterparty-server": "NOT OK"``, for instance.

If ``counterblock`` is not working properly, ``nginx`` will return a HTTP 503 (Gateway unavailable) or 500 response.

If ``nginx`` is not working properly, either a HTTP 5xx response, or no response at all (i.e. timeout) will be returned.


### Creating a configuration file

Counterwallet can be configured via editing the `counterwallet.conf.json` file, via issuing the following command:
```
sudo docker exec -it federatednode_counterwallet_1 vim /counterwallet/counterwallet.conf.json
```

This file will contain a valid JSON-formatted object, containing an a number of possible configuration properties. For example::

    { 
      "servers": [ "counterblock1.mydomain.com", "counterblock2.mydomain.com", "counterblock3.mydomain.com" ],
      "forceTestnet": true,
      "googleAnalyticsUA": "UA-48454783-2",
      "googleAnalyticsUA-testnet": "UA-48454783-4",
      "rollbarAccessToken": "39d23b5a512f4169c98fc922f0d1b121Click to send altcoins to this BTC address ",
      "disabledFeatures": ["betting"],
      "restrictedAreas": {
        "pages/betting.html": ["US"],
        "pages/openbets.html": ["US"],
        "pages/matchedbets.html": ["US"],
        "dividend": ["US"]
      },
    }

Here's a description of the possible fields:

**Required fields:**

* **servers**: Counterwallet should work out-of-the-box in a scenario where you have a single Counterblock Federated Node that both hosts the static site content, as well as the backend Counterblock API services. However, Counterwallet can also be set up to work in MultiAPI mode, where it can query more than one server (to allow for both redundancy and load balancing). To do this, set this ``servers`` parameter as a list of multiple server URIs. Each URI can have a ``http://`` or ``https://`` prefix (we strongly recommend using HTTPS), and the strings must *not* end in a slash (just leave it off). If the server hostname does not start with ``http://`` or ``https://``, then ``https://`` is assumed.

If you just want to use the current server (and don't have a multi-server setup), just specify this as ``[]`` (empty list).*

**Optional fields:**

* **forceTestnet**: Set to true to always use testnet (not requiring 'testnet' in the FQDN, or the '?testnet=1' parameter in the URL.
* **googleAnalyticsUA** / **googleAnalyticsUA-testnet**: Set to enable google analytics for mainnet/testnet. You must have a google analytics account.
* **rollbarAccessToken**: Set to enable client-side error tracking via rollbar.com. Must have a rollbar account.
* **disabledFeatures**: Set to a list of zero or more features to disable in the UI. Possible features are:
  ``betting``, ``dividend``, ``exchange``, ``leaderboard``, ``portfolio``, ``stats`` and ``history``. Normally
  this can just be ``[]`` (an empty list) to not disable anything.
* **restrictedAreas**: Set to an object containing a specific page path as the key (or "dividend" for dividend functionality),
  and a list of one or more ISO 2-letter country codes as the key value, to allow for country-level blacklisting of pages/features.

Once done, save this file and make sure it exists on all servers you are hosting Counterwallet static content on, and restart the `counterwallet` service. Now, when you go to your Counterwallet site, the server will read in this file immediately after loading the page, and set the list of
backend API hosts from it automatically.
