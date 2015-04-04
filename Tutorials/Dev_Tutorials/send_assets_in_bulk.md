#How to send Counterparty assets in bulk

Below is a script for constructing, signing and broadcasting a large
number of sends efficiently. It assumes that the source addresses are in
a (temporarily) unlocked Bitcoin Core wallet, to which a running
instance of counterpartyd is connected.

This script takes a single command-line argument of the CSV file from
which to pull the sources, destinations, quantities, assets and fees.

##Script

```
import csv
import sys

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
          except (util.RPCError, addrindex.BackendRPCError) as e:
              tx_hash = str(e)

          print('{}|{}|{}'.format(reader.line_num, ','.join(row), tx_hash))
```

##CSV File

All quantities are specified in satoshis. The format of the CSV file is as follows:

      source,destination,asset,quantity,fee
      mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,100000000,150
      mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,200000000,100

##Instructions

If the CSV file with the data is called input.csv, and the script is
called sendmany.py, then call this script with
``$ python3 sendmany.py input.csv``.
