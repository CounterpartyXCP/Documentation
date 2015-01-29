#Counterparty CLI

## Description

`counterparty-cli` is a command line interface for [`counterparty-lib`](https://github.com/CounterpartyXCP/counterpartyd).


## Installation

### Pre‐Requisites

* [Patched Bitcoin Core](../Installation/bitcoin_core.md)
* [Windows‐specific](../Installation/windows.md)


### Install

* `$ sudo pip3 install counterparty-cli` (temporarily, with the arguments `--no-use-wheel` and `--pre`)


## Upgrades

* `$ sudo pip3 install --upgrade counterparty-cli`


## Configuration

No configuration should be necessary for most use cases. The location of the configuration file is displayed upon starting the server:
	`$ counterparty-server start`

A `counterparty-server` configuration file looks like this:

	[Default]
	backend-name = addrindex
	backend-user = <user>
	backend-password = <password>
	rpc-host = 0.0.0.0
	rpc-user = <rpcuser>
	rpc-password = <rpcpassword>

A `counterparty-client` configuration file looks like this:

	[Default]
	wallet-name = bitcoincore
	wallet-connect = localhost
	wallet-user = <user>
	wallet-password = <password>
	counterparty-rpc-connect = localhost
	counterparty-rpc-user = <rpcuser>
	counterparty-rpc-password = <password>


## Usage

* The first time you run the server, you may bootstrap the local database with:
	`$ counterparty-server bootstrap`

* Start the server with:
	`$ counterparty-server start`

* Check the status of the server with:
	`$ counterparty-client get_running_info`

* For additional command-line arguments and options:
	`$ counterparty-server --help`
	`$ counterparty-client --help`

<!-- TODO: Logs, Data directory -->
