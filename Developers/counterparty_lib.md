# counterparty-lib

# Description

counterparty-lib is a ‘pure’ Python library and doesn’t contain any
command‐line scripts. It doesn’t interface a wallet, but only a block explorer.
It does not interface with a user configuration file.


# Installation

```
`pip3 install counterparty-lib`
```

or

```
git clone https://github.com/CounterpartyXCP/counterpartyd.git
cd counterpartyd
python setup.py install`
```

# Example Usage

```
from counterpartylib import server

# initialise the server
db = server.initialise(...)

# start synchronisation with the blockchain and RPC server
server.start_all(db)
```


# Versioning

* Major version changes require a full (automatic) rebuild of the database.
* Minor version changes require a(n automatic) database reparse.
* All protocol changes are retroactive on testnet.
