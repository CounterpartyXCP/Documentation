# Test Counterparty Server on Regtest network

# Prerequisites

You must have the following three applications installed and available in the $PATH:

* Bitcoin Core
* Addrindexrs
* Counteparty Core

You can follow the instructions here [https://docs.counterparty.io/docs/basics/manual-installation/](https://docs.counterparty.io/docs/basics/manual-installation/) to install them.


# Start the regtest node

## Method 1

Use the `regtestnode.py` script:

```
$ python3 counterpartcore/test/regtest/regtestnode.py
```

This script does the following:

* Starts Bitcoin Core and Addrindexrs
* Generates 10 addresses containing BTC
* Starts `counterparty-server`
* Uses the generated addresses to burn BTC and obtain XCP.

Once finished you have a node ready to use. You can check with:

```
$ curl [http://localhost:24000/v2/](http://localhost:24000/v2/)
$ bitcoin-cli -regtest -rpcuser rpc -rpcpassword rpc -getinfo
```


## Method 2

If you need a server containing sample data you can use:

```
$ python3 counterpartcore/test/regtest/testscenarios.py serve
```

This script performs the same operations as `regtestnode.py` but also executes all scenario transactions found in `counterpartcore/test/regtest/scenarios`.

# Interact with the regtest node

You can use `curl` and `bitcoin-cli` or the `tools/xcpcli.py` tool.
This tool is very easy to use and the help contains complete documentation for each command. It allows:

* To query the API
* to compose, sign and send a transaction across the network in a single command.

Examples:

```
$ python3 tools/xcpcli.py -h
$ python3 tools/xcpcli.py get_asset_balances -h
$ python3 tools/xcpcli.py get_asset_balances --asset XCP
$ python3 tools/xcpcli.py send_send -h
$ python3 tools/xcpcli.py send_send --address bcrt1qusq9znaxgfn8klvw77np3tchv2g0djzf6v3zfn --asset XCP --destination mjts5dr3JwF7U5MMNWkG8dYffEAXEhayFn --quantity 10
```
