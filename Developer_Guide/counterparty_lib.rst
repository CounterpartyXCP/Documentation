`counterparty-lib`
==================

Versioning
~~~~~~~~~~
* Major version changes require a full (automatic) rebuild of the database.
* Minor version changes require a(n automatic) database reparse.
* All protocol changes are retroactive on testnet.

Installation
~~~~~~~~~~

`pip install counterparty-lib`

or

```
git clone https://github.com/CounterpartyXCP/counterpartyd.git
cd counterpartyd
python setup.py install`
```

Example Usage
~~~~~~~~~~

```
from counterpartylib import server

# initialise the server
db = server.initialise(...)

# start synchronisation with the blockchain and RPC server
server.start_all(db)
```
