# counterparty-lib

## Description

`counterparty-lib` is the reference implementation of the [Counterparty Protocol](https://counterparty.io).

`counterparty-lib` is a ‘pure’ Python library and doesn’t contain any command‐line scripts. It doesn’t interface a wallet, but only a block explorer (the ‘backend’). It does not interface with a user configuration file, but is configured through the `initialise()` function.


## Requirements

* [Patched Bitcoin Core](https://github.com/btcdrak/bitcoin/releases) with the following options set:

	```
	rpcuser=bitcoinrpc
	rpcpassword=<password>
	server=1
	txindex=1
	addrindex=1
	rpcthreads=1000
	rpctimeout=300
	```


## Installation

`$ sudo pip3 install counterparty-lib`

or

```
$ git clone https://github.com/CounterpartyXCP/counterpartyd.git
$ cd counterpartyd/
$ python3 setup.py install`
```


## Upgrades

* `$ sudo pip3 install --upgrade counterparty-cli`

or

```
$ cd countertpartyd/
$ git pull
$ python3 setup.py install
```


## Usage

```
$ python3
>>> from counterpartylib import server
>>> db = server.initialise(<options>)
>>> server.start_all(db)
```

## Logging

By default, logs are located in the following directories:

* Linux: `~/.cache/counterparty/log/`
* Windows: `C:\Users\\<USER>\AppData\Local\Counterparty\counterparty\Logs`

And the log files are named as follows:
* `counterparty[.testnet].log`
* `counterparty[.testnet].api.log`


## Database Files

By default, the database files are located in the following directories:

* Linux: `~/.local/share/counterparty/`
* Windows: **TODO**

And the database files are named as follows:

* `counterparty.N.[.testnet].log`, where `N` is the major version number.


## Versioning

* Major version changes require a full (automatic) rebuild of the database.
* Minor version changes require a(n automatic) database reparse.
* All protocol changes are retroactive on testnet.
