---
title: API v1 ChangeLog
---


This section documents any changes to the v1 API, for version numbers where there were API-level modifications.

There will be no incompatible API pushes that do not either have:

* A well known set cut over date in the future
* Or, a deprecation process where the old API is supported for an amount of time

### 9.58.0
 * Added `P2SH` support and `MPMA` support:
   * Explanation of the new array parameters for `create_send`
   * Explanation of the new `p2sh_pretx_txid` parameter
   * Example to sign the new kind of `P2SH transaction`

### 9.55.5
* create_*: adds `extended_tx_info` parameter to create methods

### 9.55.4
* No changes

### 9.55.3
* create_send: Added `memo`, `memo_is_hex` and `use_enhanced_send` parameters
* get_sends: Added support for `memo` and `memo_hex` filters
* get_sends: Returns `memo` and `memo_hex` in the search results

### 9.55.2
* create_issuance: subassets longname are supported in the `asset` parameter

### 9.53.0
* Add min_message_index to get_blocks API call

### 9.52.0
* Added getrawtransaction and getrawtransaction_batch methods to the API
* Added optional custom_inputs parameter to API calls, which allows for controlling the exact UTXOs to use in transactions (contributed by Tokenly)

### 9.51.0
* Deprecated `get_asset_info(assets)` API method. Use `get_issuances()` and `get_supply()` instead.
* Deprecated `get_xcp_supply()` API method in favor of `get_supply(asset)`.
* Changed `get_unspent_txouts` API method parameter and return values.
* Added HTTP Rest API.
* Authentication on JSON‐RPC API is off by default
* `rpc_password` configuration parameter is no longer mandatory

### 9.49.4
* The `do_*`, `sign_tx` and `broadcast_tx` methods have been completely deprecated. See the section [Wallet Integration](#Wallet-Integration).
* Added REST API.

### 9.49.3

* \*_issuance: ``callable``, ``call_date`` and ``call_price`` are no longer valid parameters
* \*_callback: removed
* Bitcoin addresses may everywhere be replaced by pubkeys.
* The API will no longer search the local wallet for pubkeys, so they must be passed to the API manually if being used for the first time. Otherwise, you may get a "not published in blockchain" error.

### 9.43.0

* create_issuance: ``callable`` is also accepted
* create_*: ``null`` is used as default value for missing parameters

### 9.32.0

**Summary:** API framework overhaul for performance and simplicity

* "/api" with no trailing slash no longer supported as an API endpoint (use "/" or "/api/" instead)
* We now consistently reject positional arguments with all API methods. Make sure your API calls do not use positional
  arguments (e.g. use `{"argument1": "value1", "argument2": "value2"}` instead of `["value1", "value2"]`)

### 9.25.0

* new do_* methods: like create_*, but also sign and broadcast the transaction. Same parameters as create_*, plus optional privkey parameter.

**backwards incompatible changes**

* create_*: accept only dict as parameters
* create_bet: ``bet_type`` must be a integer (instead string)
* create_bet: ``wager`` and ``counterwager`` args are replaced by ``wager_quantity`` and ``counterwager_quantity``
* create_issuance: parameter ``lock`` (boolean) removed (use LOCK in description)
* create_issuance: parameter ``transfer_destination`` replaced by ``destination``
* DatabaseError: now a DatabaseError is returned immediately if the database is behind the backend, instead of after fourteen seconds

### 9.24.1

**Summary:** New API parsing engine added, as well as dynamic get method composition in ``api.py``:

* Added ``sql`` API method
* Filter params: Added ``LIKE``, ``NOT LIKE`` and ``IN``
