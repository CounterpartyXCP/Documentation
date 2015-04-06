#Counterparty CLI

## Description

`counterparty-cli` is a command line interface for [`counterparty-lib`](counterparty_lib.md).


## Requirements

* [Patched Bitcoin Core](bitcoin_core.md)
* Terminal with Unicode Support

## Installation

**Linux and MacOS X**

`$ sudo pip3 install counterparty-cli`

**Windows**

Download and decompress: [https://github.com/CounterpartyXCP/counterparty-cli/releases](https://github.com/CounterpartyXCP/counterparty-cli/releases)

## Upgrades

**Linux and MacOS X**

`$ sudo pip3 install --upgrade counterparty-cli`

**Windows**

Download and decompress the latest release: [https://github.com/CounterpartyXCP/counterparty-cli/releases](https://github.com/CounterpartyXCP/counterparty-cli/releases)

## Configuration and Maintenance

The paths to the **configuration** files, **log** files and **database** files are printed to the screen when starting the server in ‘verbose’ mode:
	`$ counterparty-server --verbose start`

By default, the **configuration files** is located in the following directories:

* Linux: `~/.config/counterparty/`
* Windows: `%APPDATA%/CounterParty/counterparty/`

*(%APPDATA% typically leads to  C:\Users\{USERNAME}\AppData\Roaming)*

And are named as follows:
* `client.conf`
* `server.conf`

**Logging** and **database files** are handled by [`counterparty-lib`](counterparty_lib.md).

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

* The first time you run the server, you can bootstrap the local database with:
	`$ counterparty-server bootstrap`

* Start the server with:
	`$ counterparty-server start`

* Check the status of the server with:
	`$ counterparty-client get_running_info`

* For additional command-line arguments and options:
	`$ counterparty-server --help`
	`$ counterparty-client --help`

## Build Windows Binaries

See [https://github.com/CounterpartyXCP/counterparty-cli/blob/master/release_procedure.md](https://github.com/CounterpartyXCP/counterparty-cli/blob/master/release_procedure.md)

<!-- TODO: Logs, Data directory -->
