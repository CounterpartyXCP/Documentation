#Counterparty CLI

## Description

`counterparty-cli` is a command line interface for [`counterparty-lib`](../Developers/counterparty_lib.md).


## Installation

### Prerequisites

* [Patched Bitcoin Core](../Installation/bitcoin_core.md)
* [Windows‐specific](../Installation/windows.md)


### Install

* `$ sudo pip3 install counterparty-cli` (temporarily, with the argument `--pre`)


## Upgrades

* `$ sudo pip3 install --upgrade counterparty-cli`


## Configuration and Maintenance

The paths to the **configuration** files, **log** files and **database** files are printed to the screen when starting the server in ‘verbose’ mode:
	`$ counterparty-server --verbose start`

By default, the **configuration files** is located in the following directories:

* Linux: `~/.config/counterparty/log/`
* Windows: **TODO**

**Logging** and **database files** are handled by [`counterparty-lib`](../Developers/counterparty_lib.md).


### Configuration File Format

Manual configuration is not necessary for most use cases.

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
