# counterparty-lib

## Description

`counterparty-lib` is the reference implementation of the [Counterparty Protocol](http://counterparty.io/docs/protocol_specification/).

`counterparty-lib` is a ‘pure’ Python library and doesn’t contain any command‐line scripts. It doesn’t interface a wallet, but only a block explorer (the ‘backend’). It does not interface with a user configuration file, but is configured through the `initialise()` function.


## Requirements

* [Patched Bitcoin Core](bitcoin_core.md)
* [Windows‐specific](windows.md)
* Python 3


## Installation

`counterparty-lib` is distributed on [Python Packaging Index](https://pypi.python.org/pypi/counterparty-lib/).

Please refer to [Python package installation tutorial](http://packaging.python.org/) for detailed instructions how to install Python packages on your system. For software development installations [creating virtualenv](https://packaging.python.org/en/latest/projects.html#virtualenv) is recommended.

`$ pip3 install counterparty-lib`

or for the git master development installation:

```
$ git clone https://github.com/CounterpartyXCP/counterpartyd.git
$ cd counterpartyd/
$ python3 setup.py develop
```


## Upgrades

`$ pip3 install --upgrade counterparty-lib`

or

```
$ cd counterpartyd/
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
* Windows: `C:\Users\<USER>\AppData\Local\Counterparty\counterparty\Logs`

And the log files are named as follows:
* `counterparty[.testnet].log`
* `counterparty[.testnet].api.log`


## Database Files

By default, the database files are located in the following directories:

* Linux: `~/.local/share/counterparty/`
* Windows: `C:\Users\<USER>\AppData\Roaming\Counterparty\counterparty`

And the database files are named as follows:

* `counterparty.N.[.testnet].log`, where `N` is the major version number.


## Versioning

* Major version changes require a full (automatic) rebuild of the database.
* Minor version changes require a(n automatic) database reparse.
* All protocol changes are retroactive on testnet.
