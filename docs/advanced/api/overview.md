---
title: Overview
---

Counterparty Core provides a JSON RPC 2.0-based API based off of
that of Bitcoin Core. It is the primary means by which other applications
should interact with the Counterparty network.

The API server is started with the command `counterparty-server`. It listens on port
4000 by default (14000 for ``testnet``) and requires HTTP Basic Authentication to connect.

The API includes numerous information retrieval methods, most of which begin with `get_`, as well as several
`create_` methods which create new Counterparty transactions. While the `get_` type methods simply return the
requested information, the `create_` methods return unsigned raw transactions which must then be signed and
broadcast on the Bitcoin network. This means that while `counterparty-server` requires Bitcoin Core and
uses it for retieval and parsing of blockchain data, it and this API do not require Bitcoin Core's wallet functionality
for private key storage and transaction signing. Transaction signing and broadcast can thus
be accomplished using whatever means the developer sees fit (including using Bitcoin core's APIs if desired, or
a library like Bitcore, or a service like blockchain.info, and so on).

In addition to the JSON RPC API, ``counterparty-core`` provides a complementary RESTful API also based off of that
of Bitcoin Core's design. This REST API is still under development and will include more functionality
in the future, and listens on the same port as JSON RPC one.


## Getting Started

By default, the server will listen on port ``4000`` (if on mainnet) or port ``14000`` (on testnet) for API
requests.

Note that the main API is built on JSON-RPC 2.0, not 1.1. JSON-RPC itself is pretty lightweight, and API requests
are made via a HTTP POST request to ``/api/`` (note the trailing slash), with JSON-encoded data passed as the POST body.

The requests to the secondary REST API are made via HTTP GET to ``/rest/``, with request action and parameters encoded in the URL.


### General Format

#### JSON-RPC

All requests must have POST data that is JSON encoded. Here's an example of the POST data for a valid API request:

    ```
    {
      "method": "get_sends",
      "params": {"order_by": "tx_hash",
                 "order_dir": "asc",
                 "start_block": 280537,
                 "end_block": 280539},
      "jsonrpc": "2.0",
      "id": 0
    }
    ```

The ``jsonrpc`` and ``id`` properties are requirements under the JSON-RPC 2.0 spec.

You should note that the data in ``params`` is a JSON object (e.g. mapping), not an array. In other words,
**the API only supports named arguments, not positional arguments** (e.g. use
`{"argument1": "value1", "argument2": "value2"}` instead of `["value1", "value2"]`). This is the case for safety and bug-minimization reasons.

For more information on JSON RPC, please see the [JSON RPC 2.0 specification](http://www.jsonrpc.org/specification).

#### REST

For REST API all requests are made via GET where query-specific arguments are encoded as URL parameters. Moreover, the same requests can be passed via HTTP POST in order to encrypt the transaction parameters. There are only two methods supported: ``get`` and ``compose``. The URL formats are as follows, respectively:
`/rest/<table_name>/get?<filters>&op=<operator>`
`/rest/<message_type>/compose?<transaction arguments>`

### Authentication

The API support HTTP basic authentication to use, which is enabled if and only
if a password is set. **The default user is ``'rpc'``.**


## Example Implementations for JSON RPC API

The following examples have authentication enabled and the `user` set to its
default value of `'rpc'`. The password is not set (default: `'rpc'`). Ensure
these values correspond to values in your counterparty-server's configuration
file `'server.conf'`.

Submissions of examples in additional languages are welcome!

### Python

    ```
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
      "id": 0
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers, auth=auth)
    print("Response: ", response.text)
    ```

### PHP

With PHP, you use the [JsonRPC](https://github.com/fguillot/JsonRPC)
library.

    ```
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
    ```

### curl

Remember to surround non-numeric parameter values with the double quotes, as per [JSON-RPC 2.0 examples](http://www.jsonrpc.org/specification#examples). For example, `"order_by": "tx_hash"` is correct and will work, `"order_by": 'tx_hash'` won't.

#### Linux

    ```
    curl -X POST http://127.0.0.1:4000/api/ --user rpc:$PASSWORD -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript' --data-binary '{ "jsonrpc": "2.0", "id": 0, "method": "get_running_info" }'
    ```

#### Windows

On Windows, depending on implementation the above curl command may need to be formatted differently due to problems that Windows has with escapes. For example this particular format was found to work with curl 7.50.1 (x86_64-w64-mingw32) on Windows 10 (x64).

    ```
    curl -X POST http://127.0.0.1:4000/api/ --user rpc:$PASSWORD -H "Content-Type: application/json; charset=UTF-8" -H "Accept: application/json, text/javascript" --data-binary "{ \"jsonrpc\": \"2.0\", \"id\": 0, \"method\": \"get_running_info\" }"
    ```

### c# (RestSharp)

Authorization string in the example below is based on the default username/password.

    ```
    var client = new RestClient("http://127.0.0.1:4000/api/");
    var request = new RestRequest(Method.POST);
    request.AddHeader("cache-control", "no-cache");
    request.AddHeader("authorization", "Basic cnBjOjEyMzQ=");
    request.AddHeader("content-type", "application/json");
    request.AddParameter("application/json", "{\r\n  \"method\": \"get_running_info\",\r\n  \"params\": {},\r\n  \"jsonrpc\": \"2.0\",\r\n  \"id\": 1\r\n}", ParameterType.RequestBody);
    IRestResponse response = client.Execute(request);
    ```

### Go

Authorization string in the example below is based on the default username/password.

    ```
    package main

    import (
        "fmt"
        "strings"
        "net/http"
        "io/ioutil"
    )

    func main() {

        url := "http://127.0.0.1:4000/api/"

        payload := strings.NewReader("{\r\n  \"method\": \"get_running_info\",\r\n  \"params\": {},\r\n  \"jsonrpc\": \"2.0\",\r\n  \"id\": 1\r\n}")

        req, _ := http.NewRequest("POST", url, payload)

        req.Header.Add("content-type", "application/json")
        req.Header.Add("authorization", "Basic cnBjOjEyMzQ=")
        req.Header.Add("cache-control", "no-cache")

        res, _ := http.DefaultClient.Do(req)

        defer res.Body.Close()
        body, _ := ioutil.ReadAll(res.Body)

        fmt.Println(res)
        fmt.Println(string(body))

    }
    ```

### Ruby (Net::HTTP)

Authorization string in the example below is based on the default username/password.

    ```
    require 'uri'
    require 'net/http'

    url = URI("http://127.0.0.1:4000/api/")

    http = Net::HTTP.new(url.host, url.port)

    request = Net::HTTP::Post.new(url)
    request["content-type"] = 'application/json'
    request["authorization"] = 'Basic cnBjOjEyMzQ='
    request["cache-control"] = 'no-cache'
    request.body = "{\r\n  \"method\": \"get_running_info\",\r\n  \"params\": {},\r\n  \"jsonrpc\": \"2.0\",\r\n  \"id\": 1\r\n}"

    response = http.request(request)
    puts response.read_body
    ```


## Example Implementations for REST API

The following examples don't use authentication as with default settings.

### Python

    ```
    import requests

    url = "http://localhost:4000/rest/"
    headers = {'content-type': 'application/json'}

    query = 'sends/get?source=mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc&destination=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns&op=AND'

    response = requests.get(url + query, headers=headers)
    print("Response: ", response.text)
    ```


### curl

These examples use the default username/password combination in URL.

#### Linux

    ```
    curl "http://rpc:rpc@127.0.0.1:4000/rest/sends/get?source=1B6ahDHnKtZ5GXqytHSxfcXgNoxm1q1RsP&destination=14fAoS9FPD9jx36hjCNoAqFVLNHD1NQVN5&op=AND" -H "Content-Type: application/json; charset=UTF-8" -H "Accept: application/json"
    ```

#### Windows

This example was created with curl 7.50.1 (x86_64-w64-mingw32) on Windows 10. For POST encryption add `'-X POST'`.

    ```
    curl "http://rpc:rpc@127.0.0.1:4000/rest/sends/get?source=1B6ahDHnKtZ5GXqytHSxfcXgNoxm1q1RsP&destination=14fAoS9FPD9jx36hjCNoAqFVLNHD1NQVN5&op=AND" -H "Content-Type: application/json; charset=UTF-8" -H "Accept: application/json"
    ```

## Example Parameters

* Fetch all balances for all assets for both of two addresses, using keyword-based arguments

    ```
        payload = {
                   "method": "get_balances",
                   "params": {
                              "filters": [{"field": "address", "op": "==", "value": "14qqz8xpzzEtj6zLs3M1iASP7T4mj687yq"},
                                          {"field": "address", "op": "==", "value": "1bLockjTFXuSENM8fGdfNUaWqiM4GPe7V"}],
                              "filterop": "or"
                             },
                   "jsonrpc": "2.0",
                   "id": 0
                  }
    ```

* Get all burns between blocks 280537 and 280539 where greater than .2 BTC was burned, sorting by `tx_hash` (ascending order)

    ```
        payload = {
                   "method": "get_burns",
                   "params": {
                              "filters": {"field": "burned", "op": ">", "value": 20000000},
                              "filterop": "AND",
                              "order_by": "tx_hash",
                              "order_dir": "asc",
                              "start_block": 280537,
                              "end_block": 280539
                             },
                   "jsonrpc": "2.0",
                   "id": 0
                  }
    ```

* Fetch all debits for > 2 XCP between blocks 280537 and 280539, sorting the results by quantity (descending order)

    ```
        payload = {
                   "method": "get_debits",
                   "params": {
                              "filters": [{"field": "asset", "op": "==", "value": "XCP"},
                                          {"field": "quantity", "op": ">", "value": 200000000}],
                              "filterop": "AND",
                              "order_by": "quantity",
                              "order_dir": "desc"
                             },
                   "jsonrpc": "2.0",
                   "id": 0
                  }
    ```


* Send 1 XCP (specified in satoshis) from one address to another.

    ```
        payload = {
                   "method": "create_send",
                   "params": {
                              "source": "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              "destination": "17rRm52PYGkntcJxD2yQF9jQqRS4S2nZ7E",
                              "asset": "XCP",
                              "quantity": 100000000
                             },
                   "jsonrpc": "2.0",
                   "id": 0
                  }
    ```

* Issuance (indivisible)

    ```
        payload = {
                   "method": "create_issuance",
                   "params": {
                              "source": "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              "asset": "MYASSET",
                              "quantity": 1000,
                              "description": "my asset is cool",
                              "divisible": false
                             },
                   "jsonrpc": "2.0",
                   "id": 0
                  }
    ```

* Transfer asset ownership

    ```
        payload = {
                   "method": "create_issuance",
                   "params": {
                              "source": "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              "transfer_destination": "17rRm52PYGkntcJxD2yQF9jQqRS4S2nZ7E",
                              "asset": "MYASSET",
                              "quantity": 0
                             },
                   "jsonrpc": "2.0",
                   "id": 0
                  }
    ```

* Lock asset

    ```
        payload = {
                   "method": "create_issuance",
                   "params": {
                              "source": "1CUdFmgK9trTNZHALfqGvd8d6nUZqH2AAf",
                              "asset": "MYASSET",
                              "quantity": 0,
                              "description": "LOCK"
                             },
                   "jsonrpc": "2.0",
                   "id": 0
                  }
    ```


## Signing Transactions Before Broadcasting

**Note:** Before v9.49.4, the counterparty server API provided an interface to Bitcoin Core's signing functionality through the `do_*`, `sign_tx` and `broadcast_tx` methods, which have all since been removed.

All ``create_`` API calls return an *unsigned raw transaction serialization* as a hex-encoded string (i.e. the same format that ``bitcoind`` returns with its raw transaction API calls). This raw transaction's inputs may be validated and then must be signed (i.e. via Bitcoin Core, a 3rd party Bitcoin library like Bitcore, etc) and broadcast on the Bitcoin network.

The process of signing and broadcasting a transaction, from start to finish, depends somewhat on the wallet software used. Below are examples of how one might use a wallet to sign and broadcast an unsigned Counterparty transaction *created* with this API.

**Bitcoin Core with Python**

    ```
    #! /usr/bin/env python3

    from counterpartylib.lib import util
    from counterpartylib.lib import config
    from counterpartylib.lib.backend import addrindex

    config.TESTNET =
    config.RPC =
    config.BACKEND_URL =
    config.BACKEND_SSL_NO_VERIFY =

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
    ```

**Bitcoin Core with Javascript**
(Utilizing the [Counterwallet Bitcore wrapper code](https://raw.githubusercontent.com/CounterpartyXCP/counterwallet/master/src/js/util.bitcore.js) for brevity.)

    ```
    <html>
        <script src="https://raw.githubusercontent.com/bitpay/bitcore-lib/f031e1ddfbf0064ef503a28aada86c4fbf9a414c/bitcore-lib.min.js"></script>
        <script src="https://raw.githubusercontent.com/CounterpartyXCP/counterwallet/master/src/js/util.bitcore.js"></script>
        <script src="https://raw.githubusercontent.com/CounterpartyXCP/counterwallet/master/src/js/external/mnemonic.js"></script>
        <script>
        counterparty_api = function(method, params) {
            // call Counterparty API method via your prefered method
        }

        bitcoin_api = function(method, params) {
            // call Bitcoin Core API method via your prefered method
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
    ```

**Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction**

```javascript
// Assumes NodeJS runtime. Several libraries exist to replace the Buffer class on web browsers
const bitcoin = require('bitcoinjs-lib')

async function signP2SHDataTX(wif, txHex) {
  const network = bitcoin.networks.testnet // Change appropiately to your used network
  const keyPair = bitcoin.ECPair.fromWIF(wif, network)
  const dataTx = bitcoin.Transaction.fromHex(txHex)   // The unsigned second part of the 2 part P2SH transactions

  const sigType = bitcoin.Transaction.SIGHASH_ALL // This shouldn't be changed unless you REALLY know what you're doing
  
  for (let i=0; i < dataTx.ins.length; i++) {
    const sigHash = dataTx.hashForSignature(i, bitcoin.script.decompile(dataTx.ins[i].script)[0], sigType)
    const sig = keyPair.sign(sigHash)
    const encodedSig = bitcoin.script.signature.encode(sig, sigType)
    const compiled = bitcoin.script.compile([encodedSig])

    dataTx.ins[i].script = Buffer.concat([compiled, dataTx.ins[i].script])
  }

  dataTx.ins[0].script = Buffer.concat([compiled, dataTx.ins[0].script])
  return dataTx.toHex() // The resulting signed transaction in raw hex, ready to be broadcasted
}
```

## Terms & Conventions

### assets

Everywhere in the API an asset is referenced by its name, not its ID. See the [Counterparty protocol specification](../../../../docs/advanced/protocol/#assets) for what constitutes a valid asset name.
Examples:

- "BTC"
- "XCP"
- "FOOBAR"
- "A7736697071037023001"

### subassets

See the [Counterparty protocol specification](../../../../docs/advanced/protocol/#subassets) for what constitutes a valid subasset name.
Examples:

- "PIZZA.X"
- "PIZZA.REALLY-long-VALID-Subasset-NAME"

### Quantities and balances

Anywhere where an quantity is specified, it is specified in **satoshis** (if a divisible asset), or as whole numbers
(if an indivisible asset). To convert satoshis to floating-point, simply cast to float and divide by 100,000,000.

Examples:

- 4381030000 = 43.8103 (if divisible asset)
- 4381030000 = 4381030000 (if indivisible asset)

**NOTE:** XCP and BTC themselves are divisible assets.

### floats

Floats are ratios or floating point values with six decimal places of precision, used in bets and dividends.

### Memos

See the [Counterparty protocol specification](../../../advanced/protocol/#memos) for what constitutes a valid memo.
Examples:

- "for pizza"
- "1ca6"


## Miscellaneous

### Filtering Read API results

The Counterparty API aims to be as simple and flexible as possible. To this end, it includes a straightforward
way to filter the results of most [Read API](api.md#read-api-function-reference) to get the data you want, and only that.

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

For examples of filtering in-use, please see the [examples](#example-parameters).

NOTE: Note that with strings being compared, operators like ``>=`` do a lexigraphic string comparison (which
compares, letter to letter, based on the ASCII ordering for individual characters. For more information on
the specific comparison logic used, please see [this page](http://www.sqlite.org/lang_expr.html).
