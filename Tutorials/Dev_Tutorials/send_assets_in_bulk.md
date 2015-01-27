#How to send Counterparty assets in bulk

Below is a script for constructing, signing and broadcasting a large
number of sends efficiently. It assumes that the source addresses are in
a (temporarily) unlocked Bitcoin Core wallet, to which a running
instance of counterpartyd is connected.

This script takes a single command-line argument of the CSV file from
which to pull the sources, destinations, quantities, assets and fees.

##Script
  

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
           

##CSV File

All quantities are specified in satoshis. The format of the CSV file is
“source,destination,asset,quantity,fee” and no header line (with field
names) is allowed.

An example CSV file for input:

       mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,100000000,150
       mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,200000000,100

##Instructions

If the CSV file with the data is called input.csv, and the script is
called sendmany.py, then call this script with
``$ python3 sendmany.py input.csv``.
