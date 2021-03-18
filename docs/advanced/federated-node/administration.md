---
title: Node Administration
---

## Administration

### Checking status

To check the status of the containers, run:
```
fednode ps
```

### Modifying configurations

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

### Viewing/working with stored data

The various services use [Docker named volumes](https://docs.docker.com/engine/tutorials/dockervolumes/) to store data that is meant to be persistent:

* `bitcoin` and `bitcoin-testnet`: Stores blockchain data in the `federatednode_bitcoin-data` volume
* `addrindexrs` and `addrindexrs-testnet`: Stores index data in the `federatednode_addrindexrs-data` volume
* `counterparty` and `counterparty-testnet`: Stores Counterparty databases in the `federatednode_counterparty-data` volume
* `counterblock` and `counterblock-testnet`: Stores Counterblock asset info (images), etc in the `federatednode_counterblock-data` volume
* `mongodb`: Stores the databases for `counterblock` and `counterblock-testnet` in the `federatednode_mongodb-data` volume

Use `docker volume inspect <volume-name>` to display volume location. See `docker volume --help` for help on how to interact with Docker volumes.

### Viewing logs

To tail the logs, use the following command:
```
fednode tail <service>
```

Or, to view the entire log, run:
```
fednode logs <service>
```

Where `<service>` may be one the following, or blank to tail all services:

* `counterparty` (`counterparty-server` mainnet)
* `counterblock` (`counterblock` mainnet)
* `bitcoin` (`bitcoin` mainnet)
* `addrindexrs` (`addrindexrs` mainnet)
* `armory_utxsvr` (`armory_utxsvr` mainnet)
* `counterparty-testnet`
* `counterblock-testnet`
* `bitcoin-testnet`
* `addrindexrs-testnet`
* `armory_utxsvr-testnet`
* `counterwallet`

### Stopping and restarting containers

```
fednode stop <service>
fednode start <service>
fednode restart <service>
```

Where `<service>` is one of the service names listed [above](#servicenames), or blank for all services.

Note that redis and mongodb are shared services and need to run if either (mainnet or testnet) counterblock container is running and shut down only if both counterblock containers are not running.

### Issuing a single shell command

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

Where `<service>` is one of the following, or blank for all applicable services:

* `counterparty`
* `counterparty-testnet`
* `counterblock`
* `counterblock-testnet`
* `armory_utxsvr`
* `armory_utxsvr-testnet`
* `counterwallet`

### Reparsing blockchain data

Both `counterparty-server` and `counterblock` read in blockchain data and construct their own internal databases. To reset these databases and trigger a reparse of this blockchain data for one of the services, run:

```
fednode reparse <service>
```

Where service is `counterparty`, `counterparty-testnet`, `counterblock`, or `counterblock-testnet`.

### Rebuilding a service container

As a more extensive option, if you want to remove, rebuild and reinstall a container (downloading the newest container image/`Dockerfile` and utilizing that):

```
fednode rebuild <service>
```

Where `<service>` is one of the service names listed [earlier](#servicenames), or blank for all services. Note that you are just looking to update the source code and restart the service, `update` is a better option.

### Uninstalling

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

### Other Developer Notes

* To run the `counterparty-lib` test suite, execute:
```
fednode exec counterparty "cd /counterparty-lib/counterpartylib; py.test --verbose --skiptestbook=all --cov-config=../.coveragerc --cov-report=term-missing --cov=./"
```
* If you are working on `counterwallet`, you should browse the system using the `/src/` subdirectory (e.g. `https://mycounterwallet.bla/src/`). This avoids using precompiled sources. Once you are happy with your changes and ready to make them available to everyone that hits the server, run `fednode update counterwallet`, which will pull the newest repo code and repackage the web assets so that the code updates are then active from `https://mycounterwallet.bla/`.

* Note that when you install the federated node system, HTTPS repository URLs are used by default for all of the repositories checked out under `src` by `fednode.py`. To use SSH URIs instead, specify the `--use-ssh-uris` to the `fednode install` command.
