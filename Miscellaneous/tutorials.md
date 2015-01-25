Community How To's
==================

How to Buy and Sell XCP and Counterparty listed Tokens
-------------------------------------------------------

Before buying or selling XCP and tokens, please read the Counterparty
and Counterwallet Terms of Use. They can be found at the bottom of the
Counterparty home page and are displayed every time you create a new
wallet on Counterwallet.io.

###Centralized Exchanges

Counterparty (XCP) is currently traded at the following centralized (crypto)exchanges (listed by volume as of January 2015): 

* [BTer](https://bter.com/trade/xcp_btc) - buy/sell for BTC, CNY and USD (English, Chinese) 
* [Poloniex](https://poloniex.com/exchange/btc_xcp) - buy/sell for BTC 
* [Melotic](https://www.melotic.com/markets/xcp-btc) - buy/sell for BTC 
* [ALTS](https://alts.trade/trade/XCP/BTC) - buy/sell for BTC

***NOTE***: Centralized exchanges are controlled and operated by their
respective owners.

###Counterparty Distributed Exchange

The Counterparty distributed exchange matches orders algorithmically using the Bitcoin blockchain. This means that access is as unfilterable and unrestrictable as the use of Bitcoin itself. Therefore, due diligence is highly advised.

-  [GUI-based Trading on the DEx: How to buy and sell Counterparty assets on the DEx](http://support.counterparty.io/solution/categories/5000013624/folders/5000021046/articles/5000527145-buy-and-sell-assets-tokens-on-the-dex-using-xcp) - how to trade XCP and other Counterparty assets
- [CLI-based Trading on the DEx: How to use the ``counterpartyd`` to buy and sell BTC and other assets on the DEx](http://support.counterparty.io/support/solutions/articles/5000499251-manual-btc-sell-ing-on-the-counterparty-distributed-exchange-dex-using-counterpartyd)

**NOTES**: (1) As you can see or deduce from the way Bitcoin works,
trading on the DEx is slower because each “move” (make offer, cancel
order, etc.) requires several confirmations on the Bitcoin blockchain.
(2) Because the CLI approach is not popular, it is expected that the
liquidity of BTC trading (because it is not accessible from
Counterwallet) is low. XCP and other assets are available from both the
CLI and Counterwallet.

###Differences between Centralized and Distributed (Crypto)Exchanges

-  While the Counterparty DEx eliminates the counterparty risk and
   withdrawal limits, centralized exchanges often provide increased
   speed and lower fees (especially when trading bitcoin).
-  Counterwallet and counterpartyd CLI can be used with Armory.
-  “Buy and hold” users may therefore prefer to use the Distributed
   Exchange, while day-trading types may prefer traditional exchanges.

***NOTE***: Because the ability to buy and sell using bitcoin (aka “BTC
Pay”) was removed from Counterwallet on Nov 5, 2014, today DEx
tokens/assets are usually not denominated in BTC. BTC can still be
traded from the counterpartyd as explained in the how-to article above.
While that approach still suffers from the same inconveniences that
existed in Counterwallet, it does allow trust-less P2P trading with BTC
on the DEx.


How to access testnet using Counterwallet on Federated Node?
------------------------------------------------------------

There are two ways to do that:

-  Edit your /etc/hosts file and add a hostname that has “testnet” in
   it. Example:

   `127.0.0.1 localhost localhost.localdomain testnet.cw.local cw.local`

   Now your mainnet Counterwallet can be accessed at ``cw.local`` and
   your testnet Counterwallet at ``tetstnet.cw.local``.
-  Access testnet at ``https://ip-address/?testnet=1``

How to send Counterparty assets in bulk
---------------------------------------

Below is a script for constructing, signing and broadcasting a large
number of sends efficiently. It assumes that the source addresses are in
a (temporarily) unlocked Bitcoin Core wallet, to which a running
instance of counterpartyd is connected.

This script takes a single command-line argument of the CSV file from
which to pull the sources, destinations, quantities, assets and fees.

###Script
  

     #! /usr/bin/env python3 import csv
     import json
     import sys
     import requests
     
     # SETTINGS
     RPC\_USER = ‘rpc’
     RPC\_PASSWORD = RPC\_HOST = ‘localhost’
     RPC\_PORT = 14000
     
     json\_print = lambda x: print(json.dumps(x, sort\_keys=True,indent=4))
     headers = {‘content-type’: ‘application/json’}
     
     def api(payload):
     host = ‘http://{}:{}@{}:{}’.format(RPC\_USER, RPC\_PASSWORD, RPC\_HOST, RPC\_PORT) response = requests.post(host,data=json.dumps(payload), headers=headers)
       try:
       return response.json()[‘result’]
       except KeyError:
       print(response.json()[‘error’])
       return False
     
      with open(sys.argv[1], ‘r’) as csvfile:
       reader = csv.reader(csvfile)
       for row in reader:
       print(‘Row {}: {}’.format(reader.line\_num, row))
       source, destination, asset, quantity, fee = row
           # Create send.                                                          
           payload = {                                                             
               "method": "do_send",                                            
               "params": {'source': source, 'destination': destination, 'asset': asset, 'quantity': 
                   int(quantity), 'fee': int(fee), 'encoding': 'opreturn'},
               "jsonrpc": "2.0",                                                   
               "id": 0                                                             
           }                         
           

###CSV File

All quantities are specified in satoshis. The format of the CSV file is
“source,destination,asset,quantity,fee” and no header line (with field
names) is allowed.

An example CSV file for input:

       mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,100000000,150
       mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,200000000,100

###Instructions

If the CSV file with the data is called input.csv, and the script is
called sendmany.py, then call this script with
``$ python3 sendmany.py input.csv``.


How to install specific release of Counterparty software using counterparty_build
--------------------------------------------------------------------------------------------------------------

Since early 2015 the main Counterparty repositories such as
``counterpartyd``, ``counterpartyd_build``, ``counterblockd`` and
``Counterwallet`` have version-tagged releases (e.g. 1.0.0).

One may wonder if it’s possible, and how, to pick releases when
installing or updating together a Federated Node.

This can be a complicated topic, but in a nutshell: \* If you want a
specific release, use ``git clone`` to get it (you’d use the same
location used by ``counterparty_build``, and then run the setup script
as usual. \* Things to remember: \* Officially supported releases is
limited to a handful of possible options. For example the current
version of Counterwallet does not support a prehistoric version of
``counterpartyd``, but it may support the current and previous two
releases depending on technical circumstances. \* Another scenario that
probably won’t be tested and supported by ``counterparty_build`` is
upgrades that generally go against best practices, such as rebuilding a
``develop`` system using an older release or branch. See the latest
``counterpartyd_build`` documentation for details, but generally
speaking it’s best to pick one branch (such as ``master``) and stick
with it using the rebuild and update approach offered by
``counterpartyd_build`` scripts.
