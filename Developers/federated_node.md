# Setting up a Counterparty Federated Node

## Introduction

A Counterblock Federated Node is a self-contained server that runs the some or all of the Counterparty software via Docker. Each server is fully self-contained, and can be combined by client-side software to allow for high-availability/load balancing.

This document describes how one can set up their own Counterblock Federated Node server(s). It is primarily intended
for system administrators and developers.

### Node Services

Services run on a Federated Node include some or all of the following:

**counterparty-server**: `counterparty-lib` + `counterparty-cli`. Implements support for the core Counterparty protocol, via a provided REST API and command line interface.

**counterblock**: Provides additional services (required by `counterwallet` and potentially other services) beyond those offered in the API provided by `counterparty-server`. It features a full-fledged JSON RPC-based API, and has an extensible architecture to support custom plugins.

**counterwallet**: The reference Web wallet for Counterparty. This is a collection of HTML, CSS and javascript resources, served by `nginx`.

**bitcoind**: Reference Bitcoin implementation, used by `counterparty-server` to sync to the Bitcoin blockchain. We use the [`addrindex`](https://github.com/btcdrak/bitcoin/tree/addrindex-0.12) branch, as it has additional functionality Counterparty requires.

**armory_utxsvr**: A service used by ``counterblock`` with Counterwallet to support [Offline Armory transactions](http://counterparty.io/docs/create_armory_address/). This service requires Armory itself, which is automatically installed as part of the Federated Node setup procedure.

**nginx**: Reverse proxies `counterwallet` access. Not used with `counterparty-server`-only or `counterblock`-only nodes.

**mongodb and redis**: Used by `counterblock`.

## Provisioning

### Hardware / OS selection

**For Production Systems**

Here are the recommendations and/or requirements when setting up a production-grade Federated Node:

- Modern CPU (such as a Xeon E3 or similar)
- 8GB+ RAM (ECC)
- Data redundancy, i.e. 2+ disk drives in a RAID-1, 5 or 6 configuration (SSD prefered)

The exact disk space required will be dependent on what services are run on the node. We recommend **150GB** (to be safe), plus:
- For ``bitcoin`` databases: **~70GB** (mainnet), **~4GB** (testnet)
- For ``counterparty`` and ``counterblock`` databases: **~1500MB** each
- For ``armory_utxsvr``: **~30GB** (mainnet), **~3GB** (testnet)

For the OS, we recommend Ubuntu 16.04 64-bit, but other versions of Linux may work, although we can offer no guarantees.

**For Testing and Development**

If you'd like to set up a Counterblock Federated Node system for testing and development, you
need to set up a Linux Virtual Machine (VM) instance (or hardware), with at least **4 GB**
of memory, and enough disk space to cover the installation and use of the desired components.

### Host system configuration
*(This section assumes a base machine running on Ubuntu. Similar steps apply for other OSes.)*

**Update system**

Update your base system to the newest packages:
```
sudo apt-get update && apt-get upgrade
```

**Install dependencies**

Install git:
```
sudo apt-get install git
```

Install docker and docker-compose (see [here](https://docs.docker.com/compose/install/) for more info):
```
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo bash -c ‘echo “deb https://apt.dockerproject.org/repo ubuntu-xenial main” > /etc/apt/sources.list.d/docker.list’
sudo apt-get update
sudo apt-get purge lxc-docker
sudo apt-get install linux-image-extra-$(uname -r) docker-engine
```

**Port/firewalling setup**

If installing `counterwallet`, ensure that no services are running on port 80, and uninstall/stop them if so:
```
sudo netstat -tulpn | grep ":80 "
```

It’s highly recommended that you use a firewall on the system:
```
sudo ufw allow ssh

#Issue these as needed to firewall through specific ports
# counterparty-server mainnet
sudo ufw allow 4000/tcp

# counterparty-server testnet
sudo ufw allow 14000/tcp

# counterblock mainnet
sudo ufw allow 4001/tcp

# counterblock testnet
sudo ufw allow 14001/tcp

# counterwallet
sudo ufw allow http
sudo ufw allow https

#ENABLE THE FIREWALL
sudo ufw enable
```

**Additional security hardening (optional)**

If you are running a node in a production scenario, it is recommended that you properly secure it. If your host OS is Ubuntu Linux, you can optionally run a little script that will issue a number of commands to assist with this:
```
cd extras/host_security
./run.py
```

Note that this script will make several modifications to your host system as it runs. Feel free to review what it does [here](https://github.com/CounterpartyXCP/federatednode_build/blob/master/extras/host_security/run.py).

## Installation

Clone and checkout everything:
```
git clone https://github.com/CounterpartyXCP/federatednode_build.git && cd federatednode_build
git submodule init && git submodule update
```

Perform **one** of the following:

**Option 1:** If you would like to run `counterparty-server` only:
```
sudo docker-compose -f docker-compose.base.yml up -d
```

**Option 2:** If you would like to run `counterparty-server` and `counterblock`, but not `counterwallet`:
```
sudo docker-compose -f docker-compose.counterblock.yml up -d
```

**Option 3:** If you would like to run a *full federated node configuration*: `counterparty-server`, `counterblock`, `counterwallet` and all required third-party services:
```
sudo docker-compose -f docker-compose.full.yml up -d
```

Once running, the system listens on the following ports:
* `counterparty-server`: 4000/tcp (mainnet), 14000/tcp (testnet)
* `counterblock`: 4001/tcp (mainnet), 14001/tcp (testnet)

For `counterparty-server`, use RPC username `rpc` and default password `1234`.

If `counterwallet` is installed, access to the following URLs will be possible:
* `http://<host>/` — directs to `https`
* `https://<host>/` - main production URL (uses minified JS/CSS)
* `https://<host>/src/` - development URL (uses un-minified JS/CSS)

**Initial sync**

After installation, the services will be automatically started. Note that it will take some time for bitcoind to download the blockchain data. Once this is done, `counterparty-server` will fully start and sync, followed by `counterblock` (if in use). At that point, the server will be usuable.

You may check the sync status by tailing the appropriate service logs.


## Administration

Run `docker-compose ps` to check the status of the containers at any time.

**Tailing logs**

To view (tail) the logs, use the following command:
```
fednode tail <service>
```

Where `<service>` may be one of:
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
fednode stop <service>
fednode start <service>
fednode restart <service>
```

Where `<service>` is one of the service names listed above.

**Getting a shell in a conainer**

```
fednode shell <service>
```

Where `<service>` is one of the service names listed above.

**Issuing a counterparty-server command**

```
fednode cmd <counterparty|counterparty-testnet> <cmd>
```

For example: `fednode cmd counterparty send --source=12u4Vymr3bGTywjMQDgBkwAnazwQuDqzJG --destination=1AanCo9CJSomhUEy2YrhfXrU1PboBhFaBq --quantity=1.5 --asset=XCP`

**Issuing a bitcoind command**

```
fednode cmd <bitcoin|bitcoin-testnet> <cmd>
```

For example: `fednode cmd bitcoin-testnet getpeerinfo`

## Updating components

To pull the newest software from the git repositories and restart the appropriate daemon, issue the following command:

```
fednode upgrade <service>
```

Where `<service>` is one of the following:
* `counterparty`
* `counterblock`
* `counterparty-testnet`
* `counterblock-testnet`
* `counterwallet`

## Component development

The system allows for easy development and modification of the Counterparty software components. To do so, simply update code in the `counterparty-lib`, `counterparty-cli`, `counterblock` and/or `counterwallet` directories as you see fit. (Note that by default, the `master` branch is checked out of each component, and you'll probably want to switch to `develop` or some other branch before doing your work.)

Once done updating the source code, issue the following command(s) to load the new code:
```
fednode reinst <service>
```

Where `<service>` is one of the following:
* `counterparty`
* `counterblock`
* `counterwallet`
* `counterparty-testnet`
* `counterblock-testnet`
* `counterwallet-testnet`

Note that HTTPS repository URLs are used for all of the submodules checked out under `src`. If you are committing changes back, you will be asked for your Github username and password by default. You can avoid this via following [these instructions](https://help.github.com/articles/caching-your-github-password-in-git/).

## Counterwallet-Specific

If you are setting up a Counterwallet server, you will next need to create a `counterwallet.conf.json` configuration file.
Instructions for doing that are detailed in the *Counterwallet Configuration File* section later in this document. Once creating this file, open up a web browser, and go to the IP address/hostname of the server. You will then be presented to accept your self-signed SSL certificate, and after doing that, should see the Counterwallet login screen.

### Getting a SSL Certificate

By default, the system is set up to use a self-signed SSL certificate. If you are hosting your services for others, 
you should get your own SSL certificate from your DNS registrar so that your users don't see a certificate warning when
they visit your site. Once you have that certificate, create a nginx-compatible ``.pem`` file, and issue the following command:

```
fednode instcert <certfile> <keyfile>
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
sudo docker exec -it counterwallet vim /root/counterwallet/counterwallet.conf.json
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

### Enabling multi-lingual support

By default, Counterwallet builds with only (US) English support enabled. To enable support for other languages and I18N features, you must build the Transifex translations. This process is manual as Transifex unfortunately requires a username and password to do this, instead of an API key or some other method of access. Here's the process:

1. Make sure the federated node build process completed successfully, and that you chose "Counterwallet server" for the role.
2. Sign up for an account on http://www.transifex.com
3. Create a file at `/home/xcp/.transifex` with your account username and password the format of `user:password` (i.e. all on one line)
4. Run the command: `sudo su -s /bin/bash -c 'cd ~xcp/counterwallet && grunt transifex --force' xcp`

The translations should then be built, and multilingual support will be enabled on the site.

## Appendix 

### More on multiple Counterwallet servers

For the time being, the Counterparty team itself operates the primary Counterwallet platform at `counterwallet.io`. However, as Counterwallet is open source software, it is possible to host your own site with Counterwallet site (for your personal use, or as an offering to others), or to even host your own Counterwallet servers to use with your own Counterparty wallet implementation. The Counterparty team supports and encourages this kind of activity (as long as the servers are secure), as it aids with increasing decentralization.
        
Also note that due to the nature of Counterwallet being a deterministic wallet, users using one Counterwallet platform (i.e. the official one, for instance) have the flexibility to start using a different Counterwallet platform instead at any time, and as funds (i.e. private keys) are not stored on the server in any fashion, they will be able to see their funds on either. (Note that the only thing that will not migrate are saved preferences, such as address aliases, the theme setting, etc.)

### Counterwallet MultiAPI specifics

Counterwallet utilizes a sort of a "poor man's load balancing/failover" implementation called multiAPI (and implemented
[here](https://github.com/CounterpartyXCP/counterwallet/blob/master/src/js/util.api.js)). multiAPI can operate in a number of fashions.

**multiAPIFailover for Read API (``get_``) Operations**

*multiAPIFailover* functionality is currently used for all read API operations. In this model, the first Federated Node
on the shuffled list is called for the data, and if it returns an error or the request times out, the second one on the
list is called, and so on. The result of the first server to successfully return are used.

Here, a "hacked" server could be modified to return bogus data. As (until being discovered) the server would be in the
shuffled list, some clients may end up consulting it. However, as this functionality is essentially for data queries only,
the worse case result is that a Counterwallet client is shown incorrect/modified data which leads to misinformed actions
on the user's behalf. Moreover, the option always exists to move all read-queries to use multiAPIConsensus in the future should the need arise.

**multiAPIConsensus for Action/Write (``create_``) Operations**

Based on this multiAPI capability, the wallet itself consults more than one of these Federated Nodes via consensus especially
for all ``create_``-type operations. For example, if you send XCP, `counterparty-server` on each server is still composing and sending
back the unsigned raw transaction, but for data security, it compares the results returned from all servers, and will 
only sign and broadcast (both client-side) if all the results match). This is known as *multiAPIConsensus*.

The ultimate goal here is to have a federated net of semi-trusted backend servers not tied to any one country, provider, network or
operator/admin. Through requiring consensus on the unsigned transactions returned for all ``create_`` operations, 'semi-trust'
on a single server basis leads to an overall trustworthy network. Worst case, if backend server is hacked and owned
(and the `counterparty-server` code modified), then you may get some invalid read results, but it won't be rewriting your XCP send
destination address, for example. The attackers would have to hack the code on every single server in the same exact
way, undetected, to do that.

Moreover, the Counterwallet web client contains basic transaction validation code that will check that any unsigned Bitcoin
transaction returned from a Counterblock Federated Node contains expected inputs and outputs. This provides further
protection against potential attacks.

multiAPIConsensus actually helps discover any potential "hacked" servers as well, since a returned consensus set with
a divergent result will be rejected by the client, and thus trigger an examination of the root cause by the team.

**multiAPINewest for Redundant storage**

In the same way, these multiple servers are used to provide redundant storage of client-side preferences, to ensure we
have no single point of failure. In the case of the stored preferences for instance, when retrieved on login, the data from all servers
is taken in, and the newest result is used. This *multiAPINewest* functionality effectively makes a query across all available
Federated Nodes, and chooses the newest result (based on a "last updated"-type timestamp).

Note that with this, a "hacked" server could be modified to always return the latest timestamp, so that its results
were used. However, wallet preferences (and other data stored via this functionality) is non-sensitive, and thus user's
funds would not be at risk before the hacked server could be discovered and removed.
