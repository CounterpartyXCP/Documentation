counterpartyd
==============

Counterparty is a protocol for the creation and use of decentralised financial instruments such as asset exchanges, contracts for difference and dividend payments. It uses Bitcoin as a transport layer. The Counterparty protocol specification may be found here.

``counterpartyd`` is the reference client (and server daemon) implementation of the Counterparty protocol.

To get ``counterpartyd`` installed and set up on your computer, you have two options:

- Set it up manually, using the instructions `here ttle an Order Match for which BTC is owed:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*):
* **order_match_id** (*string*):
* **validity** (*string*): Set to "valid" if valid


.. _burn-object:

Burn Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes an instance of a specific burn:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address the burn was performed from
* **burned** (*integer*): The :ref:`quantity <quantitys>` of BTC burned
* **earned** (*integer*): The :ref:`quantity <quantitys>` of XPC actually earned from the burn (takes into account any bonus quantitys, 1 BTC limitation, etc)
* **validity** (*string*): Set to "valid" if a valid burn. Any other setting signifies an invalid/improper burn


.. _cancel-object:

Cancel Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes a cancellation of a (previously) open order or bet:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address with the open order or bet that was cancelled
* **offer_hash** (*string*): The transaction hash of the order or bet cancelled
* **validity** (*string*): Set to "valid" if a valid burn. Any other setting signifies an invalid/improper burn


.. _debit-credit-object:

Debit/Credit Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes a account debit or credit:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **address** (*string*): The address debited or credited
* **asset** (*string*): The :ref:`asset <assets>` debited or credited
* **quantity** (*integer*): The :ref:`quantity <quantitys>` of the specified asset debited or credited


.. _dividend-object:

Dividend Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes an issuance of dividends on a specific user defined asset:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address that issued the dividend
* **asset** (*string*): The :ref:`asset <assets>` that the dividends are being rewarded on 
* **quantity_per_unit** (*integer*): The :ref:`quantity <quantitys>` of XCP rewarded per whole unit of the asset
* **validity** (*string*): Set to "valid" if a valid burn. Any other setting signifies an invalid/improper burn


.. _issuance-object:

Issuance Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes a specific occurance of a user defined asset being issued, or re-issued:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **asset** (*string*): The :ref:`asset <assets>` being issued, or re-issued
* **quantity** (*integer*): The :ref:`quantity <quantitys>` of the specified asset being issued
* **divisible** (*boolean*): Whether or not the asset is divisible (must agree with previous issuances of the asset, if there are any)
* **issuer** (*string*): 
* **transfer** (*boolean*): Whether or not this objects marks the transfer of ownership rights for the specified quantity of this asset
* **validity** (*string*): Set to "valid" if a valid issuance. Any other setting signifies an invalid/improper issuance


.. _order-object:

Order Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes a specific order:

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The address that made the order
* **give_asset** (*string*): The :ref:`asset <assets>` being offered
* **give_quantity** (*integer*): The :ref:`quantity <quantitys>` of the specified asset being offered
* **give_remaining** (*integer*): The :ref:`quantity <quantitys>` of the specified give asset remaining for the order
* **get_asset** (*string*): The :ref:`asset <assets>` desired in exchange
* **get_quantity** (*integer*): The :ref:`quantity <quantitys>` of the specified asset desired in exchange
* **get_remaining** (*integer*): The :ref:`quantity <quantitys>` of the specified get asset remaining for the order
* **price** (*float*): The given exchange rate (as an exchange ratio desired from the asset offered to the asset desired)
* **expiration** (*integer*): The number of blocks over which the order should be valid
* **fee_provided** (*integer*): The miners' fee provided; in BTC; required only if selling BTC (should not be lower than is required for acceptance in a block)
* **fee_required** (*integer*): The miners' fee required to be paid by orders for them to match this one; in BTC; required only if buying BTC (may be zero, though)


.. _order-match-object:

Order Match Object
^^^^^^^^^^^^^^^^^^^^^^^

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
* **forward_asset** (*string*): The :ref:`asset <assets>` exchanged FROM the first order to the second order
* **forward_quantity** (*integer*): The :ref:`quantity <quantitys>` of the specified forward asset
* **backward_asset** (*string*): The :ref:`asset <assets>` exchanged FROM the second order to the first order
* **backward_quantity** (*integer*): The :ref:`quantity <quantitys>` of the specified backward asset
* **validity** (*string*): Set to "valid" if a valid order match. Any other setting signifies an invalid/improper order match


.. _send-object:

Send Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes a specific send (e.g. "simple send", of XCP, or a user defined asset):

* **tx_index** (*integer*): The transaction index
* **tx_hash** (*string*): The transaction hash
* **block_index** (*integer*): The block index (block number in the block chain)
* **source** (*string*): The source address of the send
* **destination** (*string*): The destination address of the send
* **asset** (*string*): The :ref:`asset <assets>` being sent
* **quantity** (*integer*): The :ref:`quantity <quantitys>` of the specified asset sent
* **validity** (*string*): Set to "valid" if a valid send. Any other setting signifies an invalid/improper send


.. _message-object:

Message Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes a specific event in the counterpartyd message feed (which can be used by 3rd party applications
to track state changes to the counterpartyd database on a block-by-block basis).

* **message_index** (*integer*): The message index (i.e. transaction index)
* **block_index** (*integer*): The block index (block number in the block chain) this event occurred on
* **category** (*string*): A string denoting the entity that the message relates to, e.g. "credits", "burns", "debits".
  The category matches the relevant table name in counterpartyd (see blocks.py for more info).
* **command** (*string*): The operation done to the table noted in **category**. This is either "insert", or "update". 
* **bindings** (*string*): A JSON-encoded object containing the message data. The properties in this object match the
  columns in the table referred to by **category**.

  
.. _bet-expiration-object:

Bet Expiration Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes the expiration of a bet created by the source address.

* **bet_index** (*integer*): The transaction index of the bet expiring
* **bet_hash** (*string*): The transaction hash of the bet expiriing
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred
* **source** (*string*): The source address that created the bet


.. _order-expiration-object:

Order Expiration Object
^^^^^^^^^^^^^^^^^^^^^^^

An object that describes the expiration of an order created by the source address.

* **order_index** (*integer*): The transaction index of the order expiring
* **order_hash** (*string*): The transaction hash of the order expiriing
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred
* **source** (*string*): The source address that created the order


.. _bet-match-expiration-object:

Bet Match Expiration Object
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An object that describes the expiration of a bet match.

* **bet_match_id** (*integer*): The transaction index of the bet match ID (e.g. the concatenation of the tx0 and tx1 hashes)
* **tx0_address** (*string*): The tx0 (first) address for the bet match
* **tx1_address** (*string*): The tx1 (second) address for the bet match
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred


.. _order-match-expiration-object:

Order Match Expiration Object
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An object that describes the expiration of an order match.

* **order_match_id** (*integer*): The transaction index of the order match ID (e.g. the concatenation of the tx0 and tx1 hashes)
* **tx0_address** (*string*): The tx0 (first) address for the order match
* **tx1_address** (*string*): The tx1 (second) address for the order match
* **block_index** (*integer*): The block index (block number in the block chain) when this expiration occurred

.. _status-list:

Status
~~~~~~~~~~~~~~~~

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
  

API Changes
~~~~~~~~~~~~~~~~

This section documents any changes to the ``counterpartyd`` API, for version numbers where there were API-level modifications.


.. _9_24_1:

9.24.1
^^^^^^^^^^^^^^^^^^^^^^^

**Summary:** New API parsing engine added, as well as dynamic get_ method composition in ``api.py``: 

* Added ``sql`` API method
* Filter params: Added ``LIKE``, ``NOT LIKE`` and ``IN``


.. _9_25_0:

9.25.0
^^^^^^^^^^^^^^^^^^^^^^^

* new do_* methods: like create_*, but also sign and broadcast the transaction. Same parameters as create_*, plus optional privkey parameter.

**backwards incompatible changes**

* create_*: accept only dict as parameters
* create_bet: ``bet_type`` must be a integer (instead string)
* create_bet: ``wager`` and ``counterwager`` args are replaced by ``wager_quantity`` and ``counterwager_quantity``
* create_issuance: parameter ``lock`` (boolean) removed (use LOCK in description)
* create_issuance: parameter ``transfer_destination`` replaced by ``destination``
* DatabaseError: now a DatabaseError is returned immediately if the counterpartyd database is behind the backend, instead of after fourteen seconds


.. _9_32_0:

9.32.0
^^^^^^^^^^^^^^^^^^^^^^^

**Summary:** API framework overhaul for performance and simplicity 

* "/api" with no trailing slash no longer supported as an API endpoint (use "/" or "/api/" instead)
* We now consistently reject positional arguments with all API methods. Make sure your API calls do not use positional
  arguments (e.g. use {"argument1": "value1", "argument2": "value2"} instead of ["value1", "value2"])


.. _9_43_0:

9.43.0
^^^^^^^^^^^^^^^^^^^^^^^

* create_issuance: ``callable`` is also accepted
* create_*: None is used as default value for missing parameters 

9.49.3
^^^^^^^^^^^^^^^^^^^^^^^
* \*_issuance: ``callable``, ``call_date`` and ``call_price`` are no longer valid parameters
* \*_callback: removed
* Bitcoin addresses may everywhere be replaced by pubkeys.
* The API will no longer search the local wallet for pubkeys, so they must be
passed to the API manually if being used for the first time. Otherwise, you may
get a "<address> not published in blockchain" error.


.. warning::

    This API documentation is still in an early state. It contains errors, omissions, etc., and could change drastically at any time.
    
