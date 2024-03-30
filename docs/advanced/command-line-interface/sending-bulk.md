---
title: How to send Counterparty assets in bulk
---

Below is a script for constructing, signing and broadcasting a large
number of sends efficiently. It assumes that the source addresses are in
a (temporarily) unlocked Bitcoin Core wallet, to which a running
instance of counterpartyd is connected.

This script takes a single command-line argument of the CSV file from
which to pull the sources, destinations, quantities, assets and fees.

**Warning**: This example is outdated as it used the previous addrindex bitcoin
branch, however, same principles apply to current mainline repo.

## Script

```
import csv
import sys

from counterpartylib.lib import util
from counterpartylib.lib import config
from counterpartylib.lib.backend import addrindex

config.BACKEND_URL = 'http://user:password@localhost:4000'
config.BACKEND_SSL_NO_VERIFY = False
config.TESTNET = False
config.REQUESTS_TIMEOUT = 5

def counterparty_api(method, params):
    return util.api(method, params)

def bitcoin_api(method, params):
    return addrindex.rpc(method, params)

def do_send(source, destination, asset, quantity, fee, encoding):
    validateaddress = bitcoin_api('validateaddress', [source])
    assert validateaddress['ismine']
    pubkey = validateaddress['pubkey']
    unsigned_tx = counterparty_api('create_send', {'source': source, 'destination': destination, 'asset': asset, 'quantity': quantity, 'pubkey': pubkey, 'allow_unconfirmed_inputs': True})
    signed_tx = bitcoin_api('signrawtransaction', [unsigned_tx])['hex']
    tx_hash = bitcoin_api('sendrawtransaction', [signed_tx])
    return tx_hash


with open(sys.argv[1], 'r') as csvfile:
      reader = csv.reader(csvfile)
      print('{}|{}|{}'.format('linenum', 'input', 'result'))

      for row in reader:
            if reader.line_num == 1:                                            
                  continue                                                        

            source, destination, asset, quantity, fee = row
            fee, quantity = int(fee), int(quantity)

            try:
                  tx_hash = do_send(source, destination, asset, quantity, fee, 'opreturn')
            except Exception as e:
                  tx_hash = str(e)

            print('{}|{}|{}'.format(reader.line_num, ','.join(row), tx_hash))
```

## CSV File

All quantities are specified in satoshis. The format of the CSV file is as follows:

      source,destination,asset,quantity,fee
      mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,100000000,150
      mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,200000000,100

## Instructions

Use this script on a system with `counterparty-core` installed and in the `PYTHONPATH`. (If using a Federated Node, this is possible by issuing the command `fednode shell counterparty` or `fednode shell counterparty-testnet` as appropriate, and using the script in that shell.)

If the CSV file with the data is called input.csv, and the script is
called sendmany.py, then call this script with
``$ python3 sendmany.py input.csv``.
