#Server API

[TOC]


##Overview

The ``counterparty-lib`` server provides a JSON RPC 2.0-based API based off of
that of Bitcoin Core. It is the primary means by which other applications
should interact with the Counterparty network.

For maximum modularity, flexibility and robustness, the API server doesn’t
interact with any Bitcoin wallets itself, even Bitcoin Core's built-in one.
(See the section [Wallet Integration](#Wallet-Integration).)

The API server is started either through the [`CLI interface`](counterparty-cli.md) or with the
[`counterparty-lib`](counterparty_lib.md) Python library.

The API listens on port 4000 by default (14000 for ``testnet``) and requires
HTTP Basic Authentication to connect. It uses JSON RPC 2.0.


##Getting Started

By default, the server will listen on port ``4000`` (if on mainnet) or port ``14000`` (on testnet) for API
requests. 

Note that this API is built on JSON-RPC 2.0, not 1.1. JSON-RPC itself is pretty lightweight, and API requests
are made via a HTTP POST request to ``/api/`` (note the trailing slash), with JSON-encoded data passed as the POST body.


###General Format

All requests must have POST data that is JSON encoded. Here's an example of the POST data for a valid API request:


    {
      "method": "get_sends",
      "params": {"order_by": 'tx_hash',
                 "order_dir": 'asc',
                 "start_block": 280537,
                 "end_block": 280539},
      "jsonrpc": "2.0",
      "id": 0,
    }

The ``jsonrpc`` and ``id`` properties are requirements under the JSON-RPC 2.0 spec.

You should note that the data in ``params`` is a JSON object (e.g. mapping), not an array. In other words, 
**the API only supports named arguments, not positional arguments** (e.g. use
{"argument1": "value1", "argument2": "value2"} instead of ["value1", "value2"]). This is the case for safety and bug-minimzation reasons.

For more information on JSON RPC, please see the [JSON RPC 2.0 specification](http://www.jsonrpc.org/specification).


###Authentication

The API interface requires HTTP basic authentication to use. The configuration
of the server depends on the method used to start it.

**The default user is ``'rpc'``.**
**The password must be set manually before the server will start.**


(Submissions for additional languages are welcome!) 


##Example Implementations

The following examples have the `user` set to its default value of `'rpc'`.

###Python

    import json
    import requests
    from requests.auth import HTTPBasicAuth
    
    url = "http://localhost:4000/api/"
    headers = {'content-type': 'application/json'}
    auth = HTTPBasicAuth('rpc', PASSWORD)
    
    payload = {
      "method": "get_running_info",
      "params": {},
      "jsonrpc": "2.0",
      "id": 0,
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers, auth=auth)
    print("Response: ", response.text)


###PHP

With PHP, you use the [JsonRPC](https://github.com/fguillot/JsonRPC)
library.


    <?php
    require 'JsonRPC/src/JsonRPC/Client.php';
    use JsonRPC\Client;
    $client = new Client('http://localhost:4000/api/');
    $client->authentication('rpc', PASSWORD);
    
    $result = $client->execute('get_balances', array('filters' => array('field' => 'address', 'op' => '==', 'value' => '1NFeBp9s5aQ1iZ26uWyiK2AYUXHxs7bFmB')));
    print("get_balances result:\n");
    var_dump($result);
    
    $result2 = $client->execute('get_running_info');
    print("get_running_info result:\n");
    var_dump($result2);
    ?>

###curl

    curl http://127.0.0.1:4000/api/ --user rpc:$PASSWORD -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript' --data-binary '{"jsonrpc":"2.0","id":0,"method":"get_running_info"}'

**NOTE:** On Windows, the command may need to be formatted differently due to problems that Windows has with escapes.


##Example Parameters


* Fetch all balances for all assets for both of two addresses, using keyword-based arguments

        payload = {
                   "method": "get_balances",
                   "params": {
                              "filters": [{'field': 'address', 'op': '==', 'value': "14qqz8xpzzEtj6zLs3M1iASP7T4mj687yq"},
                                          {'field': 'address', 'op': '==', 'value': "1bLockjTFXuSENM8fGdfNUaWqiM4GPe7V"}],
                              "filterop": "or"
                             },
                   "jsonrpc": "2.0",
                   "id": 0,
                  }

* Get all burns between blocks 280537 and 280539 where greater than .2 BTC was burned, sorting by tx_hash (ascending order)

        payload = {
                   "method": "get_burns",
                   "params": {
                              "filters": {'field': 'burned', 'op': '>', 'value': 20000000},
                              "filterop": "AND",
                              "order_by": 'tx_hash',
                              "order_dir": 'asc',
                              "start_block": 280537,
                              "end_block": 280539
                             },
                   "jsonrpc": "2.0",
                   "id": 0,
                  }
    
* Fetch all debits for > 2 XCP between blocks 280537 and 280539, sorting the results by quantity (descending order)

        payload = {
                   "method": "get_debits",
                   "params": {
                              "filters": [{'field': 'asset', 'op': '==', 'value': "XCP"},
                                          {'field': 'quantity', 'op': '>', 'value': 200000000}],
                              "filterop": 'AND',
                              "order_by": 'quantity',
                              "order_dir": 'desc'
                             },
                   "jsonrpc": "2.0",
                   "id": 0,
                  }

    
* Send 1 XCP (specified in satoshis) from one address to another.

        payload = {
                   "method": "create_send",
                   "params": {
                              'source': "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              'destination': "17rRm52PYGkntcJxD2yQF9jQqRS4S2nZ7E",
                              'asset': "XCP",
                              'quantity': 100000000
                             },
                   "jsonrpc": "2.0",
                   "id": 0,
                  }
    
* Issuance (indivisible)

        payload = {
                   "method": "create_issuance",
                   "params": {
                              'source': "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              'asset': "MYASSET",
                              'quantity': 1000,
                              'description': "my asset is cool",
                              'divisible': False
                             },
                   "jsonrpc": "2.0",
                   "id": 0,
                  }

* Transfer asset ownership

        payload = {
                   "method": "create_issuance",
                   "params": {
                              'source': "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              'transfer_destination': "17rRm52PYGkntcJxD2yQF9jQqRS4S2nZ7E",
                              'asset': "MYASSET",
                              'quantity': 0
                             },
                   "jsonrpc": "2.0",
                   "id": 0,
                  }

* Lock asset

        payload = {
                   "method": "create_issuance",
                   "params": {
                              'source': "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              'asset': "MYASSET",
                              'quantity': 0,
                              'description': 'LOCK'
                             },
                   "jsonrpc": "2.0",
                   "id": 0,
                  }


##Wallet Integration

**Note:** Before v9.49.4, the counterpartyd API provided an interface to Bitcoin Core's signing functionality through the `do_*`, `sign_tx` and `broadcast_tx` methods, which have all since been removed.

The process of making a transaction, from start to finish, depends somewhat on the wallet software used. Below are examples of how one might use a wallet to sign and broadcast an unsigned Counterparty transaction *created* with this API.

**Bitcoin Core with Python**

    def do_send(source, destination, asset, quantity):
            validateaddress = bitcoind_api('validateaddress', [source])
            assert validateaddress['is_mine']
            pubkey = validateaddress['pubkey']
            unsigned_tx = counterpartylib_api('create_send', {'source': source, 'destination': destination, 'asset': asset, 'quantity': quantity, 'pubkey': pubkey})
            signed_tx = bitcoind_api('signrawtransaction', [unsigned_tx])
            tx_hash = bitcoind_api('sendrawtransaction', [signed_tx])
            return tx_hash

**Bitcoin Core with Javascript**

    <html>
        <script src="https://raw.githubusercontent.com/bitpay/bitcore/82ce08b8932c3c9d86105982109101bab1a47827/browser/bundle.js"></script>
        <script src="https://raw.githubusercontent.com/CounterpartyXCP/counterwebdeps/master/js/util.bitcore.js"></script>
        <script src="https://raw.githubusercontent.com/CounterpartyXCP/counterwebdeps/master/js/external/mnemonic.js"></script>
        <script>
        counterparty_api = function(method, params) {
            // calls Counterparty API method with you prefered method
        }

        bitcoin_api = function(method, params) {
            // calls Bitcoin Core API method with you prefered method
        }

        // generate a passphrase
        var m = new Mnemonic(128); //128 bits of entropy (12 word passphrase)
        var words = m.toWords();
        var passphrase = words.join(' ')

        // generate private key, public key and address from the passphrase
        wallet = new CWHierarchicalKey(passphrase);
        var cwk = wallet.getAddressKey(i); // i the number of the address
        var source = key.getAddress();
        var pubkey = cwk.getPub()

        // generate unsigned transaction
        unsigned_hex = counterparty_api('create_send', {'source': source, 'destination': destination, 'asset': asset, 'quantity': quantity, 'pubkey': pubkey})

        CWBitcore.signRawTransaction2(self.unsignedTx(), cwk, function(signedHex) {
            bitcoin_api('sendrawtransaction', signedHex)
        })
        </script>
    </html>

##Terms & Conventions


###assets

Everywhere in the API an asset is referenced by its name, not its ID. See the
Counterparty protocol specification for what constitutes a valid asset name.
Examples:

- "BTC"
- "XCP"
- "FOOBAR"
- "A7736697071037023001"


###Quantities and balances

Anywhere where an quantity is specified, it is specified in **satoshis** (if a divisible asset), or as whole numbers
(if an indivisible asset). To convert satoshis to floating-point, simply cast to float and divide by 100,000,000.

Examples:

- 4381030000 = 43.8103 (if divisible asset)
- 4381030000 = 4381030000 (if indivisible asset) 

**NOTE:** XCP and BTC themselves are divisible assets.


###floats

Floats are are ratios or floating point values with six decimal places of precision, used in bets and dividends.


##Miscellaneous

###Filtering Read API results

The Counterparty API aims to be as simple and flexible as possible. To this end, it includes a straightforward
way to filter the results of most [Read API](#read-api-function-reference) to get the data you want, and only that.

For each Read API function that supports it, a ``filters`` parameter exists. To apply a filter to a specific data field,
specify an object (e.g. dict in Python) as this parameter, with the following members:

- field: The field to filter on. Must be a valid field in the type of object being returned
- op: The comparison operation to perform. One of: ``"=="``, ``"!="``, ``">"``, ``"<"``, ``">="``, ``"<="``, ``"IN"``, ``"LIKE"``, ``"NOT IN"``, ``"NOT LIKE"``
- value: The value that the field will be compared against. Must be the same data type as the field is
  (e.g. if the field is a string, the value must be a string too)

If you want to filter by multiple fields, then you can specify a list of filter objects. To this end, API functions
that take ``filters`` also take a ``filterop`` parameter, which determines how the filters are combined when multiple
filters are specified. It defaults to ``"and"``, meaning that filters are ANDed togeher (and that any match
must satisfy all of them). You can also specify ``"or"`` as an alternative setting, which would mean that
filters are ORed together, and that any match must satisfy only one of them.

To disable filtering, you can just not specify the filter argument (if using keyword-based arguments), or,
if using positional arguments, just pass ``null`` or ``[]`` (empty list) for the parameter.

For examples of filtering in-use, please see the [examples](#example-implementations).

NOTE: Note that with strings being compared, operators like ``>=`` do a lexigraphic string comparison (which
compares, letter to letter, based on the ASCII ordering for individual characters. For more information on
the specific comparison logic used, please see [this page](http://www.sqlite.org/lang_expr.html).



###Transaction Encodings

All ``create_`` API calls return an *unsigned raw transaction serialization* as a hex-encoded string (i.e. the same format that ``bitcoind`` returns
with its raw transaction API calls).

The exact form and format of this unsigned raw transaction string is specified via the ``encoding`` and ``pubkey`` parameters on each ``create_``
API call:

- To return the transaction as an **OP_RETURN** transaction, specify ``opreturn`` for the ``encoding`` parameter. **OP_RETURN** transactions cannot have more than 40 bytes of data.
- To return the transaction as a **multisig** transaction, specify ``multisig`` for the ``encoding`` parameter.
    - ``pubkey`` should be set to the hex-encoded public key of the source address.
- To return the transaction as a **pubkeyhash** transaction, specify ``pubkeyhash`` for the ``encoding`` parameter.
    - ``pubkey`` should be set to the hex-encoded public key of the source address.
- ``auto`` may also be specified to let the server choose here. Note that at this time, ``auto`` is effectively the same as
  ``multisig``.


##API Changes

This section documents any changes to the API, for version numbers where there were API-level modifications.

There will be no incompatible API pushes that do not either have: 

* A well known set cut over date in the future 
* Or, a deprecation process where the old API is supported for an amount of time


###9.24.1

**Summary:** New API parsing engine added, as well as dynamic get method composition in ``api.py``: 

* Added ``sql`` API method
* Filter params: Added ``LIKE``, ``NOT LIKE`` and ``IN``



###9.25.0

* new do_* methods: like create_*, but also sign and broadcast the transaction. Same parameters as create_*, plus optional privkey parameter.

**backwards incompatible changes**

* create_*: accept only dict as parameters
* create_bet: ``bet_type`` must be a integer (instead string)
* create_bet: ``wager`` and ``counterwager`` args are replaced by ``wager_quantity`` and ``counterwager_quantity``
* create_issuance: parameter ``lock`` (boolean) removed (use LOCK in description)
* create_issuance: parameter ``transfer_destination`` replaced by ``destination``
* DatabaseError: now a DatabaseError is returned immediately if the database is behind the backend, instead of after fourteen seconds



###9.32.0

**Summary:** API framework overhaul for performance and simplicity 

* "/api" with no trailing slash no longer supported as an API endpoint (use "/" or "/api/" instead)
* We now consistently reject positional arguments with all API methods. Make sure your API calls do not use positional
  arguments (e.g. use {"argument1": "value1", "argument2": "value2"} instead of ["value1", "value2"])



###9.43.0

* create_issuance: ``callable`` is also accepted
* create_*: None is used as default value for missing parameters 

###9.49.3

* \*_issuance: ``callable``, ``call_date`` and ``call_price`` are no longer valid parameters
* \*_callback: removed
* Bitcoin addresses may everywhere be replaced by pubkeys.
* The API will no longer search the local wallet for pubkeys, so they must be passed to the API manually if being used for the first time. Otherwise, you may get a "<address> not published in blockchain" error.

###9.49.4
* The `do_*`, `sign_tx` and `broadcast_tx` methods have been completely deprecated. See the section [Wallet Integration](#Wallet-Integration).




#Technical Specification


##Read API Function Reference


###get_{table}

**get_{table}(filters=[], filterop='AND', order_by=None, order_dir=None, start_block=None, end_block=None, status=None,
limit=1000, offset=0, show_expired=True)**

**{table}** must be one of the following values:
``balances``, ``credits``, ``debits``, ``bets``, ``bet_matches``, ``broadcasts``, ``btcpays``, ``burns``, 
``cancels``, ``dividends``, ``issuances``, ``orders``, ``order_matches``, ``sends``,
``bet_expirations``, ``order_expirations``, ``bet_match_expirations``, ``order_match_expirations``,
``rps``, ``rps_expirations``, ``rps_matches``, ``rps_match_expirations``, or ``rpsresolves``.

For example: ``get_balances``, ``get_credits``, ``get_debits``, etc are all valid API methods.

**Parameters:**

  * **filters (list/dict):** An optional filtering object, or list of filtering objects. See [filtering](#filtering-read-api-results) for more information.
  * **filterop (string):** Specifies how multiple filter settings are combined. Defaults to ``AND``, but ``OR`` can
    be specified as well. See [filtering](#filtering-read-api-results) for more information.
  * **order_by  (string):** If sorted results are desired, specify the name of an attribute of the appropriate table to
    order the results by (e.g. ``quantity`` for [balance object](#balance-object), if you called ``get_balances``).
    If left blank, the list of results will be returned unordered. 
  * **order_dir (string):** The direction of the ordering. Either ``ASC`` for ascending order, or ``DESC`` for descending
    order. Must be set if ``order_by`` is specified. Leave blank if ``order_by`` is not specified.
  * **start_block (integer):** If specified, only results from the specified block index on will be returned 
  * **end_block (integer):** If specified, only results up to and including the specified block index on will be returned
  * **status (string/list):** return only results with the specified status or statuses (if a list of status strings is supplied).
    See the [status list](#status). Note that if ``null`` is supplied (the default), then status is not filtered.
    Also note that status filtering can be done via the ``filters`` parameter, but doing it through this parameter is more
    flexible, as it essentially allows for situations where ``OR`` filter logic is desired, as well as status-based filtering.
  * **limit (integer):** (maximum) number of elements to return. Can specify a value less than or equal to 1000. For more results, use
    a combination of ``limit`` and ``offset`` parameters to paginate results.
  * **offset (integer):** return results starting from specified ``offset``

**Special Parameters:**

  * **show_expired (boolean):** used only for ``get_orders``. When false, get_orders don't return orders which expire next block.

**Return:**

  A list of objects with attributes corresponding to the queried table fields.

**Examples:**

  * To get a listing of bets, call ``get_bets``. This method will return a list of one or more [bet object](#bet-object) .
  * To get a listing all open orders for a given address like 1Ayw5aXXTnqYfS3LbguMCf9dxRqzbTVbjf, you could call
    ``get_orders`` with the appropriate parameters. This method will return a list of one or more order object](#order-object).

**Notes:**

  * Please note that the ``get_balances`` API call will not return balances for BTC itself. It only returns balances
    for XCP and other Counterparty assets. To get BTC-based balances, use an existing system such as Insight, blockr.io,
    or blockchain.info.



###get_asset_info

**get_asset_info(assets)**

Gets information on an issued asset. 

**Parameters:**

  * **assets (list):** A list of one or more [assets](#assets) for which to retrieve information.

**Return:**

  ``null`` if the asset was not found. Otherwise, a list of one or more objects, each one with the following parameters:

  - **asset** (*string*): The [assets](#assets) of the asset itself 
  - **owner** (*string*): The address that currently owns the asset (i.e. has issuance rights to it) 
  - **divisible** (*boolean*): Whether the asset is divisible or not
  - **locked** (*boolean*): Whether the asset is locked (future issuances prohibited)
  - **total_issued** (*integer*): The [quantities](#quantities-and-balances) of the asset issued, in total
  - **description** (*string*): The asset's current description
  - **issuer** (*string*): The asset's original owner (i.e. issuer)


###get_asset_names

**get_asset_names()**

Returns a list of all existing Counterparty assets. 

**Parameters:** None

**Return:**

  A list of existing Counterparty asset names.


###get_messages

**get_messages(block_index)**

Return message feed activity for the specified block index. The message feed essentially tracks all 
database actions and allows for lower-level state tracking for applications that hook into it.
   
**Parameters:**

  * **block_index (integer):** The block index for which to retrieve activity.

**Return:** 
  
  A list of one or more [message object](#message-object) if there was any activity in the block, otherwise ``[]`` (empty list).


###get_messages_by_index

**get_messages_by_index(message_indexes)**

Return the message feed messages whose ``message_index`` values are contained in the specified list of message indexes.
   
**Parameters:**

  * **message_indexes (list)**: An array of one or more ``message_index`` values for which the cooresponding message feed entries are desired. 

**Return:** 

  A list containing a `message <#message-object>`_ for each message found in the specified ``message_indexes`` list. If none were found, ``[]`` (empty list) is returned.


###get_xcp_supply

**get_xcp_supply()**

Gets the current total quantity of XCP in existance (i.e. quantity created via proof-of-burn, minus quantity
destroyed via asset issuances, etc).

**Parameters:**

  None

**Return:** 

  The [quantities](#quantities-and-balances) of XCP currently in existance.


###get_block_info

**get_block_info(block_index)**

Gets some basic information on a specific block.

**Parameters:**

  * **block_index (integer)**: The block index for which to retrieve information.

**Return:** 

  If the block was found, an object with the following parameters:
     
  - **block_index** (*integer*): The block index (i.e. block height). Should match what was specified for the *block_index* input parameter). 
  - **block_hash** (*string*): The block hash identifier
  - **block_time** (*integer*): A UNIX timestamp of when the block was processed by the network 



###get_blocks


**get_blocks(block_indexes)**

Gets block and message data (for each block) in a bulk fashon. If fetching info and messages for multiple blocks, this
is much quicker than using multiple ``get_block_info()`` and ``get_messages()`` calls.

**Parameters:**

  * **block_index (list)**: A list of 1 or more block indexes for which to retrieve the data.

**Return:**

  A list of objects, one object for each valid block index specified, in order from first block index to last.
  Each object has the following parameters:

  - **block_index** (*integer*): The block index (i.e. block height). Should match what was specified for the *block_index* input parameter). 
  - **block_hash** (*string*): The block hash identifier
  - **block_time** (*integer*): A UNIX timestamp of when the block was processed by the network
  - **_messages** (*list*): A list of one or more [message object](#message-object) if there was any activity in the block, otherwise ``[]`` (empty list).


###get_running_info

**get_running_info()**

Gets some operational parameters for the server.

**Parameters:**

  None

**Return:** 

  An object with the following parameters:

  - **db_caught_up** (*boolean*): ``true`` if block processing is caught up with the Bitcoin blockchain, ``false`` otherwise.
  - **bitcoin_block_count** (**integer**): The block height on the Bitcoin network (may not necessarily be the same as ``last_block``, if the server is catching up)
  - **last_block** (*integer*): The index (height) of the last block processed by the server
  - **counterpartyd_version** (*float*): The program version, expressed as a float, such as 0.5
  - **last_message_index** (*integer*): The index (ID) of the last message in the message feed
  - **running_testnet** (*boolean*): ``true`` if the server is configured for testnet, ``false`` if configured on mainnet.
  - **db_version_major** (*integer*): The major version of the current database
  - **db_version_minor** (*integer*): The minor version of the current database


##Action/Write API Function Reference


###create_bet

**create_bet(source, feed_address, bet_type, deadline, wager, counterwager, expiration, target_value=0.0, leverage=5040, encoding='auto', pubkey=null,
allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Issue a bet against a feed.

**Parameters:**

  * **source (string, required):** The address that will make the bet.
  * **feed_address (string, required):** The address that host the feed to be bet on.
  * **bet_type (integer, required):** 0 for Bullish CFD, 1 for Bearish CFD, 2 for Equal, 3 for NotEqual.
  * **deadline (integer, required):** The time at which the bet should be decided/settled, in Unix time.
  * **wager (integer, required):** The [quantities](#quantities-and-balances) of XCP to wager.
  * **counterwager (integer, required):** The minimum [quantities](#quantities-and-balances) of XCP to be wagered against, for the bets to match.
  * **expiration (integer, required):** The number of blocks after which the bet expires if it's still unmatched.
  * **target_value (float, default=None):** Target value for Equal/NotEqual bet
  * **leverage (integer, default=5040):** Leverage, as a fraction of 5040
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for the server to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_broadcast

**create_broadcast(source, fee_fraction, text, value=0, encoding='multisig', pubkey=null,
allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Broadcast textual and numerical information to the network.

**Parameters:**

  * **source (string, required):** The address that will be sending (must have the necessary quantity of the specified asset).
  * **fee_fraction (float, required):** How much of every bet on this feed should go to its operator; a fraction of 1, (i.e. .05 is five percent).
  * **text (string, required):** The textual part of the broadcast.
  * **timestamp (integer, required):** The timestamp of the broadcast, in Unix time.
  * **value (float, required):** Numerical value of the broadcast.
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_btcpay

**create_btcpay(order_match_id, encoding='multisig', pubkey=null,
allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Create and (optionally) broadcast a BTCpay message, to settle an Order Match for which you owe BTC. 

**Parameters:**

  * **order_match_id (string, required):** The concatenation of the hashes of the two transactions which compose the order match.
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_burn

**create_burn(source, quantity, encoding='multisig', pubkey=null, allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Burn a given quantity of BTC for XCP (**only possible between blocks 278310 and 283810**).

**Parameters:**

  * **source (string, required):** The address with the BTC to burn.
  * **quantity (integer, required):** The [quantities](#quantities-and-balances) of BTC to burn (1 BTC maximum burn per address).
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_cancel

**create_cancel(offer_hash, encoding='multisig', pubkey=null, allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Cancel an open order or bet you created.

**Parameters:**

  * **offer_hash (string, required):** The transaction hash of the order or bet.
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_dividend

**create_dividend(source, quantity_per_unit, asset, dividend_asset, encoding='multisig', pubkey=null, allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Issue a dividend on a specific user defined asset.

**Parameters:**

  * **source (string, required):** The address that will be issuing the dividend (must have the ownership of the asset which the dividend is being issued on).
  * **asset (string, required):** The [assets](#assets) that the dividends are being rewarded on.
  * **dividend_asset (string, required):** The [assets](#assets) that the dividends are paid in.
  * **quantity_per_unit (integer, required):** The [quantities](#quantities-and-balances) of XCP rewarded per whole unit of the asset.
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_issuance

**create_issuance(source, asset, quantity, divisible, description,
transfer_destination=null, encoding='multisig', pubkey=null, allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Issue a new asset, issue more of an existing asset, lock an asset, or transfer the ownership of an asset (note that you can only do one of these operations in a given create_issuance call).

**Parameters:**

  * **source (string, required):** The address that will be issuing or transfering the asset.
  * **quantity (integer, required):** The [quantities](#quantities-and-balances) of the asset to issue (set to 0 if *transferring* an asset).
  * **asset (string, required):** The [assets](#assets) to issue or transfer.
  * **divisible (boolean, default=True):** Whether this asset is divisible or not (if a transfer, this value must match the value specified when the asset was originally issued).
  * **description (string, default=''):** A textual description for the asset. 52 bytes max.
  * **transfer_destination (string, default=None):** The address to receive the asset (only used when *transferring* assets -- leave set to ``null`` if issuing an asset).
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.

**Notes:**

  * To lock the issuance of the asset, specify "LOCK" for the ``description`` field. It's a special keyword that will
    not change the actual description, but will simply lock the asset quantity and not allow additional quantity to be
    issued for the asset.



###create_order

**create_order(source, give_asset, give_quantity, get_asset, get_quantity, expiration, fee_required=0, fee_provided=0, encoding='multisig', pubkey=null,
allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Issue an order request.

**Parameters:**

  * **source (string, required):** The address that will be issuing the order request (must have the necessary quantity of the specified asset to give).
  * **give_quantity (integer, required):** The [quantities](#quantities-and-balances) of the asset to give.
  * **give_asset (string, required):** The [assets](#assets) to give.
  * **get_quantity (integer, required):** The [quantities](#quantities-and-balances) of the asset requested in return.
  * **get_asset (string, required):** The [assets](#assets) requested in return.
  * **expiration (integer, required):** The number of blocks for which the order should be valid.
  * **fee_required (integer):** The miners' fee required to be paid by orders for them to match this one; in BTC; required only if buying BTC (may be zero, though). If not specified or set to ``null``, this defaults to 1% of the BTC desired for purchase.
  * **fee_provided (integer):** The miners' fee provided; in BTC; required only if selling BTC (should not be lower than is required for acceptance in a block).  If not specified or set to ``null``, this defaults to 1% of the BTC for sale. 
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_send

**create_send(source, destination, asset, quantity, encoding='multisig', pubkey=null, allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Send XCP or a user defined asset.

**Parameters:**

  * **source (string, required):** The address that will be sending (must have the necessary quantity of the specified asset).
  * **destination (string, required):** The address to receive the asset.
  * **quantity (integer, required):** The [quantities](#quantities-and-balances) of the asset to send.
  * **asset (string, required):** The [assets](#assets) to send.
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


###create_rps

**create_rps(source, possible_moves, wager, move_random_hash, expiration, encoding='multisig', pubkey=null,
allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Open a Rock-Paper-Scissors (RPS) like game.

**Parameters:**

  * **source (string, required):** The address that will be sending (must have the necessary quantity of the specified asset).
  * **possible_moves (integer, required):** The number of possible moves. Must be an odd number greater or equal than 3.
  * **wager (integer, required):** The [quantities](#quantities-and-balances) of XCP to wager.
  * **move_random_hash (string, required):** A 32 bytes hex string (64 chars): sha256(sha256(random+move)). Where random is 16 bytes random number.
  * **expiration (integer, required):** The number of blocks for which the game should be valid.
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.

###create_rpsresolve

**create_rpsresolve(source, move, random, rps_match_id, encoding='multisig', pubkey=null,
allow_unconfirmed_inputs=false, fee=null, fee_per_kb=10000)**

Resolve a Rock-Paper-Scissors game.

**Parameters:**
  * **source (string, required):** The address that will be sending (must have the necessary quantity of the specified asset).
  * **move (integer, required):** The selected move.
  * **random (string, required):** A 16 bytes hex string (32 chars) used to generate the move_random_hash value.
  * **rps_match_id (string, required):** The concatenation of the hashes of the two transactions which compose the rps match.
  * **encoding (string):** The encoding method to use, see [transaction encodings](#transaction-encodings) for more info.  
  * **pubkey (string/list):** The hexadecimal public key of the source address (or a list of the keys, if multi‐sig). Required when using ``multisig`` and ``pubkeyhash`` transaction encodings. See [encoding parameter](#the-encoding-parameter-of-create-calls) for more info.
  * **allow_unconfirmed_inputs (boolean):** Set to ``true`` to allow this transaction to utilize unconfirmed UTXOs as inputs.
  * **fee (integer):** If you'd like to specify a custom miners' fee, specify it here (in satoshi). Leave as default for ``counterpartyd`` to automatically choose. 
  * **fee_per_kb (integer):** The fee per kilobyte of transaction data constant that ``counterpartyd`` uses when deciding on the dynamic fee to use (in satoshi). Leave as default unless you know what you're doing.

**Return:** 

  The unsigned transaction, as an hex-encoded string. See [transaction encodings](#transaction-encodings) for more information.


##Objects

The API calls documented can return any one of these objects.


###Balance Object

An object that describes a balance that is associated to a specific address:

* **address** (*string*): A PubkeyHash Bitcoin address, or the pubkey associated with it (in case the address hasn’t sent anything before).
* **asset** (*string*): The ID of the [assets](#assets) in which the balance is specified
* **quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified asset at this address



###Bet Object

An object that describes a specific bet:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address that made the bet
* **feed_address** (*string*): The address with the feed that the bet is to be made on
* **bet_type** (*integer*): 0 for Bullish CFD, 1 for Bearish CFD, 2 for Equal, 3 for Not Equal
* **deadline** (*integer*): The timestamp at which the bet should be decided/settled, in Unix time.
* **wager_quantity** (*integer*): The [quantities](#quantities-and-balances) of XCP to wager
* **counterwager_quantity** (*integer*): The minimum [quantities](#quantities-and-balances) of XCP to be wagered by the user to bet against the bet issuer, if the other party were to accept the whole thing
* **wager_remaining** (*integer*): The quantity of XCP wagered that is remaining to bet on
* **odds** (*float*): 
* **target_value** (*float*): Target value for Equal/NotEqual bet
* **leverage** (*integer*): Leverage, as a fraction of 5040
* **expiration** (*integer*): The number of blocks for which the bet should be valid
* **fee_multiplier** (*integer*): 
* **validity** (*string*): Set to "valid" if a valid bet. Any other setting signifies an invalid/improper bet



###Bet Match Object

An object that describes a specific occurance of two bets being matched (either partially, or fully):

* **tx0_index** (*integer*): The Bitcoin transaction index of the initial bet
* **tx0_hash** (*string*): The Bitcoin transaction hash of the initial bet
* **tx0_block_index** (*integer*): The Bitcoin block index of the initial bet
* **tx0_expiration** (*integer*): The number of blocks over which the initial bet was valid
* **tx0_address** (*string*): The address that issued the initial bet
* **tx0_bet_type** (*string*): The type of the initial bet (0 for Bullish CFD, 1 for Bearish CFD, 2 for Equal, 3 for Not Equal)
* **tx1_index** (*integer*): The transaction index of the matching (counter) bet
* **tx1_hash** (*string*): The transaction hash of the matching bet
* **tx1_block_index** (*integer*): The block index of the matching bet
* **tx1_address** (*string*): The address that issued the matching bet
* **tx1_expiration** (*integer*): The number of blocks over which the matching bet was valid
* **tx1_bet_type** (*string*): The type of the counter bet (0 for Bullish CFD, 1 for Bearish CFD, 2 for Equal, 3 for Not Equal)
* **feed_address** (*string*): The address of the feed that the bets refer to
* **initial_value** (*integer*): 
* **deadline** (*integer*): The timestamp at which the bet match was made, in Unix time.
* **target_value** (*float*): Target value for Equal/NotEqual bet  
* **leverage** (*integer*): Leverage, as a fraction of 5040
* **forward_quantity** (*integer*): The [quantities](#quantities-and-balances) of XCP bet in the initial bet
* **backward_quantity** (*integer*): The [quantities](#quantities-and-balances) of XCP bet in the matching bet
* **fee_multiplier** (*integer*): 
* **validity** (*string*): Set to "valid" if a valid order match. Any other setting signifies an invalid/improper order match



###Broadcast Object

An object that describes a specific occurance of a broadcast event (i.e. creating/extending a feed):

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address that made the broadcast
* **timestamp** (*string*): The time the broadcast was made, in Unix time. 
* **value** (*float*): The numerical value of the broadcast
* **fee_multiplier** (*float*): How much of every bet on this feed should go to its operator; a fraction of 1, (i.e. .05 is five percent)
* **text** (*string*): The textual component of the broadcast
* **validity** (*string*): Set to "valid" if a valid broadcast. Any other setting signifies an invalid/improper broadcast



###BTCPay Object

An object that matches a request to settle an Order Match for which BTC is owed:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*):
* **order_match_id** (*string*):
* **validity** (*string*): Set to "valid" if valid


###Burn Object

An object that describes an instance of a specific burn:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address the burn was performed from
* **burned** (*integer*): The [quantities](#quantities-and-balances) of BTC burned
* **earned** (*integer*): The [quantities](#quantities-and-balances) of XPC actually earned from the burn (takes into account any bonus quantitys, 1 BTC limitation, etc)
* **validity** (*string*): Set to "valid" if a valid burn. Any other setting signifies an invalid/improper burn


###Cancel Object

An object that describes a cancellation of a (previously) open order or bet:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address with the open order or bet that was cancelled
* **offer_hash** (*string*): The transaction hash of the order or bet cancelled
* **validity** (*string*): Set to "valid" if a valid burn. Any other setting signifies an invalid/improper burn



###Debit/Credit Object

An object that describes a account debit or credit:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **address** (*string*): The address debited or credited
* **asset** (*string*): The [assets](#assets) debited or credited
* **quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified asset debited or credited



###Dividend Object

An object that describes an issuance of dividends on a specific user defined asset:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address that issued the dividend
* **asset** (*string*): The [assets](#assets) that the dividends are being rewarded on 
* **quantity_per_unit** (*integer*): The [quantities](#quantities-and-balances) of XCP rewarded per whole unit of the asset
* **validity** (*string*): Set to "valid" if a valid burn. Any other setting signifies an invalid/improper burn



###Issuance Object

An object that describes a specific occurance of a user defined asset being issued, or re-issued:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **asset** (*string*): The [assets](#assets) being issued, or re-issued
* **quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified asset being issued
* **divisible** (*boolean*): Whether or not the asset is divisible (must agree with previous issuances of the asset, if there are any)
* **issuer** (*string*): 
* **transfer** (*boolean*): Whether or not this objects marks the transfer of ownership rights for the specified quantity of this asset
* **validity** (*string*): Set to "valid" if a valid issuance. Any other setting signifies an invalid/improper issuance



###Order Object

An object that describes a specific order:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address that made the order
* **give_asset** (*string*): The [assets](#assets) being offered
* **give_quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified asset being offered
* **give_remaining** (*integer*): The [quantities](#quantities-and-balances) of the specified give asset remaining for the order
* **get_asset** (*string*): The [assets](#assets) desired in exchange
* **get_quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified asset desired in exchange
* **get_remaining** (*integer*): The [quantities](#quantities-and-balances) of the specified get asset remaining for the order
* **price** (*float*): The given exchange rate (as an exchange ratio desired from the asset offered to the asset desired)
* **expiration** (*integer*): The number of blocks over which the order should be valid
* **fee_provided** (*integer*): The miners' fee provided; in BTC; required only if selling BTC (should not be lower than is required for acceptance in a block)
* **fee_required** (*integer*): The miners' fee required to be paid by orders for them to match this one; in BTC; required only if buying BTC (may be zero, though)



###Order Match Object

An object that describes a specific occurance of two orders being matched (either partially, or fully):

* **tx0_index** (*integer*): The Bitcoin transaction index of the first (earlier) order
* **tx0_hash** (*string*): The Bitcoin transaction hash of the first order
* **tx0_block_index** (*integer*): The Bitcoin block index of the first order
* **tx0_expiration** (*integer*): The number of blocks over which the first order was valid
* **tx0_address** (*string*): The address that issued the first (earlier) order
* **tx1_index** (*integer*): The transaction index of the second (matching) order
* **tx1_hash** (*string*): The transaction hash of the second order
* **tx1_block_index** (*integer*): The block index of the second order
* **tx1_address** (*string*): The address that issued the second order
* **tx1_expiration** (*integer*): The number of blocks over which the second order was valid
* **forward_asset** (*string*): The [assets](#assets) exchanged FROM the first order to the second order
* **forward_quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified forward asset
* **backward_asset** (*string*): The [assets](#assets) exchanged FROM the second order to the first order
* **backward_quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified backward asset
* **validity** (*string*): Set to "valid" if a valid order match. Any other setting signifies an invalid/improper order match



###Send Object

An object that describes a specific send (e.g. "simple send", of XCP, or a user defined asset):

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The source address of the send
* **destination** (*string*): The destination address of the send
* **asset** (*string*): The [assets](#assets) being sent
* **quantity** (*integer*): The [quantities](#quantities-and-balances) of the specified asset sent
* **validity** (*string*): Set to "valid" if a valid send. Any other setting signifies an invalid/improper send



###Message Object

An object that describes a specific event in the counterpartyd message feed (which can be used by 3rd party applications
to track state changes to the counterpartyd database on a block-by-block basis).

* **message_index** (*integer*): The message index (i.e. transaction index)
* **block_index** (*integer*): The block index (block number in the block chain) this event occurred on
* **category** (*string*): A string denoting the entity that the message relates to, e.g. "credits", "burns", "debits".
  The category matches the relevant table name in counterpartyd (see blocks.py for more info).
* **command** (*string*): The operation done to the table noted in **category**. This is either "insert", or "update". 
* **bindings** (*string*): A JSON-encoded object containing the message data. The properties in this object match the
  columns in the table referred to by **category**.

  

###Bet Expiration Object

An object that describes the expiration of a bet created by the source address.

* **bet_index** (*integer*): The transaction index of the bet expiring
* **bet_hash** (*string*): The transaction hash of the bet expiriing
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred
* **source** (*string*): The source address that created the bet



###Order Expiration Object

An object that describes the expiration of an order created by the source address.

* **order_index** (*integer*): The transaction index of the order expiring
* **order_hash** (*string*): The transaction hash of the order expiriing
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred
* **source** (*string*): The source address that created the order



###Bet Match Expiration Object

An object that describes the expiration of a bet match.

* **bet_match_id** (*integer*): The transaction index of the bet match ID (e.g. the concatenation of the tx0 and tx1 hashes)
* **tx0_address** (*string*): The tx0 (first) address for the bet match
* **tx1_address** (*string*): The tx1 (second) address for the bet match
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred



###Order Match Expiration Object

An object that describes the expiration of an order match.

* **order_match_id** (*integer*): The transaction index of the order match ID (e.g. the concatenation of the tx0 and tx1 hashes)
* **tx0_address** (*string*): The tx0 (first) address for the order match
* **tx1_address** (*string*): The tx1 (second) address for the order match
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred


##Status

Here the list of all possible status for each table:

* **balances**: No status field
* **bet_expirations**: No status field
* **bet_match_expirations**: No status field
* **bet_matches**: pending, settled: liquidated for bear, settled, settled: liquidated for bull, settled: for equal, settled: for notequal, dropped, expired
* **bets**: open, filled, cancelled, expired, dropped, invalid: {problem(s)}
* **broadcasts**: valid, invalid: {problem(s)}
* **btcpays**: valid, invalid: {problem(s)}
* **burns**: valid, invalid: {problem(s)}
* **cancels**: valid, invalid: {problem(s)}
* **credits**: No status field
* **debits**: No status field
* **dividends**: valid, invalid: {problem(s)}
* **issuances**: valid, invalid: {problem(s)}
* **order_expirations**: No status field
* **order_match_expirations**: No status field
* **order_matches**: pending, completed, expired
* **orders**: open, filled, canceled, expired, invalid: {problem(s)}
* **sends**: valid, invalid: {problem(s)}
