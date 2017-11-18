# Setting up a Counterparty Node

## Introduction

This document describes how one can set up their own Counterparty "Federated Node" system, on Linux, Windows or OS X.

A Federated Node is a self-contained system that runs the some or all of the Counterparty software stack, via Docker. Each system operates as a Bitcoin and Counterparty "full node". Using this toolset, one can generally get started running the Counterparty software much quicker and more easily than a manual installation of the various components.

The document is primarily intended for power users and developers. 

### Node Services
<a name="services"></a>
Services run on a Federated Node include some or all of the following:

* **counterparty-server**: `counterparty-lib` + `counterparty-cli`. Implements support for the core Counterparty protocol, via a provided REST API and command line interface.
* **counterblock**: Provides additional services (required by `counterwallet` and potentially other services) beyond those offered in the API provided by `counterparty-server`. It features a full-fledged JSON RPC-based API, and has an extensible architecture to support custom plugins.
* **counterwallet**: The reference Web wallet for Counterparty. This is a collection of HTML, CSS and javascript resources, served by `nginx`.
* **bitcoind**: Reference Bitcoin implementation, used by `counterparty-server` to sync to the Bitcoin blockchain. We use the [`addrindex`](https://github.com/btcdrak/bitcoin/tree/addrindex-0.12) branch, as it has additional functionality Counterparty requires.
* **armory_utxsvr**: A service used by ``counterblock`` with Counterwallet to support [Offline Armory transactions](http://counterparty.io/docs/create_armory_address/). This service requires Armory itself, which is automatically installed as part of the Federated Node setup procedure.
* **nginx**: Reverse proxies `counterwallet` access. Not used with `counterparty-server`-only or `counterblock`-only nodes.
* **mongodb and redis**: Used by `counterblock`.

Please note that Federated Node should not be installed on a system which already has one or more of conflicting services running on the ports used by Federated Node. The Federated Node install script checks that required ports are unused and exits to avoid conflict. If you have a non-essential Web, mongodb or other service running on the target system you can disable them or bind them to a different port to be able to pass the built-in check and avoid application conflicts.

### Hardware / OS requirements
<a name="requirements"></a>

- **Memory**: 4GB RAM (`bitcoind`, `counterparty-server` only), 8GB+ RAM (full stack)
- **Disk space:** The exact disk space required will be dependent on what services are run on the node:
    - For ``bitcoin`` databases: **~120GB** (mainnet), **~10GB** (testnet)
    - For ``counterparty`` and ``counterblock`` databases: **~1.5GB** each
    - For ``armory_utxsvr``: **~30GB** (mainnet), **~3GB** (testnet)
- **OS:** *Please note that Ubuntu Linux is the recommended OS at this time, as most of our testing is performed on it. Windows and OS X support is considered in BETA.*
    - **Linux**: We recommend Ubuntu 16.04 64-bit, but other, modern versions of Linux should work, as long as they support the newest released version of Docker
    - **Windows**: Windows 7 or higher, or Server 2008 or higher. 64-bit required
    - **OS X**: 10.8 "Mountain Lion" or higher

## Pre-installation

### Windows

**NOTE**: Installation on Windows is still in *BETA* state, and we cannot promise a fully-working environment. [Please report](https://github.com/CounterpartyXCP/federatednode/issues) any bugs you find.

* **Python 3.5.x**: [Download and install](https://www.python.org/downloads/) the latest Python 3.5.x release. Make sure you check the box "Add Python 3.5 to PATH" on the first page. (If you get an error during installation, make sure your windows system is fully updated via Windows Update.)
* **Docker**: If using Windows 10, we recommend to [install Docker for Windows](https://docs.docker.com/engine/installation/windows/). For all other versions of Windows, [install Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/). 
* **Git**: Make sure `git` is installed. If not, install it from [here](https://git-scm.com/download/win) (note that if using Docker Toolbox, it will install it by default).

**If using Docker for Windows**: 

* After installing Docker for Windows, launch the "Docker" application and allow it to set itself up (a reboot may be required).
* Next, you will need to enable access to your host hard drive so that some of the shared volumes work properly. To do this, right click on the Docker Whale icon in your system tray. Then go to "Docker Settings" and then "Shared Drives". Turn on access to the drive on which the `federatednode` folder will reside (most likely your "C" drive).
* Finally, launch [a command prompt as Administrator](https://technet.microsoft.com/en-us/library/cc947813(v=ws.10).aspx)

<a name="docker-toolbox-note"></a> **If using Docker Toolbox**:

* After installation completes, launch the "Docker Quickstart Terminal" and let it configure itself.
* Once this finishes, you will need to resize the Virtual Machine that Docker Toolbox uses to run the Docker containers. Note that it currently limits this VM to 1GB of memory and  20GB hard disk space total by default (shared across _all_ containers). You will need to update this to _at least_ 2 or 4GB memory and 50-100GB space. To do this, execute commands like the following (replacing the numbers in the second command as appropriate, based on the [system requirements](#requirements)):
```
docker-machine rm default
docker-machine create --driver virtualbox --virtualbox-disk-size "100000" --virtualbox-memory "4096" default
```

Then, relaunch the Docker Quickstart Terminal, and verify that `docker ps` functions normally (if not, restart the system and try the command again).

### OS X

* **Python 3.5.x**: [Download and install](https://www.python.org/downloads/) the latest Python 3.5.x release. Make sure you check the box "Add Python 3.5 to PATH" on the first page.
* **Docker**: If using OS X Yosemite or higher, we recommend to [install Docker for Mac](https://docs.docker.com/engine/installation/mac/). For Older Macs, [install Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_mac/).
* **Git**: Make sure `git` is installed. If not, install it from [here](https://git-scm.com/download/mac) (note that if using Docker Toolbox, it will install it by default).

If using **Docker for Mac**, launch the "Docker" application and allow it to set itself up, then open a terminal prompt.

If using **Docker Toolbox**, launch the "Docker Quickstart Terminal" once installation finishes, and follow the instructions on resizing your VM [above](#docker-toolbox-note).


### Linux

(Instructions are provided for Ubuntu Linux. Other Linuxes will be similar. Use a sudo-er account, but not root)

**Update system & install dependencies**

Make sure you have Python 3.5. (Ubuntu 14.04 for instance uses Python 3.4 by default), but 16.04 uses 3.5. If you have an Ubuntu version older than 3.4, you can update your Python with [these instructions](http://askubuntu.com/a/682875).

```
sudo apt-get update && sudo apt-get upgrade
sudo apt-get -y install git curl coreutils
```

Install docker-ce and docker-compose (see [here](https://docs.docker.com/compose/install/) for more info, here we use v1.16.1):
```
sudo -i # become root
curl -fsSL https://get.docker.com/ | sh
curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
exit # leave root shell
```

## Installation

On Linux and OS X, install as a non-root sudo-er from home directory. 

**Clone and check out the code**

On all OS, clone federatednode repo and enter cloned directory:
```
git clone https://github.com/CounterpartyXCP/federatednode.git
cd federatednode
```

On Linux and OS X:
```
sudo ln -sf `pwd`/fednode.py /usr/local/bin/fednode
```

On Windows (if using Docker Quickstart Terminal, a.k.a MINGW64):
```
mkdir ~/bin
echo "python.exe \"`pwd`\\fednode.py\" \$*" > ~/bin/fednode
chmod +x ~/bin/fednode
```

On Windows (if using Windows Command prompt):
```
> C:\Windows\fednode.bat echo python.exe %CD%\fednode.py \%*
```

**Build and link the containers**

Run the following command:
```
fednode install <CONFIG> <BRANCH>
```

Where `<CONFIG>` is one of the following:

* **`base`** if you want to run `counterparty-server` and `bitcoind` only
* **`counterblock`** if you want to run everything in `base`, with the addition of `counterblock` and its dependencies (`mongodb` and `redis`)
* **`full`** if you would like to run a *full federated node configuration*, which is all services on the [list above](#services)

And where `<BRANCH>` is one of the following:

* **`master`** (stable and recommended)
* **`develop`** (cutting edge, likely with bugs)

For example:
```
# install a base configuration for the master branch
fednode install base master

# install a full configuration for the develop branch
fednode install full develop
```
In some cases (slow host, limited bandwidth), you may experience a failure to install due to download timeouts which happen because of . In that case consider changing Docker's `max-concurrent-downloads` value to 1 or 2 from default 3. To do that create a custom `/etc/docker/daemon.json` daemon options file and restart Docker service.

As mentioned earlier, the install script may stop if ports used by Federated Node services are used by other applications. While it is not recommended to run Federated Node alongside production services, small changes can make the evaluation of Federated Node easier. For example you may change ports used by existing applications (or disable said applications) or run Federated Node inside of a virtual machine. 

For example, the original mongodb can be reconfigured to listen on port 28018 and counterblock's mongodb can use the default port 27017. The Federated Node install script makes it possible to specify the interface used by its mongodb container (example below), but it currently does not have the ability to do this for other services or get around port conflicts.

```
fednode install --mongodb-interface 127.0.0.2 counterblock master
```

**Wait for initial sync**

After installation, the services will be automatically started. To check the status, issue:
```
fednode ps
```

If you have existing instances of Bitcoin Core (either mainnet or testnet), at this point you could stop all services listed in `fednode ps` output, change configuration files (of counterparty and counterblock, for example) and point them to your existing Bitcoin Core. Configuration files can be found in various service directories located under federatednode/config. 

Once the containers are installed and running, keep in mind that it will take some time for `bitcoind` to download the blockchain data. Once this is done, `counterparty-server` will fully start and sync, followed by `counterblock` (if in use). At that point, the server will be usable. 

You may check the sync status by tailing the appropriate service logs, e.g. for Bitcoin Core and Counterparty server on mainnet:
```
fednode tail bitcoin
fednode tail counterparty
```

<a name="accessing"></a>**Access the system**

Once running, the system listens on the following ports:

* `counterparty-server`: 4000/tcp (mainnet), 14000/tcp (testnet)
* `counterblock`: 4001/tcp (mainnet), 14001/tcp (testnet)

For `counterparty-server`, use RPC username `rpc` and default password `1234`.

If `counterwallet` is installed, access to the following URLs will be possible:

* `http://<host>/` — directs to `https`
* `https://<host>/` - main production URL (uses minified JS/CSS)
* `https://<host>/src/` - development URL (uses un-minified JS/CSS)

## Post-installation tasks

Ensure that your firewall software is enabled. If you want to provide access from external systems, you can allow through some or all of the [appropriate ports](#accessing). In addition, if you are running a node in a production scenario, it is recommended that you properly secure it.

You may also want to tighten ownership and permissions on all conf files in federatednode/config subdirectories, but keep in mind that you should be the only user with access to the operating system that runs Federated Node containers: Federated Node is not designed for shared OS environments.

**Ubuntu Linux**

Ubuntu Linux users can optionally run a little script that will issue a number of commands to assist with securing their systems:
```
cd extras/host_security
sudo ./run.py
```

Note that this script will make several modifications to your host system as it runs. Please review what it does [here](https://github.com/CounterpartyXCP/federatednode/blob/master/extras/host_security/run.py) before using it.

If you expect to run a busy Federated Node that requires counterblock, you can consider making the following performance tweaks for mongodb and redis. Please do not make these changes to the host if you're not comfortable with them because they impact not only Docker but the entire OS.

* Disable huge memory pages (for redis and mongodb): on Ubuntu 16.04 add `echo "never" > /sys/kernel/mm/transparent_hugepage/enabled` to /etc/rc.local and run `sudo systemctl enable rc-local.service`. Reboot and check with `cat /sys/kernel/mm/transparent_hugepage/enabled` (expected setting: `[never]`).
* Edit /etc/sysctl.conf (for redis): add `net.core.somaxconn = 511` and `vm.overcommit_memory = 1` and run `sudo sysctl -p`.

## Administration

**Checking status**

To check the status of the containers, run:
```
fednode ps
```

**Modifying configurations**

Configuration files for the `bitcoin`, `counterparty` and `counterblock` services are stored under `federatednode/config/` and may be freely edited. The various locations are as follows:

* `bitcoin`: See `federatednode/config/bitcoin/bitcoin.conf`
* `bitcoin-testnet`: See `federatednode/config/bitcoin/bitcoin.testnet.conf`
* `counterparty`: See `federatednode/config/counterparty/server.conf`
* `counterparty-testnet`: See `federatednode/config/counterparty/server.testnet.conf`
* `counterblock`: See `federatednode/config/counterblock/server.conf`
* `counterblock-testnet`: See `federatednode/config/counterblock/server.testnet.conf`
* `redis`: shared service used for both mainnet and testnet 
* `mongodb`: shared service used for both mainnet and testnet

Remember: once done editing a configuration file, you must `restart` the corresponding service. Also, please don't change port or usernames/passwords if the configuration files unless you know what you are doing (as the services are coded to work together smoothly with specific values).

For example, a user with base setup (Bitcoin Core & Counterparty Server) could make Counterparty use existing Bitcoin Core by changing configuration files found under federatednode/config/counterparty/ (`backend-connect` in Counterparty server configuration files and `wallet-connect` in client configuration files.) At this point Bitcoin Core (mainnet and/or testnet) container(s) could be stopped and counterparty server container restarted. If your existing Bitcoin Server allows RPC connections, with proper settings and correct RPC credentials in their configuration files, counterparty (server), counterblock and counterwallet can all use it so that you don't have to run bitcoin or bitcoin-testnet container.

**Viewing/working with stored data**

The various services use [Docker named volumes](https://docs.docker.com/engine/tutorials/dockervolumes/) to store data that is meant to be persistent:

* `bitcoin` and `bitcoin-testnet`: Stores blockchain data in the `federatednode_bitcoin-data` volume
* `counterparty` and `counterparty-testnet`: Stores Counterparty databases in the `federatednode_counterparty-data` volume
* `counterblock` and `counterblock-testnet`: Stores Counterblock asset info (images), etc in the `federatednode_counterblock-data` volume
* `mongodb`: Stores the databases for `counterblock` and `counterblock-testnet` in the `federatednode_mongodb-data` volume

Use `docker volume inspect <volume-name>` to display volume location. See `docker volume --help` for help on how to interact with Docker volumes.

**Viewing logs**

To tail the logs, use the following command:
```
fednode tail <service>
```

Or, to view the entire log, run:
```
fednode logs <service>
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
fednode stop <service>
fednode start <service>
fednode restart <service>
```

Where `<service>` is one of the service names listed [above](#servicenames), or blank for all services.

Note that redis and mongodb are shared services and need to run if either (mainnet or testnet) counterblock container is running and shut down only if both counterblock containers are not running.

**Issuing a single shell command**

```
fednode exec <service> <CMD>
```

Where `<service>` is one of the service names listed [above](#servicenames), and `<CMD>` is an arbitrary shell command.

For example:
```
fednode exec counterparty counterparty-client send --source=12u4Vymr3bGTywjMQDgBkwAnazwQuDqzJG --destination=1AanCo9CJSomhUEy2YrhfXrU1PboBhFaBq --quantity=1.5 --asset=XCP
fednode exec bitcoin-testnet bitcoin-cli getpeerinfo
fednode exec counterblock ls /root
```

**Getting a shell in a conainer**

```
fednode shell <service>
```

Where `<service>` is one of the service names listed [above](#servicenames).


## Updating, rebuilding, uninstalling

To pull the newest software from the git repositories and restart the appropriate daemon, issue the following command:

```
fednode update <service>
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
fednode reparse <service>
```

Where service is `counterparty`, `counterparty-testnet`, `counterblock`, or `counterblock-testnet`.

**Rebuilding a service container**

As a more extensive option, if you want to remove, rebuild and reinstall a container (downloading the newest container image/`Dockerfile` and utilizing that):

```
fednode rebuild <service>
```

Where `<service>` is one of the service names listed [earlier](#servicenames), or blank for all services. Note that you are just looking to update the source code and restart the service, `update` is a better option.

**Uninstalling**

To uninstall the entire fednode setup, run:

```
fednode uninstall
```

## Component development

The system allows for easy development and modification of the Counterparty software components. To do so, simply update code in the directories under `federatednode/src/` as you see fit. These directories are mapped into the appropriate containers, overlaying (overriding) the source code that the container ships with. This, along with symlinked (develop) Python package installations makes it possible to work on code in-place, with just a service restart necessary to have the changes take effect.

Once done updating the source code for a particular service, issue the following command(s) to restart the container with the new code:
```
fednode restart <service>
```
Where `<service>` is one of the services mentioned [here](#servicenames_code).

**Other Developer Notes**

* To run the `counterparty-lib` test suite, execute:
```
fednode exec counterparty "cd /counterparty-lib/counterpartylib; py.test --verbose --skiptestbook=all --cov-config=../.coveragerc --cov-report=term-missing --cov=./"
```
* If you are working on `counterwallet`, you should browse the system using the `/src/` subdirectory (e.g. `https://mycounterwallet.bla/src/`). This avoids using precompiled sources. Once you are happy with your changes and ready to make them available to everyone that hits the server, run `fednode update counterwallet`, which will pull the newest repo code and repackage the web assets so that the code updates are then active from `https://mycounterwallet.bla/`.

* Note that when you install the federated node system, HTTPS repository URLs are used by default for all of the repositories checked out under `src` by `fednode.py`. To use SSH URIs instead, specify the `--use-ssh-uris` to the `fednode install` command.

## Counterwallet-Specific

If you are setting up a Counterwallet server, you will next need to create a `counterwallet.conf.json` configuration file.
Instructions for doing that are detailed in the *Counterwallet Configuration File* section later in this document. Once creating this file, open up a web browser, and go to the IP address/hostname of the server. You will then be presented to accept your self-signed SSL certificate, and after doing that, should see the Counterwallet login screen.

### Getting a SSL Certificate

By default, the system is set up to use a self-signed SSL certificate. If you are hosting your services for others, 
you should get your own SSL certificate from your DNS registrar so that your users don't see a certificate warning when
they visit your site.

Once you have that certificate, create a nginx-compatible ``.pem`` file. Copy that `.pem` file to `federatednode/config/counterwallet/ssl/counterwallet.pem` and the cooresponding certificate `.key` file to `federatednode/config/counterwallet/ssl/counterwallet.key`. (Note that there will be a `counterwallet.key` and `counterwallet.pem` file already there, which are the default, self-signed certificates, and can be safely overridden.) Then, restart the `counterwallet` service for the new certificate to take effect.


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
