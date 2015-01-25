counterpartyd
==============

Counterparty is a protocol for the creation and use of decentralised financial instruments such as asset exchanges, contracts for difference and dividend payments. It uses Bitcoin as a transport layer. The Counterparty protocol specification may be found here.

``counterpartyd`` is the reference client (and server daemon) implementation of the Counterparty protocol.

API

There will be no incompatible API pushes that do not either have: \* A
well known set cut over date in the future \* Or, a deprecation process
where the old API is supported for an amount of time

.. contents:: **Table of Contents**

Interacting with the API
=========================

.. warning::

    This API documentation is still in an early state. It contains errors, omissions, etc., and could change drastically at any time.
    

Overview
----------

``counterpartyd`` features a full-fledged JSON RPC 2.0-based API, which allows
third-party applications to perform functions on the Counterparty network
without having to deal with the low‐level details of the protocol such as
transaction encoding and state management.


Connecting and Making Requests
---------------------------------

By default, ``counterpartyd`` will listen on port ``4000`` (if on mainnet) or port ``14000`` (on testnet) for API
requests. 

Note that this API is built on JSON-RPC 2.0, not 1.1. JSON-RPC itself is pretty lightweight, and API requests
are made via a HTTP POST request to ``/api/`` (note the trailing slash), with JSON-encoded data passed as the POST body.

General Format
~~~~~~~~~~~~~~~~

All requests must have POST data that is JSON encoded and in the format of:

``{ "method": "METHOD NAME", "params": {"param1": "value1", "param2": "value2"}, "jsonrpc": "2.0", "id": 0 }``

In particular, note the ``jsonrpc`` and ``id`` properties. These are requirements under the JSON-RPC 2.0 spec.

Here's an example of the POST data for a valid API request:

.. code-block::

    {
      "method": "get_burns",
      "params": {"order_by": 'tx_hash',
                 "order_dir": 'asc',
                 "start_block": 280537,
                 "end_block": 280539},
      "jsonrpc": "2.0",
      "id": 0,
    }

You should note that the data in ``params`` is a JSON object (e.g. mapping), not an array. In other words, 
**the API only supports named arguments, not positional arguments** (e.g. use
{"argument1": "value1", "argument2": "value2"} instead of ["value1", "value2"]). This is the case for safety and bug-minimzation reasons.

For more information on JSON RPC, please see the `JSON RPC 2.0 specification 
