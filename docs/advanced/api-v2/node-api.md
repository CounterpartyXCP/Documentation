---
title: API v2
---

FORMAT: 1A
HOST: https://api.counterparty.io

# Counterparty Core API

The Counterparty Core API is the recommended (and only supported) way to query the state of a Counterparty node. 

API routes are divided into 11 groups:
- [`/blocks`](#group-blocks)
- [`/transactions`](#group-transactions)
- [`/addresses`](#group-addresses)
- [`/compose`](#group-compose)
- [`/assets`](#group-assets)
- [`/orders`](#group-orders)
- [`/bets`](#group-bets)
- [`/dispensers`](#group-dispensers)
- [`/burns`](#group-burns)
- [`/events`](#group-events)
- [`/mempool`](#group-mempool)
- [`/bitcoin`](#group-bitcoin)

Notes:

- When the server is not ready, that is to say when all the blocks are not yet parsed, all routes return a 503 error except `/` and those in the `/blocks`, `/transactions` and `/backend` groups which always return a result.

- All API responses contain the following 3 headers:

    * `X-COUNTERPARTY-HEIGHT` contains the last block parsed by Counterparty
    * `X-BITCOIN-HEIGHT` contains the last block known to Bitcoin Core
    * `X-COUNTERPARTY-READY` contains true if `X-COUNTERPARTY-HEIGHT` >= `X-BITCOIN-HEIGHT` - 1

- All API responses follow the following format:

    ```
    {
        "error": <error_messsage_if_success_is_false>,
        "result": <result_of_the_query_if_success_is_true>
    }
    ```

- Routes in the `/bitcoin` group serve as a proxy to make requests to Bitcoin Core.

# Counterparty API Root [`/`]

### Get Server Info [GET]

Returns server information and the list of documented routes in JSON format.

+ Response 200 (application/json)

    ```
    {
        "server_ready": true,
        "network": "mainnet",
        "version": "10.1.1",
        "backend_height": 840796,
        "counterparty_height": 840796,
        "routes": [
            <API Documentation in JSON>
        ]
    }
    ```


## Group Blocks

### Get Blocks [GET `/blocks`]

Returns the list of the last ten blocks

+ Parameters
    + last: `840000` (int, optional) - The index of the most recent block to return
        + Default: `None`
    + limit: `2` (int, optional) - The number of blocks to return
        + Default: `10`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "block_index": 840000,
                    "block_hash": "0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5",
                    "block_time": 1713571767,
                    "previous_block_hash": "0000000000000000000172014ba58d66455762add0512355ad651207918494ab",
                    "difficulty": 86388558925171.02,
                    "ledger_hash": "b91dd54cfbd3aff07b358a038bf6174ddc06f36bd00cdccf048e8281bcd56224",
                    "txlist_hash": "b641c3e190b9941fcd5c84a7c07e66c03559ef26dcea892e2db1cf1d8392a4f2",
                    "messages_hash": "5c5de34009839ee66ebc3097ecd28bd5deee9553966b3ee39e8a08e123ac9adc"
                },
                {
                    "block_index": 839999,
                    "block_hash": "0000000000000000000172014ba58d66455762add0512355ad651207918494ab",
                    "block_time": 1713571533,
                    "previous_block_hash": "00000000000000000001dcce6ce7c8a45872cafd1fb04732b447a14a91832591",
                    "difficulty": 86388558925171.02,
                    "ledger_hash": "e2b2e23c2ac1060dafe2395da01fe5907f323b5a644816f45f003411c612ac30",
                    "txlist_hash": "f33f800ef166e6ef5b3df15a0733f9fd3ebb0b799f39ef1951e6709118b7c0fd",
                    "messages_hash": "16b7d40543b7b80587f4d98c84fcdfdceb2d1c18abba82c7064c09c2795b7ab2"
                }
            ]
        }
    ```

### Get Block [GET `/blocks/{block_index}`]

Return the information of a block

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": {
                "block_index": 840464,
                "block_hash": "00000000000000000001093d4d6b21b80800fff6e5ea15cce6d65066f482cce9",
                "block_time": 1713852783,
                "previous_block_hash": "00000000000000000002db1e5aa19784eec3de949f98ec757e7a7f2fc392079d",
                "difficulty": 86388558925171.02,
                "ledger_hash": "b3f8cbb50b0705a5c4a8495f8b5128de13a32daebd8ac5e8316a010f0d203584",
                "txlist_hash": "84bdc5b9073f775a2b65de7da2b10b89a2235f3501883b0a836e41e68cd00d46",
                "messages_hash": "801d961c45a257f85ef0f10a6a8fdf048a520ae4861c0903f26365b3eaaaf540"
            }
        }
    ```

### Get Transactions By Block [GET `/blocks/{block_index}/transactions`]

Returns the transactions of a block

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726605,
                    "tx_hash": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                    "block_index": 840464,
                    "block_hash": "00000000000000000001093d4d6b21b80800fff6e5ea15cce6d65066f482cce9",
                    "block_time": 1713852783,
                    "source": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "destination": "",
                    "btc_amount": 0,
                    "fee": 56565,
                    "data": "16010b9142801429a60000000000000001000000554e4e45474f544941424c45205745204d555354204245434f4d4520554e4e45474f544941424c4520574520415245",
                    "supported": 1
                }
            ]
        }
    ```

### Get Events By Block [GET `/blocks/{block_index}/events`]

Returns the events of a block

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "event_index": 14194760,
                    "event": "BLOCK_PARSED",
                    "params": {
                        "block_index": 840464,
                        "ledger_hash": "b3f8cbb50b0705a5c4a8495f8b5128de13a32daebd8ac5e8316a010f0d203584",
                        "messages_hash": "801d961c45a257f85ef0f10a6a8fdf048a520ae4861c0903f26365b3eaaaf540",
                        "txlist_hash": "84bdc5b9073f775a2b65de7da2b10b89a2235f3501883b0a836e41e68cd00d46"
                    }
                },
                {
                    "event_index": 14194759,
                    "event": "TRANSACTION_PARSED",
                    "params": {
                        "supported": true,
                        "tx_hash": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                        "tx_index": 2726605
                    }
                },
                {
                    "event_index": 14194758,
                    "event": "CREDIT",
                    "params": {
                        "address": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                        "asset": "UNNEGOTIABLE",
                        "block_index": 840464,
                        "calling_function": "issuance",
                        "event": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                        "quantity": 1,
                        "tx_index": 2726605
                    }
                },
                {
                    "event_index": 14194757,
                    "event": "ASSET_ISSUANCE",
                    "params": {
                        "asset": "UNNEGOTIABLE",
                        "asset_longname": null,
                        "block_index": 840464,
                        "call_date": 0,
                        "call_price": 0.0,
                        "callable": false,
                        "description": "UNNEGOTIABLE WE MUST BECOME UNNEGOTIABLE WE ARE",
                        "divisible": false,
                        "fee_paid": 50000000,
                        "issuer": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                        "locked": false,
                        "quantity": 1,
                        "reset": false,
                        "source": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                        "status": "valid",
                        "transfer": false,
                        "tx_hash": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                        "tx_index": 2726605
                    }
                },
                {
                    "event_index": 14194756,
                    "event": "ASSET_CREATION",
                    "params": {
                        "asset_id": "75313533584419238",
                        "asset_longname": null,
                        "asset_name": "UNNEGOTIABLE",
                        "block_index": 840464
                    }
                },
                {
                    "event_index": 14194755,
                    "event": "DEBIT",
                    "params": {
                        "action": "issuance fee",
                        "address": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                        "asset": "XCP",
                        "block_index": 840464,
                        "event": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                        "quantity": 50000000,
                        "tx_index": 2726605
                    }
                },
                {
                    "event_index": 14194754,
                    "event": "NEW_TRANSACTION",
                    "params": {
                        "block_hash": "00000000000000000001093d4d6b21b80800fff6e5ea15cce6d65066f482cce9",
                        "block_index": 840464,
                        "block_time": 1713852783,
                        "btc_amount": 0,
                        "data": "16010b9142801429a60000000000000001000000554e4e45474f544941424c45205745204d555354204245434f4d4520554e4e45474f544941424c4520574520415245",
                        "destination": "",
                        "fee": 56565,
                        "source": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                        "tx_hash": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                        "tx_index": 2726605
                    }
                },
                {
                    "event_index": 14194753,
                    "event": "NEW_BLOCK",
                    "params": {
                        "block_hash": "00000000000000000001093d4d6b21b80800fff6e5ea15cce6d65066f482cce9",
                        "block_index": 840464,
                        "block_time": 1713852783,
                        "difficulty": 86388558925171.02,
                        "previous_block_hash": "00000000000000000002db1e5aa19784eec3de949f98ec757e7a7f2fc392079d"
                    }
                }
            ]
        }
    ```

### Get Event Counts By Block [GET `/blocks/{block_index}/events/counts`]

Returns the event counts of a block

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "event": "ASSET_CREATION",
                    "event_count": 1
                },
                {
                    "event": "ASSET_ISSUANCE",
                    "event_count": 1
                },
                {
                    "event": "BLOCK_PARSED",
                    "event_count": 1
                },
                {
                    "event": "CREDIT",
                    "event_count": 1
                },
                {
                    "event": "DEBIT",
                    "event_count": 1
                },
                {
                    "event": "NEW_BLOCK",
                    "event_count": 1
                },
                {
                    "event": "NEW_TRANSACTION",
                    "event_count": 1
                },
                {
                    "event": "TRANSACTION_PARSED",
                    "event_count": 1
                }
            ]
        }
    ```

### Get Events By Block And Event [GET `/blocks/{block_index}/events/{event}`]

Returns the events of a block filtered by event

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return
    + event: `CREDIT` (str, required) - The event to filter by

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "event_index": 14194758,
                    "event": "CREDIT",
                    "params": {
                        "address": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                        "asset": "UNNEGOTIABLE",
                        "block_index": 840464,
                        "calling_function": "issuance",
                        "event": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                        "quantity": 1,
                        "tx_index": 2726605
                    }
                }
            ]
        }
    ```

### Get Credits By Block [GET `/blocks/{block_index}/credits`]

Returns the credits of a block

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "block_index": 840464,
                    "address": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "asset": "UNNEGOTIABLE",
                    "quantity": 1,
                    "calling_function": "issuance",
                    "event": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                    "tx_index": 2726605
                }
            ]
        }
    ```

### Get Debits By Block [GET `/blocks/{block_index}/debits`]

Returns the debits of a block

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "block_index": 840464,
                    "address": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "asset": "XCP",
                    "quantity": 50000000,
                    "action": "issuance fee",
                    "event": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                    "tx_index": 2726605
                }
            ]
        }
    ```

### Get Expirations [GET `/blocks/{block_index}/expirations`]

Returns the expirations of a block

+ Parameters
    + block_index: `840356` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "type": "order",
                    "object_id": "533d5c0ecd8ca9c2946d3298cc5e570eee55b62b887dd85c95de6de4fdc7f441"
                },
                {
                    "type": "order",
                    "object_id": "b048661afeee3f266792481168024abc0d7648fe0e019e4a1e0fd9867c2c0ffc"
                }
            ]
        }
    ```

### Get Cancels [GET `/blocks/{block_index}/cancels`]

Returns the cancels of a block

+ Parameters
    + block_index: `839746` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2725738,
                    "tx_hash": "793af9129c7368f974c3ea0c87ad38131f0d82d19fbaf1adf8aaf2e657ec42b8",
                    "block_index": 839746,
                    "source": "1E6tyJ2zCyX74XgEK8t9iNMjxjNVLCGR1u",
                    "offer_hash": "04b258ac37f73e3b9a8575110320d67c752e1baace0f516da75845f388911735",
                    "status": "valid"
                },
                {
                    "tx_index": 2725739,
                    "tx_hash": "2071e8a6fbc0c443b152d513c754356f8f962db2fa694de8c6826b57413cc190",
                    "block_index": 839746,
                    "source": "1E6tyJ2zCyX74XgEK8t9iNMjxjNVLCGR1u",
                    "offer_hash": "b1622dbe4f0ce740cb6c18f6f136876bc4949c40a62bc8cceefa81fd6679a57f",
                    "status": "valid"
                }
            ]
        }
    ```

### Get Destructions [GET `/blocks/{block_index}/destructions`]

Returns the destructions of a block

+ Parameters
    + block_index: `839988` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726496,
                    "tx_hash": "f5609facc8dac6cdf70b15c514ea15a9acc24a9bd86dcac2b845d5740fbcc50b",
                    "block_index": 839988,
                    "source": "1FpLAtreZjTVCMcj1pq1AHWuqcs3n7obMm",
                    "asset": "COBBEE",
                    "quantity": 50000,
                    "tag": "",
                    "status": "valid"
                }
            ]
        }
    ```

### Get Issuances By Block [GET `/blocks/{block_index}/issuances`]

Returns the issuances of a block

+ Parameters
    + block_index: `840464` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726605,
                    "tx_hash": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                    "msg_index": 0,
                    "block_index": 840464,
                    "asset": "UNNEGOTIABLE",
                    "quantity": 1,
                    "divisible": 0,
                    "source": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "issuer": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "transfer": 0,
                    "callable": 0,
                    "call_date": 0,
                    "call_price": 0.0,
                    "description": "UNNEGOTIABLE WE MUST BECOME UNNEGOTIABLE WE ARE",
                    "fee_paid": 50000000,
                    "locked": 0,
                    "status": "valid",
                    "asset_longname": null,
                    "reset": 0
                }
            ]
        }
    ```

### Get Sends By Block [GET `/blocks/{block_index}/sends`]

Returns the sends of a block

+ Parameters
    + block_index: `840459` (int, required) - The index of the block to return
    + limit: `5` (int, optional) - The maximum number of sends to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the sends to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726604,
                    "tx_hash": "b4bbb14c99dd260eb634243e5c595e1b7213459979857a32850de84989bb71ec",
                    "block_index": 840459,
                    "source": "13Hnmhs5gy2yXKVBx4wSM5HCBdKnaSBZJH",
                    "destination": "1LfT83WAxbN9qKhtrXxcQA6xgdhfZk21Hz",
                    "asset": "GAMESOFTRUMP",
                    "quantity": 1,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                }
            ]
        }
    ```

### Get Dispenses By Block [GET `/blocks/{block_index}/dispenses`]

Returns the dispenses of a block

+ Parameters
    + block_index: `840322` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726580,
                    "dispense_index": 0,
                    "tx_hash": "e7f0f2c9bef7a492b714a5952ec61b283be344419c5bc33f405f9af41ebfa48b",
                    "block_index": 840322,
                    "source": "bc1qq735dv8peps2ayr3qwwwdwylq4ddwcgrpyg9r2",
                    "destination": "bc1qzcdkhnexpjc8wvkyrpyrsn0f5xzcpu877mjmgj",
                    "asset": "FLOCK",
                    "dispense_quantity": 90000000000,
                    "dispenser_tx_hash": "753787004d6e93e71f6e0aa1e0932cc74457d12276d53856424b2e4088cc542a"
                }
            ]
        }
    ```

### Get Sweeps By Block [GET `/blocks/{block_index}/sweeps`]

Returns the sweeps of a block

+ Parameters
    + block_index: `836519` (int, required) - The index of the block to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2720536,
                    "tx_hash": "9309a4c0aed426e281a52e5d48acadd1464999269a5e75cf2293edd0277d743d",
                    "block_index": 836519,
                    "source": "1DMVnJuqBobXA9xYioabBsR4mN8bvVtCAW",
                    "destination": "1HC2q92SfH1ZHzS4CrDwp6KAipV4FqUL4T",
                    "flags": 3,
                    "status": "valid",
                    "memo": null,
                    "fee_paid": 1400000
                },
                {
                    "tx_index": 2720537,
                    "tx_hash": "d8db6281abffdbf6c320d5ade06aeb6fad2f7bfa1a2c2243c6726020a27107d3",
                    "block_index": 836519,
                    "source": "18szqTVJUWwYrtRHq98Wn4DhCGGiy3jZ87",
                    "destination": "1HC2q92SfH1ZHzS4CrDwp6KAipV4FqUL4T",
                    "flags": 3,
                    "status": "valid",
                    "memo": null,
                    "fee_paid": 1400000
                }
            ]
        }
    ```

## Group Transactions

### Info [GET `/transactions/info`]

Returns Counterparty information from a raw transaction in hex format.

+ Parameters
    + rawtransaction: `01000000017828697743c03aef6a3a8ba54b22bf579ffcab8161faf20e7b20c4ecd75cc986010000006b483045022100d1bd0531bb1ed2dd2cbf77d6933273e792a3dbfa84327d419169850ddd5976f502205d1ab0f7bcbf1a0cc183f0520c9aa8f711d41cb790c0c4ac39da6da4a093d798012103d3b1f711e907acb556e239f6cafb6a4f7fe40d8dd809b0e06e739c2afd73f202ffffffff0200000000000000004d6a4bf29880b93b0711524c7ef9c76835752088db8bd4113a3daf41fc45ffdc8867ebdbf26817fae377696f36790e52f51005806e9399a427172fedf348cf798ed86e548002ee96909eef0775ec3c2b0100000000001976a91443434cf159cc585fbd74daa9c4b833235b19761b88ac00000000` (str, required) - Raw transaction in hex format
    + block_index (int, optional) - Block index mandatory for transactions before block 335000
        + Default: `None`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "source": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                "destination": "",
                "btc_amount": 0,
                "fee": 56565,
                "data": "16010b9142801429a60000000000000001000000554e4e45474f544941424c45205745204d555354204245434f4d4520554e4e45474f544941424c4520574520415245",
                "unpacked_data": {
                    "message_type": "issuance",
                    "message_type_id": 22,
                    "message_data": {
                        "asset_id": 75313533584419238,
                        "asset": "UNNEGOTIABLE",
                        "subasset_longname": null,
                        "quantity": 1,
                        "divisible": false,
                        "lock": false,
                        "reset": false,
                        "callable": false,
                        "call_date": 0,
                        "call_price": 0.0,
                        "description": "UNNEGOTIABLE WE MUST BECOME UNNEGOTIABLE WE ARE",
                        "status": "valid"
                    }
                }
            }
        }
    ```

### Unpack [GET `/transactions/unpack`]

Unpacks Counterparty data in hex format and returns the message type and data.

+ Parameters
    + datahex: `16010b9142801429a60000000000000001000000554e4e45474f544941424c45205745204d555354204245434f4d4520554e4e45474f544941424c4520574520415245` (str, required) - Data in hex format
    + block_index (int, optional) - Block index of the transaction containing this data
        + Default: `None`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "message_type": "issuance",
                "message_type_id": 22,
                "message_data": {
                    "asset_id": 75313533584419238,
                    "asset": "UNNEGOTIABLE",
                    "subasset_longname": null,
                    "quantity": 1,
                    "divisible": false,
                    "lock": false,
                    "reset": false,
                    "callable": false,
                    "call_date": 0,
                    "call_price": 0.0,
                    "description": "UNNEGOTIABLE WE MUST BECOME UNNEGOTIABLE WE ARE",
                    "status": "valid"
                }
            }
        }
    ```

### Get Transaction By Hash [GET `/transactions/{tx_hash}`]

Returns a transaction by its hash.

+ Parameters
    + tx_hash: `876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5` (str, required) - The hash of the transaction

+ Response 200 (application/json)

    ```
        {
            "result": {
                "tx_index": 2726605,
                "tx_hash": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                "block_index": 840464,
                "block_hash": "00000000000000000001093d4d6b21b80800fff6e5ea15cce6d65066f482cce9",
                "block_time": 1713852783,
                "source": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                "destination": "",
                "btc_amount": 0,
                "fee": 56565,
                "data": "16010b9142801429a60000000000000001000000554e4e45474f544941424c45205745204d555354204245434f4d4520554e4e45474f544941424c4520574520415245",
                "supported": 1,
                "unpacked_data": {
                    "message_type": "issuance",
                    "message_type_id": 22,
                    "message_data": {
                        "asset_id": 75313533584419238,
                        "asset": "UNNEGOTIABLE",
                        "subasset_longname": null,
                        "quantity": 1,
                        "divisible": false,
                        "lock": false,
                        "reset": false,
                        "callable": false,
                        "call_date": 0,
                        "call_price": 0.0,
                        "description": "UNNEGOTIABLE WE MUST BECOME UNNEGOTIABLE WE ARE",
                        "status": "valid"
                    }
                }
            }
        }
    ```

## Group Addresses

### Get Address Balances [GET `/addresses/{address}/balances`]

Returns the balances of an address

+ Parameters
    + address: `1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs` (str, required) - The address to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "address": "1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs",
                    "asset": "XCP",
                    "quantity": 104200000000
                }
            ]
        }
    ```

### Get Balance By Address And Asset [GET `/addresses/{address}/balances/{asset}`]

Returns the balance of an address and asset

+ Parameters
    + address: `1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs` (str, required) - The address to return
    + asset: `XCP` (str, required) - The asset to return

+ Response 200 (application/json)

    ```
        {
            "result": {
                "address": "1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs",
                "asset": "XCP",
                "quantity": 104200000000
            }
        }
    ```

### Get Credits By Address [GET `/addresses/{address}/credits`]

Returns the credits of an address

+ Parameters
    + address: `1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs` (str, required) - The address to return
    + limit: `5` (int, optional) - The maximum number of credits to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the credits to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "block_index": 830981,
                    "address": "1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs",
                    "asset": "XCP",
                    "quantity": 104200000000,
                    "calling_function": "send",
                    "event": "7e4fbb0a1eeeee34bf499955f1027fb78c514d63a3c8ff2e28c6dad005e4d850",
                    "tx_index": 2677412
                }
            ]
        }
    ```

### Get Debits By Address [GET `/addresses/{address}/debits`]

Returns the debits of an address

+ Parameters
    + address: `bc1q7787j6msqczs58asdtetchl3zwe8ruj57p9r9y` (str, required) - The address to return
    + limit: `5` (int, optional) - The maximum number of debits to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the debits to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "block_index": 836949,
                    "address": "bc1q7787j6msqczs58asdtetchl3zwe8ruj57p9r9y",
                    "asset": "XCP",
                    "quantity": 40000000000,
                    "action": "open dispenser",
                    "event": "53ed08176d3479f49986e9282293da85cebc03835b128d8e790ee587f9f1c750",
                    "tx_index": 2721524
                },
                {
                    "block_index": 840388,
                    "address": "bc1q7787j6msqczs58asdtetchl3zwe8ruj57p9r9y",
                    "asset": "XCP",
                    "quantity": 250000000000,
                    "action": "send",
                    "event": "bc54968ba7d0a59a47b276602e2dbdcf01b14009742e0d7b50272cbae529a9a4",
                    "tx_index": 2726594
                }
            ]
        }
    ```

### Get Bet By Feed [GET `/addresses/{address}/bets`]

Returns the bets of a feed

+ Parameters
    + address: `1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk` (str, required) - The address of the feed
    + status: `filled` (str, optional) - The status of the bet
        + Default: `open`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 15106,
                    "tx_hash": "5d097b4729cb74d927b4458d365beb811a26fcee7f8712f049ecbe780eb496ed",
                    "block_index": 304063,
                    "source": "18ZNyaAcH4HugeofwbrpLoUNiayxJRH65c",
                    "feed_address": "1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "bet_type": 3,
                    "deadline": 1401828300,
                    "wager_quantity": 50000000,
                    "wager_remaining": 0,
                    "counterwager_quantity": 50000000,
                    "counterwager_remaining": 0,
                    "target_value": 1.0,
                    "leverage": 5040,
                    "expiration": 11,
                    "expire_index": 304073,
                    "fee_fraction_int": 1000000,
                    "status": "filled"
                },
                {
                    "tx_index": 61338,
                    "tx_hash": "0fcc7f5190c028f6c5534554d10ec5b4a9246d63826421cd58be2d572d11f088",
                    "block_index": 320704,
                    "source": "1Ew38GxczvV1KxjzZsq9f8UuRzHkHQrL5C",
                    "feed_address": "1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "bet_type": 2,
                    "deadline": 1410728400,
                    "wager_quantity": 1000000,
                    "wager_remaining": 0,
                    "counterwager_quantity": 1999991,
                    "counterwager_remaining": 0,
                    "target_value": 1.0,
                    "leverage": 5040,
                    "expiration": 13,
                    "expire_index": 320715,
                    "fee_fraction_int": 1000000,
                    "status": "filled"
                }
            ]
        }
    ```

### Get Broadcasts By Source [GET `/addresses/{address}/broadcasts`]

Returns the broadcasts of a source

+ Parameters
    + address: `1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk` (str, required) - The address to return
    + status: `valid` (str, optional) - The status of the broadcasts to return
        + Default: `valid`
    + order_by: `ASC` (str, optional) - The order of the broadcasts to return
        + Default: `DESC`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 15055,
                    "tx_hash": "774887e555a6ae5a8c058ebc0185058307977f01a2d4d326e71f37d6dd977154",
                    "block_index": 304048,
                    "source": "1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "timestamp": 1401815290,
                    "value": -1.0,
                    "fee_fraction_int": 1000000,
                    "text": "xbet.io/feed/1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "locked": 0,
                    "status": "valid"
                },
                {
                    "tx_index": 61477,
                    "tx_hash": "5d49993bec727622c7b41c84e2b1e65c368f33390d633d217131ffcc5b592f0d",
                    "block_index": 320718,
                    "source": "1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "timestamp": 1410732503,
                    "value": 1.0,
                    "fee_fraction_int": 1000000,
                    "text": "xbet.io/feed/1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "locked": 0,
                    "status": "valid"
                }
            ]
        }
    ```

### Get Burns By Address [GET `/addresses/{address}/burns`]

Returns the burns of an address

+ Parameters
    + address: `1HVgrYx3U258KwvBEvuG7R8ss1RN2Z9J1W` (str, required) - The address to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 3070,
                    "tx_hash": "4560d0e3d04927108b615ab106040489aca9c4aceedcf69d2b71f63b3139c7ae",
                    "block_index": 283810,
                    "source": "1HVgrYx3U258KwvBEvuG7R8ss1RN2Z9J1W",
                    "burned": 10000000,
                    "earned": 10000000000,
                    "status": "valid"
                }
            ]
        }
    ```

### Get Send By Address [GET `/addresses/{address}/sends`]

Returns the sends of an address

+ Parameters
    + address: `1HVgrYx3U258KwvBEvuG7R8ss1RN2Z9J1W` (str, required) - The address to return
    + limit: `5` (int, optional) - The maximum number of sends to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the sends to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 163106,
                    "tx_hash": "1c447b41816f1cfbb83f125c8e05faeaae70dbf27255745ba7393f809bd388eb",
                    "block_index": 343049,
                    "source": "1HVgrYx3U258KwvBEvuG7R8ss1RN2Z9J1W",
                    "destination": "16cRBUNnTWiUh2sXWNn1P7KHyJUmyMkdfH",
                    "asset": "XCP",
                    "quantity": 10000000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                }
            ]
        }
    ```

### Get Receive By Address [GET `/addresses/{address}/receives`]

Returns the receives of an address

+ Parameters
    + address: `1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs` (str, required) - The address to return
    + limit: `5` (int, optional) - The maximum number of receives to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the receives to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2677412,
                    "tx_hash": "7e4fbb0a1eeeee34bf499955f1027fb78c514d63a3c8ff2e28c6dad005e4d850",
                    "block_index": 830981,
                    "source": "bc1qqxr9grqw73dm95cen3g56mzswuj6eqjedu6csx",
                    "destination": "1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs",
                    "asset": "XCP",
                    "quantity": 104200000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                }
            ]
        }
    ```

### Get Send By Address And Asset [GET `/addresses/{address}/sends/{asset}`]

Returns the sends of an address and asset

+ Parameters
    + address: `1HVgrYx3U258KwvBEvuG7R8ss1RN2Z9J1W` (str, required) - The address to return
    + asset: `XCP` (str, required) - The asset to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 163106,
                    "tx_hash": "1c447b41816f1cfbb83f125c8e05faeaae70dbf27255745ba7393f809bd388eb",
                    "block_index": 343049,
                    "source": "1HVgrYx3U258KwvBEvuG7R8ss1RN2Z9J1W",
                    "destination": "16cRBUNnTWiUh2sXWNn1P7KHyJUmyMkdfH",
                    "asset": "XCP",
                    "quantity": 10000000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                }
            ]
        }
    ```

### Get Receive By Address And Asset [GET `/addresses/{address}/receives/{asset}`]

Returns the receives of an address and asset

+ Parameters
    + address: `1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs` (str, required) - The address to return
    + asset: `XCP` (str, required) - The asset to return
    + limit: `5` (int, optional) - The maximum number of receives to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the receives to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2677412,
                    "tx_hash": "7e4fbb0a1eeeee34bf499955f1027fb78c514d63a3c8ff2e28c6dad005e4d850",
                    "block_index": 830981,
                    "source": "bc1qqxr9grqw73dm95cen3g56mzswuj6eqjedu6csx",
                    "destination": "1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs",
                    "asset": "XCP",
                    "quantity": 104200000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                }
            ]
        }
    ```

### Get Dispensers By Address [GET `/addresses/{address}/dispensers`]

Returns the dispensers of an address

+ Parameters
    + address: `bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz` (str, required) - The address to return
    + status (int, optional) - 
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726460,
                    "tx_hash": "b592d8ca4994d182e4ec63e1659dc4282b1a84466b7d71ed68c281ce63ed4897",
                    "block_index": 839964,
                    "source": "bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz",
                    "asset": "ERYKAHPEPU",
                    "give_quantity": 1,
                    "escrow_quantity": 25,
                    "satoshirate": 50000,
                    "status": 0,
                    "give_remaining": 25,
                    "oracle_address": null,
                    "last_status_tx_hash": null,
                    "origin": "1E6tyJ2zCyX74XgEK8t9iNMjxjNVLCGR1u",
                    "dispense_count": 0
                }
            ]
        }
    ```

### Get Dispensers By Address And Asset [GET `/addresses/{address}/dispensers/{asset}`]

Returns the dispensers of an address and an asset

+ Parameters
    + address: `bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz` (str, required) - The address to return
    + asset: `ERYKAHPEPU` (str, required) - The asset to return
    + status (int, optional) - 
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726460,
                    "tx_hash": "b592d8ca4994d182e4ec63e1659dc4282b1a84466b7d71ed68c281ce63ed4897",
                    "block_index": 839964,
                    "source": "bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz",
                    "asset": "ERYKAHPEPU",
                    "give_quantity": 1,
                    "escrow_quantity": 25,
                    "satoshirate": 50000,
                    "status": 0,
                    "give_remaining": 25,
                    "oracle_address": null,
                    "last_status_tx_hash": null,
                    "origin": "1E6tyJ2zCyX74XgEK8t9iNMjxjNVLCGR1u",
                    "dispense_count": 0
                }
            ]
        }
    ```

### Get Sweeps By Address [GET `/addresses/{address}/sweeps`]

Returns the sweeps of an address

+ Parameters
    + address: `18szqTVJUWwYrtRHq98Wn4DhCGGiy3jZ87` (str, required) - The address to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2720537,
                    "tx_hash": "d8db6281abffdbf6c320d5ade06aeb6fad2f7bfa1a2c2243c6726020a27107d3",
                    "block_index": 836519,
                    "source": "18szqTVJUWwYrtRHq98Wn4DhCGGiy3jZ87",
                    "destination": "1HC2q92SfH1ZHzS4CrDwp6KAipV4FqUL4T",
                    "flags": 3,
                    "status": "valid",
                    "memo": null,
                    "fee_paid": 1400000
                }
            ]
        }
    ```

## Group Compose


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Bet [GET `/addresses/{address}/compose/bet`]

Composes a transaction to issue a bet against a feed.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will make the bet
    + feed_address: `1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev` (str, required) - The address that hosts the feed to be bet on
    + bet_type: `2` (int, required) - Bet 0 for Bullish CFD (deprecated), 1 for Bearish CFD (deprecated), 2 for Equal, 3 for NotEqual
    + deadline: `3000000000` (int, required) - The time at which the bet should be decided/settled, in Unix time (seconds since epoch)
    + wager_quantity: `1000` (int, required) - The quantities of XCP to wager (in satoshis, hence integer)
    + counterwager_quantity: `1000` (int, required) - The minimum quantities of XCP to be wagered against, for the bets to match
    + expiration: `100` (int, required) - The number of blocks after which the bet expires if it remains unmatched
    + leverage (int, optional) - Leverage, as a fraction of 5040
        + Default: `5040`
    + target_value: `1000` (int, optional) - Target value for Equal/NotEqual bet
        + Default: `None`
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff0322020000000000001976a914bce6191bf2fd5981313cae869e9fafe164f7dbaf88ac0000000000000000316a2f0d1e454cefefcbe14dffa4c01ecd608ec45d2594e5d27c699f4ef2725648c509bf828ec195ee18f83e052061236deff2db0306000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "feed_address": "1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev",
                    "bet_type": 2,
                    "deadline": 3000000000,
                    "wager_quantity": 1000,
                    "counterwager_quantity": 1000,
                    "target_value": 1000,
                    "leverage": 5040,
                    "expiration": 100
                },
                "name": "bet"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Broadcast [GET `/addresses/{address}/compose/broadcast`]

Composes a transaction to broadcast textual and numerical information to the network.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will be sending (must have the necessary quantity of the specified asset)
    + timestamp: `4003903983` (int, required) - The timestamp of the broadcast, in Unix time
    + value: `100` (float, required) - Numerical value of the broadcast
    + fee_fraction: `0.05` (float, required) - How much of every bet on this feed should go to its operator; a fraction of 1, (i.e. 0.05 is five percent)
    + text: `"Hello, world!"` (str, required) - The textual part of the broadcast
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff0200000000000000002b6a290d1e454cefefcbe17b1100cb21d3398ec45d2594e5d1d822df41d03a332741261ce2f9aee7827cd91c340c0406000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "timestamp": 4003903983,
                    "value": 100.0,
                    "fee_fraction": 0.05,
                    "text": "\"Hello, world!\""
                },
                "name": "broadcast"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose BTCPay [GET `/addresses/{address}/compose/btcpay`]

Composes a transaction to pay for a BTC order match.

+ Parameters
    + address: `bc1qsteve3tfxfg9pcmvzw645sr9zy7es5rx645p6l` (str, required) - The address that will be sending the payment
    + order_match_id: `e470416a9500fb046835192da013f48e6468a07dba1bede4a0b68e666ed23c8d_4953bde3d9417b103615c2d3d4b284d4fcf7cbd820e5dd19ac0084e9ebd090b2` (str, required) - The ID of the order match to pay for
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "0200000000010161101e1990879ee64168cce92c9caf338bb571e9cb246b1c2ab87124b95091900200000016001482f2ccc569325050e36c13b55a4065113d985066ffffffff0383c3040000000000160014a9943f67bcd30331d5a4ec6d902cbe03789a1b9700000000000000004b6a49aae396d448ed266a7785be1f6fcfa38dbe3e6e043e3d67691f678d6aa3b30e423f66ffad71eaf3231ef8f05dd5cc2f5b1ea14d33274b9cddacca5bd816a1ce6d5b4d498eb66a981db7add758000000000016001482f2ccc569325050e36c13b55a4065113d98506602000000000000",
                "params": {
                    "source": "bc1qsteve3tfxfg9pcmvzw645sr9zy7es5rx645p6l",
                    "order_match_id": "e470416a9500fb046835192da013f48e6468a07dba1bede4a0b68e666ed23c8d_4953bde3d9417b103615c2d3d4b284d4fcf7cbd820e5dd19ac0084e9ebd090b2"
                },
                "name": "btcpay"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Burn [GET `/addresses/{address}/compose/burn`]

Composes a transaction to burn a given quantity of BTC for XCP (on mainnet, possible between blocks 278310 and 283810; on testnet it is still available).

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address with the BTC to burn
    + quantity: `1000` (int, required) - The quantities of BTC to burn (1 BTC maximum burn per address)
    + overburn (bool, optional) - Whether to allow the burn to exceed 1 BTC for the address
        + Default: `False`
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff02e8030000000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ace61b0406000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "quantity": 1000,
                    "overburn": false
                },
                "name": "burn"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Cancel [GET `/addresses/{address}/compose/cancel`]

Composes a transaction to cancel an open order or bet.

+ Parameters
    + address: `15e15ua6A3FJqjMevtrWcFSzKn9k6bMQeA` (str, required) - The address that placed the order/bet to be cancelled
    + offer_hash: `8ce3335391bf71f8f12c0573b4f85b9adc4882a9955d9f8e5ababfdd0060279a` (str, required) - The hash of the order/bet to be cancelled
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000014709bd6af5d4d7f518f80539d4fe9acd5220a520a7b4287416a7379af9e66154020000001976a91432dff6deb7ca3bbc14f7037fa6ef8a8cf8e39fb988acffffffff0200000000000000002b6a292f3720d2b8ae7343c6d0456802c531e1216f466ceb12b96c6fbe417a97291a0660e51fc47fcc1ee1a878667900000000001976a91432dff6deb7ca3bbc14f7037fa6ef8a8cf8e39fb988ac00000000",
                "params": {
                    "source": "15e15ua6A3FJqjMevtrWcFSzKn9k6bMQeA",
                    "offer_hash": "8ce3335391bf71f8f12c0573b4f85b9adc4882a9955d9f8e5ababfdd0060279a"
                },
                "name": "cancel"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Destroy [GET `/addresses/{address}/compose/destroy`]

Composes a transaction to destroy a quantity of an asset.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will be sending the asset to be destroyed
    + asset: `XCP` (str, required) - The asset to be destroyed
    + quantity: `1000` (int, required) - The quantity of the asset to be destroyed
    + tag: `"bugs!"` (str, required) - A tag for the destruction
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff020000000000000000226a200d1e454cefefcbe10bffa672ce93608ec55d2594e5d1946a776c900731380c6b94160406000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "asset": "XCP",
                    "quantity": 1000,
                    "tag": "\"bugs!\""
                },
                "name": "destroy"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Dispenser [GET `/addresses/{address}/compose/dispenser`]

Opens or closes a dispenser for a given asset at a given rate of main chain asset (BTC). Escrowed quantity on open must be equal or greater than give_quantity. It is suggested that you escrow multiples of give_quantity to ease dispenser operation.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will be dispensing (must have the necessary escrow_quantity of the specified asset)
    + asset: `XCP` (str, required) - The asset or subasset to dispense
    + give_quantity: `1000` (int, required) - The quantity of the asset to dispense
    + escrow_quantity: `1000` (int, required) - The quantity of the asset to reserve for this dispenser
    + mainchainrate: `100` (int, required) - The quantity of the main chain asset (BTC) per dispensed portion
    + status: `0` (int, required) - The state of the dispenser. 0 for open, 1 for open using open_address, 10 for closed
    + open_address (str, optional) - The address that you would like to open the dispenser on
        + Default: `None`
    + oracle_address (str, optional) - The address that you would like to use as a price oracle for this dispenser
        + Default: `None`
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff0200000000000000002c6a2a0d1e454cefefcbe169ffa672ce93608ec55d2594e5d1946a774ef272564b2d4ad8c28ec195ee18f85a160c0b0406000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "asset": "XCP",
                    "give_quantity": 1000,
                    "escrow_quantity": 1000,
                    "mainchainrate": 100,
                    "status": 0,
                    "open_address": null,
                    "oracle_address": null
                },
                "name": "dispenser"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Dividend [GET `/addresses/{address}/compose/dividend`]

Composes a transaction to issue a dividend to holders of a given asset.

+ Parameters
    + address: `1GQhaWqejcGJ4GhQar7SjcCfadxvf5DNBD` (str, required) - The address that will be issuing the dividend (must have the ownership of the asset which the dividend is being issued on)
    + quantity_per_unit: `1` (int, required) - The amount of dividend_asset rewarded
    + asset: `PEPECASH` (str, required) - The asset or subasset that the dividends are being rewarded on
    + dividend_asset: `XCP` (str, required) - The asset or subasset that the dividends are paid in
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000010af94458ae5aa794c49cd27f7b800a7c68c8dd4f59ff66c99db4e9e353c06d93010000001976a914a9055398b92818794b38b15794096f752167e25f88acffffffff020000000000000000236a21068a00268d252c3a8ed0bddb5ef79f823894aa7de1e196c005510f4d787c936a979b230000000000001976a914a9055398b92818794b38b15794096f752167e25f88ac00000000",
                "params": {
                    "source": "1GQhaWqejcGJ4GhQar7SjcCfadxvf5DNBD",
                    "quantity_per_unit": 1,
                    "asset": "PEPECASH",
                    "dividend_asset": "XCP"
                },
                "name": "dividend"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Issuance [GET `/addresses/{address}/compose/issuance`]

Composes a transaction to Issue a new asset, issue more of an existing asset, lock an asset, reset existing supply, or transfer the ownership of an asset.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will be issuing or transfering the asset
    + asset: `XCPTEST` (str, required) - The assets to issue or transfer. This can also be a subasset longname for new subasset issuances
    + quantity: `1000` (int, required) - The quantity of the asset to issue (set to 0 if transferring an asset)
    + transfer_destination: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, optional) - The address to receive the asset
        + Default: `None`
    + divisible (bool, optional) - Whether this asset is divisible or not (if a transfer, this value must match the value specified when the asset was originally issued)
        + Default: `True`
    + lock (bool, optional) - Whether this issuance should lock supply of this asset forever
        + Default: `False`
    + reset (bool, optional) - Wether this issuance should reset any existing supply
        + Default: `False`
    + description (str, optional) - A textual description for the asset
        + Default: `None`
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff0322020000000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac0000000000000000236a210d1e454cefefcbe173ffa672cf3a36751b5d2594e5d1946a774ff272960578057c17ec0306000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "asset": "XCPTEST",
                    "quantity": 1000,
                    "transfer_destination": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "divisible": true,
                    "lock": false,
                    "reset": false,
                    "description": null
                },
                "name": "issuance"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose MPMA [GET `/addresses/{address}/compose/mpma`]

Composes a transaction to send multiple payments to multiple addresses.

+ Parameters
    + address: `1Fv87qmdtjQDP9d4p9E5ncBQvYB4a3Rhy6` (str, required) - The address that will be sending (must have the necessary quantity of the specified asset)
    + assets: `BAABAABLKSHP,BADHAIRDAY,BADWOJAK` (str, required) - comma-separated list of assets to send
    + destinations: `1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev,1GQhaWqejcGJ4GhQar7SjcCfadxvf5DNBD,1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs` (str, required) - comma-separated list of addresses to send to
    + quantities: `1,2,3` (str, required) - comma-separated list of quantities to send
    + memo: `"Hello, world!"` (str, required) - The Memo associated with this transaction
    + memo_is_hex: `False` (bool, required) - Whether the memo field is a hexadecimal string
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "0100000001fc9b7b3a0552bdfc3c62096e9d7669fb72d5482c7b4f9618138fdffdc831d60b000000001976a914a39dbfab6f1da182af53a4d14799ee545a6176be88acffffffff04e80300000000000069512103ce014780415d0eafbdadfacfa0cf2604a005a87157042f277627c952eedcbb1f2103abf2b72459ee70e6240a7b2ade1a6fa41c7f38cc1db5e63c6f92c01b859017ee2102e849a65234e77627daab722dd75aee7a8f35981ec1dbd5ec5ee7220075b2cd2d53aee80300000000000069512102ce014780415d0eafbd2fcbf00e308d420b59df89ebba83369fea96a9a06fcf562102373ec5e1389ccadf0a972ec451f8aea015104ded7a57b936d374d0ecfe8067412102e849a65234e77627daab722dd75aee7a8f35981ec1dbd5ec5ee7220075b2cd2d53aee80300000000000069512103d0014780415d0eafbd76dacca0b613dda4b8f37e3015031f11220ac5cf43ef4e21034051b78cdcbde85f0c120261e6ab383015104ded7a57b93cd374d900776d4e132102e849a65234e77627daab722dd75aee7a8f35981ec1dbd5ec5ee7220075b2cd2d53ae22fd0200000000001976a914a39dbfab6f1da182af53a4d14799ee545a6176be88ac00000000",
                "params": {
                    "source": "1Fv87qmdtjQDP9d4p9E5ncBQvYB4a3Rhy6",
                    "asset_dest_quant_list": [
                        [
                            "BAABAABLKSHP",
                            "1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev",
                            1
                        ],
                        [
                            "BADHAIRDAY",
                            "1GQhaWqejcGJ4GhQar7SjcCfadxvf5DNBD",
                            2
                        ],
                        [
                            "BADWOJAK",
                            "1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs",
                            3
                        ]
                    ],
                    "memo": "\"Hello, world!\"",
                    "memo_is_hex": false
                },
                "name": "mpma"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Order [GET `/addresses/{address}/compose/order`]

Composes a transaction to place an order on the distributed exchange.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will be issuing the order request (must have the necessary quantity of the specified asset to give)
    + give_asset: `XCP` (str, required) - The asset that will be given in the trade
    + give_quantity: `1000` (int, required) - The quantity of the asset that will be given
    + get_asset: `PEPECASH` (str, required) - The asset that will be received in the trade
    + get_quantity: `1000` (int, required) - The quantity of the asset that will be received
    + expiration: `100` (int, required) - The number of blocks for which the order should be valid
    + fee_required: `100` (int, required) - The miners’ fee required to be paid by orders for them to match this one; in BTC; required only if buying BTC (may be zero, though)
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff020000000000000000356a330d1e454cefefcbe16fffa672ce93608ec55d2594e5d1946a774ef2724a2a4f457bc28ec195ee18fbd616f461236d8be718616dac000406000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "give_asset": "XCP",
                    "give_quantity": 1000,
                    "get_asset": "PEPECASH",
                    "get_quantity": 1000,
                    "expiration": 100,
                    "fee_required": 100
                },
                "name": "order"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Send [GET `/addresses/{address}/compose/send`]

Composes a transaction to send a quantity of an asset to another address.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will be sending (must have the necessary quantity of the specified asset)
    + destination: `1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev` (str, required) - The address that will be receiving the asset
    + asset: `XCP` (str, required) - The asset or subasset to send
    + quantity: `1000` (int, required) - The quantity of the asset to send
    + memo (str, optional) - The Memo associated with this transaction
        + Default: `None`
    + memo_is_hex (bool, optional) - Whether the memo field is a hexadecimal string
        + Default: `False`
    + use_enhanced_send (bool, optional) - If this is false, the construct a legacy transaction sending bitcoin dust
        + Default: `True`
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff020000000000000000306a2e0d1e454cefefcbe167ffa672ce93608ec55d2594e5d1946a774e4e944f50dfb46943bffd3b68866791f7f496f8c270060406000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "destination": "1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev",
                    "asset": "XCP",
                    "quantity": 1000,
                    "memo": null,
                    "memo_is_hex": false,
                    "use_enhanced_send": true
                },
                "name": "send"
            }
        }
    ```


**Notes about optional parameter `encoding`.**

By default the default value of the `encoding` parameter detailed above is `auto`, which means that `counterparty-server` automatically determines the best way to encode the Counterparty protocol data into a new transaction. If you know what you are doing and would like to explicitly specify an encoding:

- To return the transaction as an **OP_RETURN** transaction, specify `opreturn` for the `encoding` parameter.
   - **OP_RETURN** transactions cannot have more than 80 bytes of data. If you force OP_RETURN encoding and your transaction would have more than this amount, an exception will be generated.
- To return the transaction as a **multisig** transaction, specify `multisig` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
    - Note that with the newest versions of Bitcoin (0.12.1 onward), bare multisig encoding does not reliably propagate. More information on this is documented [here](https://github.com/rubensayshi/counterparty-core/pull/9).
- To return the transaction as a **pubkeyhash** transaction, specify `pubkeyhash` for the `encoding` parameter.
    - `pubkey` should be set to the hex-encoded public key of the source address.
- To return the transaction as a 2 part **P2SH** transaction, specify `P2SH` for the encoding parameter.
    - First call the `create_` method with the `encoding` set to `P2SH`.
    - Sign the transaction as usual and broadcast it. It's recommended but not required to wait the transaction to confirm as malleability is an issue here (P2SH isn't yet supported on segwit addresses).
    - The resulting `txid` must be passed again on an identic call to the `create_` method, but now passing an additional parameter `p2sh_pretx_txid` with the value of the previous transaction's id.
    - The resulting transaction is a `P2SH` encoded message, using the redeem script on the transaction inputs as data carrying mechanism.
    - Sign the transaction following the `Bitcoinjs-lib on javascript, signing a P2SH redeeming transaction` section
    - **NOTE**: Don't leave pretxs hanging without transmitting the second transaction as this pollutes the UTXO set and risks making bitcoin harder to run on low spec nodes.


### Compose Sweep [GET `/addresses/{address}/compose/sweep`]

Composes a transaction to Sends all assets and/or transfer ownerships to a destination address.

+ Parameters
    + address: `1CounterpartyXXXXXXXXXXXXXXXUWLpVr` (str, required) - The address that will be sending
    + destination: `1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev` (str, required) - The address to receive the assets and/or ownerships
    + flags: `7` (int, required) - An OR mask of flags indicating how the sweep should be processed. Possible flags are: - FLAG_BALANCES: (integer) 1, specifies that all balances should be transferred. - FLAG_OWNERSHIP: (integer) 2, specifies that all ownerships should be transferred. - FLAG_BINARY_MEMO: (integer) 4, specifies that the memo is in binary/hex form.
    + memo: `FFFF` (str, required) - The Memo associated with this transaction in hex format
    + encoding (str, optional) - The encoding method to use
        + Default: `auto`
    + fee_per_kb (int, optional) - The fee per kilobyte of transaction data constant that the server uses when deciding on the dynamic fee to use (in satoshis)
        + Default: `None`
    + regular_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each non-(bare) multisig output.
        + Default: `546`
    + multisig_dust_size (int, optional) - Specify (in satoshis) to override the (dust) amount of BTC used for each (bare) multisig output
        + Default: `1000`
    + pubkey (str, optional) - The hexadecimal public key of the source address (or a list of the keys, if multi-sig). Required when using encoding parameter values of multisig or pubkeyhash.
        + Default: `None`
    + allow_unconfirmed_inputs (bool, optional) - Set to true to allow this transaction to utilize unconfirmed UTXOs as inputs
        + Default: `False`
    + fee (int, optional) - If you'd like to specify a custom miners' fee, specify it here (in satoshis). Leave as default for the server to automatically choose
        + Default: `None`
    + fee_provided (int, optional) - If you would like to specify a maximum fee (up to and including which may be used as the transaction fee), specify it here (in satoshis). This differs from fee in that this is an upper bound value, which fee is an exact value
        + Default: `0`
    + unspent_tx_hash (str, optional) - When compiling the UTXOs to use as inputs for the transaction being created, only consider unspent outputs from this specific transaction hash. Defaults to null to consider all UTXOs for the address. Do not use this parameter if you are specifying custom_inputs
        + Default: `None`
    + dust_return_pubkey (str, optional) - The dust return pubkey is used in multi-sig data outputs (as the only real pubkey) to make those the outputs spendable. By default, this pubkey is taken from the pubkey used in the first transaction input. However, it can be overridden here (and is required to be specified if a P2SH input is used and multisig is used as the data output encoding.) If specified, specify the public key (in hex format) where dust will be returned to so that it can be reclaimed. Only valid/useful when used with transactions that utilize multisig data encoding. Note that if this value is set to false, this instructs counterparty-server to use the default dust return pubkey configured at the node level. If this default is not set at the node level, the call will generate an exception
        + Default: `None`
    + disable_utxo_locks (bool, optional) - By default, UTXOs utilized when creating a transaction are 'locked' for a few seconds, to prevent a case where rapidly generating create_ calls reuse UTXOs due to their spent status not being updated in bitcoind yet. Specify true for this parameter to disable this behavior, and not temporarily lock UTXOs
        + Default: `False`
    + extended_tx_info (bool, optional) - When this is not specified or false, the create_ calls return only a hex-encoded string. If this is true, the create_ calls return a data object with the following keys: tx_hex, btc_in, btc_out, btc_change, and btc_fee
        + Default: `False`
    + p2sh_pretx_txid (str, optional) - The previous transaction txid for a two part P2SH message. This txid must be taken from the signed transaction
        + Default: `None`
    + segwit (bool, optional) - Use segwit
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "rawtransaction": "01000000017004c1186a4a6a11708e1739839488180dbb6dbf4a9bf52228faa5b3173cdb05000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188acffffffff020000000000000000236a210d1e454cefefcbe161ff1a94d78892739ddc14a84b570af630af96858de42ab6cf6e150406000000001976a914818895f3dc2c178629d3d2d8fa3ec4a3f817982188ac00000000",
                "params": {
                    "source": "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
                    "destination": "1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev",
                    "flags": 7,
                    "memo": "FFFF"
                },
                "name": "sweep"
            }
        }
    ```

## Group Assets

### Get Valid Assets [GET `/assets`]

Returns the valid assets

+ Parameters
    + offset: `0` (int, optional) - The offset of the assets to return
        + Default: `0`
    + limit: `5` (int, optional) - The limit of the assets to return
        + Default: `100`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "asset": "A100000000000000000",
                    "asset_longname": null
                },
                {
                    "asset": "A1000000000000000000",
                    "asset_longname": null
                },
                {
                    "asset": "A10000000000000000000",
                    "asset_longname": null
                },
                {
                    "asset": "A10000000000000000001",
                    "asset_longname": null
                },
                {
                    "asset": "A10000000000000000002",
                    "asset_longname": null
                }
            ]
        }
    ```

### Get Asset Info [GET `/assets/{asset}`]

Returns the asset information

+ Parameters
    + asset: `UNNEGOTIABLE` (str, required) - The asset to return

+ Response 200 (application/json)

    ```
        {
            "result": {
                "asset": "UNNEGOTIABLE",
                "asset_longname": null,
                "owner": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                "divisible": false,
                "locked": false,
                "supply": 1,
                "description": "UNNEGOTIABLE WE MUST BECOME UNNEGOTIABLE WE ARE",
                "issuer": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                "holder_count": 1
            }
        }
    ```

### Get Asset Balances [GET `/assets/{asset}/balances`]

Returns the asset balances

+ Parameters
    + asset: `UNNEGOTIABLE` (str, required) - The asset to return
    + exclude_zero_balances: `True` (bool, optional) - Whether to exclude zero balances
        + Default: `True`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "address": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "asset": "UNNEGOTIABLE",
                    "quantity": 1
                }
            ]
        }
    ```

### Get Balance By Address And Asset [GET `/assets/{asset}/balances/{address}`]

Returns the balance of an address and asset

+ Parameters
    + address: `1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs` (str, required) - The address to return
    + asset: `XCP` (str, required) - The asset to return

+ Response 200 (application/json)

    ```
        {
            "result": {
                "address": "1C3uGcoSGzKVgFqyZ3kM2DBq9CYttTMAVs",
                "asset": "XCP",
                "quantity": 104200000000
            }
        }
    ```

### Get Orders By Asset [GET `/assets/{asset}/orders`]

Returns the orders of an asset

+ Parameters
    + asset: `NEEDPEPE` (str, required) - The asset to return
    + status: `filled` (str, optional) - The status of the orders to return
        + Default: `open`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 825373,
                    "tx_hash": "0129611a0aece52adddf6d929e75c703baa9cdcb7e4ce887aa859f9640aa9640",
                    "block_index": 455461,
                    "source": "1Fpx9NPBJsRbx6RXkvfZ3n1iCYj7n7VaJR",
                    "give_asset": "NEEDPEPE",
                    "give_quantity": 1,
                    "give_remaining": 0,
                    "get_asset": "PEPECASH",
                    "get_quantity": 400000000000,
                    "get_remaining": 0,
                    "expiration": 1000,
                    "expire_index": 456457,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 46098,
                    "fee_provided_remaining": 46098,
                    "status": "filled"
                },
                {
                    "tx_index": 2225134,
                    "tx_hash": "5b6e0c741d765ebd883dc16eecfb5c340c52865cabf297ca2c1432437c1348b7",
                    "block_index": 772817,
                    "source": "1FnM7akSCD8G3fRQHCUEXRCfL35gptsPZB",
                    "give_asset": "NEEDPEPE",
                    "give_quantity": 1,
                    "give_remaining": 0,
                    "get_asset": "XCP",
                    "get_quantity": 80800000000,
                    "get_remaining": 0,
                    "expiration": 5000,
                    "expire_index": 777817,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 5544,
                    "fee_provided_remaining": 5544,
                    "status": "filled"
                },
                {
                    "tx_index": 1946026,
                    "tx_hash": "75dc6ee1f67317e674ef33b617d3a9839ee53bf4a2e8274c88d6202d4d89b59a",
                    "block_index": 727444,
                    "source": "1GotRejB6XsGgMsM79TvcypeanDJRJbMtg",
                    "give_asset": "NEEDPEPE",
                    "give_quantity": 1,
                    "give_remaining": 0,
                    "get_asset": "XCP",
                    "get_quantity": 70000000000,
                    "get_remaining": 0,
                    "expiration": 5000,
                    "expire_index": 732381,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 264,
                    "fee_provided_remaining": 264,
                    "status": "filled"
                },
                {
                    "tx_index": 2202451,
                    "tx_hash": "77f568fc6604dbe209d2ea1b0158d7de20723c0178107eb570f4f2a719b0d7c7",
                    "block_index": 772817,
                    "source": "184gKLQTtQU29LXbxbYJkUV4if9SmW6v2d",
                    "give_asset": "XCP",
                    "give_quantity": 80800000000,
                    "give_remaining": 0,
                    "get_asset": "NEEDPEPE",
                    "get_quantity": 1,
                    "get_remaining": 0,
                    "expiration": 5000,
                    "expire_index": 773300,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 264,
                    "fee_provided_remaining": 264,
                    "status": "filled"
                },
                {
                    "tx_index": 825411,
                    "tx_hash": "7b2369f40078f4d98a3d3a7733315a1c4efd7977c75f7066dd447d5c7eed7f20",
                    "block_index": 455461,
                    "source": "18cmgoX99Nrm411YKpmTQsp23qczWdxS6w",
                    "give_asset": "PEPECASH",
                    "give_quantity": 300000000000,
                    "give_remaining": 0,
                    "get_asset": "NEEDPEPE",
                    "get_quantity": 1,
                    "get_remaining": 0,
                    "expiration": 5000,
                    "expire_index": 460461,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 40000,
                    "fee_provided_remaining": 40000,
                    "status": "filled"
                },
                {
                    "tx_index": 825403,
                    "tx_hash": "7e1abf6ad57eb61227015fc7a333da034b4dd2f1c4e23cf106864b60a20feef7",
                    "block_index": 455460,
                    "source": "18cmgoX99Nrm411YKpmTQsp23qczWdxS6w",
                    "give_asset": "PEPECASH",
                    "give_quantity": 200000000000,
                    "give_remaining": 0,
                    "get_asset": "NEEDPEPE",
                    "get_quantity": 1,
                    "get_remaining": 0,
                    "expiration": 1000,
                    "expire_index": 456460,
                    "fee_required": 20000,
                    "fee_required_remaining": 20000,
                    "fee_provided": 50766,
                    "fee_provided_remaining": 50766,
                    "status": "filled"
                },
                {
                    "tx_index": 825370,
                    "tx_hash": "8e4d324407b62de773af53f8f7a556882ac82a217c216491a28072f293918fe6",
                    "block_index": 455457,
                    "source": "1Fpx9NPBJsRbx6RXkvfZ3n1iCYj7n7VaJR",
                    "give_asset": "NEEDPEPE",
                    "give_quantity": 1,
                    "give_remaining": 0,
                    "get_asset": "PEPECASH",
                    "get_quantity": 100000000000,
                    "get_remaining": -1100000000,
                    "expiration": 1000,
                    "expire_index": 456457,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 75791,
                    "fee_provided_remaining": 75791,
                    "status": "filled"
                },
                {
                    "tx_index": 825413,
                    "tx_hash": "927878fa98edb6d24310c45254c324f3d5a7f625e2a3a0e7fd1e749b49493750",
                    "block_index": 455461,
                    "source": "18cmgoX99Nrm411YKpmTQsp23qczWdxS6w",
                    "give_asset": "PEPECASH",
                    "give_quantity": 400000000000,
                    "give_remaining": 0,
                    "get_asset": "NEEDPEPE",
                    "get_quantity": 1,
                    "get_remaining": 0,
                    "expiration": 5000,
                    "expire_index": 460461,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 40000,
                    "fee_provided_remaining": 40000,
                    "status": "filled"
                },
                {
                    "tx_index": 1946587,
                    "tx_hash": "b747f290cbbad6faa1c1c05d5c6d001b5a3ef487027bb0d4eefcdc9f6e865c39",
                    "block_index": 727444,
                    "source": "1AtcSh7uxenQ6AR5xqr6agAegWRUF5N4uh",
                    "give_asset": "XCP",
                    "give_quantity": 70000000000,
                    "give_remaining": 0,
                    "get_asset": "NEEDPEPE",
                    "get_quantity": 1,
                    "get_remaining": 0,
                    "expiration": 5000,
                    "expire_index": 732444,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 792,
                    "fee_provided_remaining": 792,
                    "status": "filled"
                },
                {
                    "tx_index": 825371,
                    "tx_hash": "b83c96217214decb6316c3619bc88a3471d17e46eb3708406c8f878dedd61610",
                    "block_index": 455460,
                    "source": "1Fpx9NPBJsRbx6RXkvfZ3n1iCYj7n7VaJR",
                    "give_asset": "NEEDPEPE",
                    "give_quantity": 1,
                    "give_remaining": 0,
                    "get_asset": "PEPECASH",
                    "get_quantity": 200000000000,
                    "get_remaining": 0,
                    "expiration": 1000,
                    "expire_index": 456457,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 46098,
                    "fee_provided_remaining": 46098,
                    "status": "filled"
                },
                {
                    "tx_index": 825372,
                    "tx_hash": "e32154f8ade796df0b121604de140703d062d22d1e82e77e629e6096668c812f",
                    "block_index": 455461,
                    "source": "1Fpx9NPBJsRbx6RXkvfZ3n1iCYj7n7VaJR",
                    "give_asset": "NEEDPEPE",
                    "give_quantity": 1,
                    "give_remaining": 0,
                    "get_asset": "PEPECASH",
                    "get_quantity": 300000000000,
                    "get_remaining": 0,
                    "expiration": 1000,
                    "expire_index": 456457,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 46098,
                    "fee_provided_remaining": 46098,
                    "status": "filled"
                }
            ]
        }
    ```

### Get Credits By Asset [GET `/assets/{asset}/credits`]

Returns the credits of an asset

+ Parameters
    + asset: `UNNEGOTIABLE` (str, required) - The asset to return
    + limit: `5` (int, optional) - The maximum number of credits to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the credits to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "block_index": 840464,
                    "address": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "asset": "UNNEGOTIABLE",
                    "quantity": 1,
                    "calling_function": "issuance",
                    "event": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                    "tx_index": 2726605
                }
            ]
        }
    ```

### Get Debits By Asset [GET `/assets/{asset}/debits`]

Returns the debits of an asset

+ Parameters
    + asset: `XCP` (str, required) - The asset to return
    + limit: `5` (int, optional) - The maximum number of debits to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the debits to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "block_index": 280091,
                    "address": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1000000000,
                    "action": "send",
                    "event": "1c20d6596f6be031c94def5ad93a52217d76371885adcc53c91c3b1eaf76ccce",
                    "tx_index": 729
                },
                {
                    "block_index": 280112,
                    "address": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1100000000,
                    "action": "send",
                    "event": "4dacd03d73cb497229dbfe2e7209adc4221540efe0e4c57f408b09b2fd36ece6",
                    "tx_index": 749
                },
                {
                    "block_index": 280112,
                    "address": "1PMacKVWDszkBRbb2iWWvX63BwhKUTsSBd",
                    "asset": "XCP",
                    "quantity": 100000000,
                    "action": "send",
                    "event": "057d10cc33455f4f7af44d2f030b3866e3a16416ecf984e304c76abe98393c1d",
                    "tx_index": 752
                },
                {
                    "block_index": 280114,
                    "address": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1100000000,
                    "action": "send",
                    "event": "3ac6ea5b329832e2dc31ead6c5277beccb7d95f0d9f20f256f97067223c81e00",
                    "tx_index": 755
                },
                {
                    "block_index": 280156,
                    "address": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1100000000,
                    "action": "send",
                    "event": "66fc1409ac6646bd8c267de89c57d2204e31bb6dfce9ee2a3ab18416fadf9e9c",
                    "tx_index": 766
                }
            ]
        }
    ```

### Get Dividends [GET `/assets/{asset}/dividends`]

Returns the dividends of an asset

+ Parameters
    + asset: `GMONEYPEPE` (str, required) - The asset to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 1914456,
                    "tx_hash": "30760e413947ebdc80ed7a5ada1bd4466800b87e9976bbe811ad4e2b46546359",
                    "block_index": 724381,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "ENDTHEFED",
                    "quantity_per_unit": 1,
                    "fee_paid": 2520000,
                    "status": "valid"
                },
                {
                    "tx_index": 1915246,
                    "tx_hash": "827794cbab3299f80a5b8b8cb8ec29ec3aee1373f7da2c05a156bed902bf4684",
                    "block_index": 724479,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "TRUMPDANCING",
                    "quantity_per_unit": 100,
                    "fee_paid": 2520000,
                    "status": "valid"
                },
                {
                    "tx_index": 1920208,
                    "tx_hash": "7014f1e259531ba9632ca5000c35df5bd47f237318e48955900453ce9c07e917",
                    "block_index": 724931,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "CTRWOJACK",
                    "quantity_per_unit": 1111,
                    "fee_paid": 2700000,
                    "status": "valid"
                },
                {
                    "tx_index": 1927909,
                    "tx_hash": "5556fd2b0802cf3bc0abd5001ecbac3adbc5b7c5c46a145a78daeef358c308de",
                    "block_index": 725654,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "WHITERUSSIAN",
                    "quantity_per_unit": 1,
                    "fee_paid": 3220000,
                    "status": "valid"
                },
                {
                    "tx_index": 1983693,
                    "tx_hash": "cda646285cc63f758d19b5403070f23e2a6e4b34eb3b86b63a0f56f971345657",
                    "block_index": 730568,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "A4520591452211866149",
                    "quantity_per_unit": 1,
                    "fee_paid": 4040000,
                    "status": "valid"
                },
                {
                    "tx_index": 1983842,
                    "tx_hash": "e4b73dc974cc279b873b78e5dc4a347c08788b02143ae27aa0582f900289be10",
                    "block_index": 730588,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "NCSWIC",
                    "quantity_per_unit": 1,
                    "fee_paid": 4040000,
                    "status": "valid"
                },
                {
                    "tx_index": 1996395,
                    "tx_hash": "b342feb1421df107010ad3c8ee2043ded802bdf6cd619862459da3d0f87d6a99",
                    "block_index": 731994,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "FUCKTHEFED",
                    "quantity_per_unit": 1,
                    "fee_paid": 4380000,
                    "status": "valid"
                },
                {
                    "tx_index": 2035947,
                    "tx_hash": "02d715fd9e8b7bbc782b1b2d92a1b9ffae9326bfc88ba76c453c515ad7c8c2bc",
                    "block_index": 738763,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "HOLDTHELINE",
                    "quantity_per_unit": 1,
                    "fee_paid": 4940000,
                    "status": "valid"
                },
                {
                    "tx_index": 2174481,
                    "tx_hash": "b935a06fc34d8fa4f0c526984085b1b12c78e899415e595b625f1bee84ce3709",
                    "block_index": 762733,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "EOXIXIZERO",
                    "quantity_per_unit": 1,
                    "fee_paid": 6500000,
                    "status": "valid"
                },
                {
                    "tx_index": 2198534,
                    "tx_hash": "a063e9a745b9f6bc3201f72abff196de20ec106bcc71d820673d516ddbb3aa90",
                    "block_index": 767569,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "TRUMPCARDS",
                    "quantity_per_unit": 1,
                    "fee_paid": 6660000,
                    "status": "valid"
                },
                {
                    "tx_index": 2704948,
                    "tx_hash": "437102ca4698f63a12e369f6168e3c7f5f8eef3e225395d515775673e33d39c1",
                    "block_index": 832745,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "FUCKYOUWAR",
                    "quantity_per_unit": 1,
                    "fee_paid": 6840000,
                    "status": "valid"
                },
                {
                    "tx_index": 2704949,
                    "tx_hash": "7d3807cc58fa2d9751b2b0089bfa8fa86ef795821be6d8e9418ab3a819eba299",
                    "block_index": 832745,
                    "source": "1JJP986hdU9Qy9b49rafM9FoXdbz1Mgbjo",
                    "asset": "GMONEYPEPE",
                    "dividend_asset": "MEDICINEPEPE",
                    "quantity_per_unit": 1,
                    "fee_paid": 6840000,
                    "status": "valid"
                }
            ]
        }
    ```

### Get Issuances By Asset [GET `/assets/{asset}/issuances`]

Returns the issuances of an asset

+ Parameters
    + asset: `UNNEGOTIABLE` (str, required) - The asset to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726605,
                    "tx_hash": "876a6cfbd4aa22ba4fa85c2e1953a1c66649468a43a961ad16ea4d5329e3e4c5",
                    "msg_index": 0,
                    "block_index": 840464,
                    "asset": "UNNEGOTIABLE",
                    "quantity": 1,
                    "divisible": 0,
                    "source": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "issuer": "178etygrwEeeyQso9we85rUqYZbkiqzL4A",
                    "transfer": 0,
                    "callable": 0,
                    "call_date": 0,
                    "call_price": 0.0,
                    "description": "UNNEGOTIABLE WE MUST BECOME UNNEGOTIABLE WE ARE",
                    "fee_paid": 50000000,
                    "locked": 0,
                    "status": "valid",
                    "asset_longname": null,
                    "reset": 0
                }
            ]
        }
    ```

### Get Sends By Asset [GET `/assets/{asset}/sends`]

Returns the sends of an asset

+ Parameters
    + asset: `XCP` (str, required) - The asset to return
    + limit: `5` (int, optional) - The maximum number of sends to return
        + Default: `100`
    + offset: `0` (int, optional) - The offset of the sends to return
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 729,
                    "tx_hash": "1c20d6596f6be031c94def5ad93a52217d76371885adcc53c91c3b1eaf76ccce",
                    "block_index": 280091,
                    "source": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "destination": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1000000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                },
                {
                    "tx_index": 749,
                    "tx_hash": "4dacd03d73cb497229dbfe2e7209adc4221540efe0e4c57f408b09b2fd36ece6",
                    "block_index": 280112,
                    "source": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "destination": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1100000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                },
                {
                    "tx_index": 752,
                    "tx_hash": "057d10cc33455f4f7af44d2f030b3866e3a16416ecf984e304c76abe98393c1d",
                    "block_index": 280112,
                    "source": "1PMacKVWDszkBRbb2iWWvX63BwhKUTsSBd",
                    "destination": "1PMacKVWDszkBRbb2iWWvX63BwhKUTsSBd",
                    "asset": "XCP",
                    "quantity": 100000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                },
                {
                    "tx_index": 755,
                    "tx_hash": "3ac6ea5b329832e2dc31ead6c5277beccb7d95f0d9f20f256f97067223c81e00",
                    "block_index": 280114,
                    "source": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "destination": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1100000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                },
                {
                    "tx_index": 766,
                    "tx_hash": "66fc1409ac6646bd8c267de89c57d2204e31bb6dfce9ee2a3ab18416fadf9e9c",
                    "block_index": 280156,
                    "source": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "destination": "1Pcpxw6wJwXABhjCspe3CNf3gqSeh6eien",
                    "asset": "XCP",
                    "quantity": 1100000000,
                    "status": "valid",
                    "msg_index": 0,
                    "memo": null
                }
            ]
        }
    ```

### Get Dispensers By Asset [GET `/assets/{asset}/dispensers`]

Returns the dispensers of an asset

+ Parameters
    + asset: `ERYKAHPEPU` (str, required) - The asset to return
    + status (int, optional) - 
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726460,
                    "tx_hash": "b592d8ca4994d182e4ec63e1659dc4282b1a84466b7d71ed68c281ce63ed4897",
                    "block_index": 839964,
                    "source": "bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz",
                    "asset": "ERYKAHPEPU",
                    "give_quantity": 1,
                    "escrow_quantity": 25,
                    "satoshirate": 50000,
                    "status": 0,
                    "give_remaining": 25,
                    "oracle_address": null,
                    "last_status_tx_hash": null,
                    "origin": "1E6tyJ2zCyX74XgEK8t9iNMjxjNVLCGR1u",
                    "dispense_count": 0
                }
            ]
        }
    ```

### Get Dispensers By Address And Asset [GET `/assets/{asset}/dispensers/{address}`]

Returns the dispensers of an address and an asset

+ Parameters
    + address: `bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz` (str, required) - The address to return
    + asset: `ERYKAHPEPU` (str, required) - The asset to return
    + status (int, optional) - 
        + Default: `0`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2726460,
                    "tx_hash": "b592d8ca4994d182e4ec63e1659dc4282b1a84466b7d71ed68c281ce63ed4897",
                    "block_index": 839964,
                    "source": "bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz",
                    "asset": "ERYKAHPEPU",
                    "give_quantity": 1,
                    "escrow_quantity": 25,
                    "satoshirate": 50000,
                    "status": 0,
                    "give_remaining": 25,
                    "oracle_address": null,
                    "last_status_tx_hash": null,
                    "origin": "1E6tyJ2zCyX74XgEK8t9iNMjxjNVLCGR1u",
                    "dispense_count": 0
                }
            ]
        }
    ```

### Get Asset Holders [GET `/assets/{asset}/holders`]

Returns the holders of an asset

+ Parameters
    + asset: `ERYKAHPEPU` (str, required) - The asset to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "address": "1E6tyJ2zCyX74XgEK8t9iNMjxjNVLCGR1u",
                    "address_quantity": 63,
                    "escrow": null
                },
                {
                    "address": "16yRstRXStVJJ1TN2S4DCWifyrCsetpma7",
                    "address_quantity": 1,
                    "escrow": null
                },
                {
                    "address": "bc1qsvqsa9arwz30g2z0w09twzn8gz3380h36yxacs",
                    "address_quantity": 2,
                    "escrow": null
                },
                {
                    "address": "17PnWBjHkekZKQPVagmTR5HiD51pN8WHC8",
                    "address_quantity": 1,
                    "escrow": null
                },
                {
                    "address": "1FRxFpP9XoRsvZFVqGtt4fjjgKe1h5tbAh",
                    "address_quantity": 1,
                    "escrow": null
                },
                {
                    "address": "1AdHg2q3M2rMFRgZyZ7RQyNHdwjSib7wSZ",
                    "address_quantity": 2,
                    "escrow": null
                },
                {
                    "address": "1CTnziWXidHzY3qT8gwLa1ZxZK37A7HreR",
                    "address_quantity": 1,
                    "escrow": null
                },
                {
                    "address": "bc1qlzkcy8c5fa6y6xvd8zn4axnvmhndfhku3hmdpz",
                    "address_quantity": 25,
                    "escrow": null
                }
            ]
        }
    ```

## Group Orders

### Get Order [GET `/orders/{order_hash}`]

Returns the information of an order

+ Parameters
    + order_hash: `23f68fdf934e81144cca31ce8ef69062d553c521321a039166e7ba99aede0776` (str, required) - The hash of the transaction that created the order

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2724132,
                    "tx_hash": "23f68fdf934e81144cca31ce8ef69062d553c521321a039166e7ba99aede0776",
                    "block_index": 840381,
                    "source": "15L7U55PAsHLEpQkZqz62e3eqWd9AHb2DH",
                    "give_asset": "PEPECASH",
                    "give_quantity": 6966600000000,
                    "give_remaining": 900000000000,
                    "get_asset": "XCP",
                    "get_quantity": 11076894000,
                    "get_remaining": 1431000000,
                    "expiration": 5000,
                    "expire_index": 843055,
                    "fee_required": 0,
                    "fee_required_remaining": 0,
                    "fee_provided": 4488,
                    "fee_provided_remaining": 4488,
                    "status": "open"
                }
            ]
        }
    ```

### Get Order Matches By Order [GET `/orders/{order_hash}/matches`]

Returns the order matches of an order

+ Parameters
    + order_hash: `5461e6f99a37a7167428b4a720a52052cd9afed43905f818f5d7d4f56abd0947` (str, required) - The hash of the transaction that created the order
    + status: `completed` (str, optional) - The status of the order matches to return
        + Default: `pending`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "id": "23f68fdf934e81144cca31ce8ef69062d553c521321a039166e7ba99aede0776_5461e6f99a37a7167428b4a720a52052cd9afed43905f818f5d7d4f56abd0947",
                    "tx0_index": 2724132,
                    "tx0_hash": "23f68fdf934e81144cca31ce8ef69062d553c521321a039166e7ba99aede0776",
                    "tx0_address": "15L7U55PAsHLEpQkZqz62e3eqWd9AHb2DH",
                    "tx1_index": 2726591,
                    "tx1_hash": "5461e6f99a37a7167428b4a720a52052cd9afed43905f818f5d7d4f56abd0947",
                    "tx1_address": "15e15ua6A3FJqjMevtrWcFSzKn9k6bMQeA",
                    "forward_asset": "PEPECASH",
                    "forward_quantity": 6066600000000,
                    "backward_asset": "XCP",
                    "backward_quantity": 9645894000,
                    "tx0_block_index": 838055,
                    "tx1_block_index": 840381,
                    "block_index": 840381,
                    "tx0_expiration": 5000,
                    "tx1_expiration": 8064,
                    "match_expire_index": 840401,
                    "fee_paid": 0,
                    "status": "completed"
                }
            ]
        }
    ```

### Get BTCPays By Order [GET `/orders/{order_hash}/btcpays`]

Returns the BTC pays of an order

+ Parameters
    + order_hash: `299b5b648f54eacb839f3487232d49aea373cdd681b706d4cc0b5e0b03688db4` (str, required) - The hash of the transaction that created the order

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2719343,
                    "tx_hash": "6cfa7f31b43a46e5ad74a9db810bd6cac56235a8ebc73ec63d01b38ea7ea2414",
                    "block_index": 836188,
                    "source": "1NfJnJdAdmm2rJCFW54NsAKqqTTMexCNJ3",
                    "destination": "1BepkwAhEmEuEGF349XjmEUrRvoy9a7Biv",
                    "btc_amount": 4500000,
                    "order_match_id": "0a1387df82a8a7e9cec01c52c8fee01f6995c4e39dc5804e1d2bf40d9368f5c5_299b5b648f54eacb839f3487232d49aea373cdd681b706d4cc0b5e0b03688db4",
                    "status": "valid"
                }
            ]
        }
    ```

## Group Bets

### Get Bet [GET `/bets/{bet_hash}`]

Returns the information of a bet

+ Parameters
    + bet_hash: `5d097b4729cb74d927b4458d365beb811a26fcee7f8712f049ecbe780eb496ed` (str, required) - The hash of the transaction that created the bet

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 15106,
                    "tx_hash": "5d097b4729cb74d927b4458d365beb811a26fcee7f8712f049ecbe780eb496ed",
                    "block_index": 304063,
                    "source": "18ZNyaAcH4HugeofwbrpLoUNiayxJRH65c",
                    "feed_address": "1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "bet_type": 3,
                    "deadline": 1401828300,
                    "wager_quantity": 50000000,
                    "wager_remaining": 0,
                    "counterwager_quantity": 50000000,
                    "counterwager_remaining": 0,
                    "target_value": 1.0,
                    "leverage": 5040,
                    "expiration": 11,
                    "expire_index": 304073,
                    "fee_fraction_int": 1000000,
                    "status": "filled"
                }
            ]
        }
    ```

### Get Bet Matches By Bet [GET `/bets/{bet_hash}/matches`]

Returns the bet matches of a bet

+ Parameters
    + bet_hash: `5d097b4729cb74d927b4458d365beb811a26fcee7f8712f049ecbe780eb496ed` (str, required) - The hash of the transaction that created the bet
    + status: `expired` (str, optional) - The status of the bet matches
        + Default: `pending`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "id": "5d097b4729cb74d927b4458d365beb811a26fcee7f8712f049ecbe780eb496ed_cb5f888c299a50967d523513daed71636d927e6ef3dbda85feb11ff112ae4330",
                    "tx0_index": 15106,
                    "tx0_hash": "5d097b4729cb74d927b4458d365beb811a26fcee7f8712f049ecbe780eb496ed",
                    "tx0_address": "18ZNyaAcH4HugeofwbrpLoUNiayxJRH65c",
                    "tx1_index": 15108,
                    "tx1_hash": "cb5f888c299a50967d523513daed71636d927e6ef3dbda85feb11ff112ae4330",
                    "tx1_address": "1PTqJmRCMGs4qBEh2APAFSrBv95Uf1hfiD",
                    "tx0_bet_type": 3,
                    "tx1_bet_type": 2,
                    "feed_address": "1QKEpuxEmdp428KEBSDZAKL46noSXWJBkk",
                    "initial_value": -1,
                    "deadline": 1401828300,
                    "target_value": 1.0,
                    "leverage": 5040,
                    "forward_quantity": 50000000,
                    "backward_quantity": 50000000,
                    "tx0_block_index": 304062,
                    "tx1_block_index": 304063,
                    "block_index": 306379,
                    "tx0_expiration": 11,
                    "tx1_expiration": 1459,
                    "match_expire_index": 304073,
                    "fee_fraction_int": 1000000,
                    "status": "expired"
                }
            ]
        }
    ```

### Get Resolutions By Bet [GET `/bets/{bet_hash}/resolutions`]

Returns the resolutions of a bet

+ Parameters
    + bet_hash: `36bbbb7dbd85054dac140a8ad8204eda2ee859545528bd2a9da69ad77c277ace` (str, required) - The hash of the transaction that created the bet

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "bet_match_id": "36bbbb7dbd85054dac140a8ad8204eda2ee859545528bd2a9da69ad77c277ace_d70ee4e44f02fe6258ee0c267f33f304a0fc61d4ce424852f58c28967dc1924f",
                    "bet_match_type_id": 5,
                    "block_index": 401128,
                    "winner": "Equal",
                    "settled": null,
                    "bull_credit": null,
                    "bear_credit": null,
                    "escrow_less_fee": 2000000,
                    "fee": 0
                }
            ]
        }
    ```

## Group Burns

### Get All Burns [GET `/burns`]

Returns the burns

+ Parameters
    + status: `valid` (str, optional) - The status of the burns to return
        + Default: `valid`
    + offset: `10` (int, optional) - The offset of the burns to return
        + Default: `0`
    + limit: `5` (int, optional) - The limit of the burns to return
        + Default: `100`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 10,
                    "tx_hash": "41bbe1ec81da008a0e92758efb6084af3a6b6acf483983456ec797ee59c0e0f1",
                    "block_index": 278511,
                    "source": "12crRpZpn93PKTQ4WYxHMw4xi6ckh1CFR3",
                    "burned": 99900000,
                    "earned": 148024554545,
                    "status": "valid"
                },
                {
                    "tx_index": 11,
                    "tx_hash": "c403a92281b568c7d428d942354d026594dc54ae35c21f53ecf5c918208c45de",
                    "block_index": 278511,
                    "source": "13UXh9dBEhA48gJiegJNodqe91PK88f4pW",
                    "burned": 99900000,
                    "earned": 148024554545,
                    "status": "valid"
                },
                {
                    "tx_index": 12,
                    "tx_hash": "749ba1c2bd314f7b98e9cfb44575495b4ad2cf624901c65488fbc4f57a3dc0ac",
                    "block_index": 278511,
                    "source": "19Ht3rkW7JB9VuC7rsZEGZju96ujzchaZZ",
                    "burned": 99900000,
                    "earned": 148024554545,
                    "status": "valid"
                },
                {
                    "tx_index": 13,
                    "tx_hash": "da330160b71138f9bda5e126df0d5d6248c0879d88e16255c74135274d8ebd27",
                    "block_index": 278511,
                    "source": "16Fu8Edsvxqixg6VnaHKPWE2TEsqQMwXfV",
                    "burned": 99900000,
                    "earned": 148024554545,
                    "status": "valid"
                },
                {
                    "tx_index": 14,
                    "tx_hash": "66994176733650e77ae0cf34349f63e6538649f40f86d2719013d915bbb7701e",
                    "block_index": 278517,
                    "source": "14FFaRsfzYQxhZQv1YsMn65MvMLfJShgM8",
                    "burned": 99900000,
                    "earned": 147970063636,
                    "status": "valid"
                }
            ]
        }
    ```

## Group Dispensers

### Get Dispenser Info By Hash [GET `/dispensers/{dispenser_hash}`]

Returns the dispenser information by tx_hash

+ Parameters
    + dispenser_hash: `753787004d6e93e71f6e0aa1e0932cc74457d12276d53856424b2e4088cc542a` (str, required) - The hash of the dispenser to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2536311,
                    "tx_hash": "753787004d6e93e71f6e0aa1e0932cc74457d12276d53856424b2e4088cc542a",
                    "block_index": 840322,
                    "source": "bc1qq735dv8peps2ayr3qwwwdwylq4ddwcgrpyg9r2",
                    "asset": "FLOCK",
                    "give_quantity": 10000000000,
                    "escrow_quantity": 250000000000,
                    "satoshirate": 330000,
                    "status": 0,
                    "give_remaining": 140000000000,
                    "oracle_address": null,
                    "last_status_tx_hash": null,
                    "origin": "bc1qq735dv8peps2ayr3qwwwdwylq4ddwcgrpyg9r2",
                    "dispense_count": 2,
                    "asset_longname": null
                }
            ]
        }
    ```

### Get Dispenses By Dispenser [GET `/dispensers/{dispenser_hash}/dispenses`]

Returns the dispenses of a dispenser

+ Parameters
    + dispenser_hash: `753787004d6e93e71f6e0aa1e0932cc74457d12276d53856424b2e4088cc542a` (str, required) - The hash of the dispenser to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_index": 2610745,
                    "dispense_index": 0,
                    "tx_hash": "8c95cc6afc8fd466c784fd1c02749c585988999bbc66251b944c443dc31af757",
                    "block_index": 821450,
                    "source": "bc1qq735dv8peps2ayr3qwwwdwylq4ddwcgrpyg9r2",
                    "destination": "1FKYM1CP9RfttJhNG8HTNQdE2uV3YvwbRB",
                    "asset": "FLOCK",
                    "dispense_quantity": 20000000000,
                    "dispenser_tx_hash": "753787004d6e93e71f6e0aa1e0932cc74457d12276d53856424b2e4088cc542a"
                },
                {
                    "tx_index": 2726580,
                    "dispense_index": 0,
                    "tx_hash": "e7f0f2c9bef7a492b714a5952ec61b283be344419c5bc33f405f9af41ebfa48b",
                    "block_index": 840322,
                    "source": "bc1qq735dv8peps2ayr3qwwwdwylq4ddwcgrpyg9r2",
                    "destination": "bc1qzcdkhnexpjc8wvkyrpyrsn0f5xzcpu877mjmgj",
                    "asset": "FLOCK",
                    "dispense_quantity": 90000000000,
                    "dispenser_tx_hash": "753787004d6e93e71f6e0aa1e0932cc74457d12276d53856424b2e4088cc542a"
                }
            ]
        }
    ```

## Group Events

### Get All Events [GET `/events`]

Returns all events

+ Parameters
    + last: `10665092` (int, optional) - The last event index to return
        + Default: `None`
    + limit: `5` (int, optional) - The maximum number of events to return
        + Default: `100`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "event_index": 10665092,
                    "event": "TRANSACTION_PARSED",
                    "params": {
                        "supported": true,
                        "tx_hash": "7b39d3ebd9fe8293004a1a8b8eb2d01f1664e5d8b05e8cb94f30b1da2c2f9650",
                        "tx_index": 2056160
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665091,
                    "event": "ENHANCED_SEND",
                    "params": {
                        "asset": "THOTHPEPE",
                        "block_index": 744232,
                        "destination": "13re7J5Y5a8nZZSp8o1a3sEUqGik4NMXhS",
                        "memo": null,
                        "quantity": 1,
                        "source": "173cE6ScUFCmBLCqZeG18ij6r9KHRPbAjC",
                        "status": "valid",
                        "tx_hash": "7b39d3ebd9fe8293004a1a8b8eb2d01f1664e5d8b05e8cb94f30b1da2c2f9650",
                        "tx_index": 2056160
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665090,
                    "event": "CREDIT",
                    "params": {
                        "address": "13re7J5Y5a8nZZSp8o1a3sEUqGik4NMXhS",
                        "asset": "THOTHPEPE",
                        "block_index": 744232,
                        "calling_function": "send",
                        "event": "7b39d3ebd9fe8293004a1a8b8eb2d01f1664e5d8b05e8cb94f30b1da2c2f9650",
                        "quantity": 1,
                        "tx_index": 2056160
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665089,
                    "event": "DEBIT",
                    "params": {
                        "action": "send",
                        "address": "173cE6ScUFCmBLCqZeG18ij6r9KHRPbAjC",
                        "asset": "THOTHPEPE",
                        "block_index": 744232,
                        "event": "7b39d3ebd9fe8293004a1a8b8eb2d01f1664e5d8b05e8cb94f30b1da2c2f9650",
                        "quantity": 1,
                        "tx_index": 2056160
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665088,
                    "event": "TRANSACTION_PARSED",
                    "params": {
                        "supported": true,
                        "tx_hash": "bbb2dfa7e7a32288a702ef0091ece8b2a929f94fd967a18e6071cd9c2b085eaf",
                        "tx_index": 2056159
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                }
            ]
        }
    ```

### Get Event By Index [GET `/events/{event_index}`]

Returns the event of an index

+ Parameters
    + event_index: `10665092` (int, required) - The index of the event to return

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "event_index": 10665092,
                    "event": "TRANSACTION_PARSED",
                    "params": {
                        "supported": true,
                        "tx_hash": "7b39d3ebd9fe8293004a1a8b8eb2d01f1664e5d8b05e8cb94f30b1da2c2f9650",
                        "tx_index": 2056160
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                }
            ]
        }
    ```

### Get All Events Counts [GET `/events/counts`]

Returns the event counts of all blocks
+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "event": "ASSET_CREATION",
                    "event_count": 235860
                },
                {
                    "event": "ASSET_DESTRUCTION",
                    "event_count": 11141
                },
                {
                    "event": "ASSET_DIVIDEND",
                    "event_count": 4092
                },
                {
                    "event": "ASSET_ISSUANCE",
                    "event_count": 322678
                },
                {
                    "event": "ASSET_TRANSFER",
                    "event_count": 10639
                },
                {
                    "event": "BET_EXPIRATION",
                    "event_count": 588
                },
                {
                    "event": "BET_MATCH",
                    "event_count": 397
                },
                {
                    "event": "BET_MATCH_EXPIRATION",
                    "event_count": 9
                },
                {
                    "event": "BET_MATCH_RESOLUTON",
                    "event_count": 387
                },
                {
                    "event": "BET_MATCH_UPDATE",
                    "event_count": 397
                },
                {
                    "event": "BET_UPDATE",
                    "event_count": 1474
                },
                {
                    "event": "BLOCK_PARSED",
                    "event_count": 562364
                },
                {
                    "event": "BROADCAST",
                    "event_count": 106518
                },
                {
                    "event": "BTC_PAY",
                    "event_count": 2921
                },
                {
                    "event": "BURN",
                    "event_count": 2576
                },
                {
                    "event": "CANCEL_BET",
                    "event_count": 101
                },
                {
                    "event": "CANCEL_ORDER",
                    "event_count": 80168
                },
                {
                    "event": "CREDIT",
                    "event_count": 3659293
                },
                {
                    "event": "DEBIT",
                    "event_count": 2617404
                },
                {
                    "event": "DISPENSE",
                    "event_count": 190873
                },
                {
                    "event": "DISPENSER_UPDATE",
                    "event_count": 228954
                },
                {
                    "event": "ENHANCED_SEND",
                    "event_count": 538426
                },
                {
                    "event": "MPMA_SEND",
                    "event_count": 279142
                },
                {
                    "event": "NEW_BLOCK",
                    "event_count": 1992
                },
                {
                    "event": "NEW_TRANSACTION",
                    "event_count": 4498
                },
                {
                    "event": "NEW_TRANSACTION_OUTPUT",
                    "event_count": 596
                },
                {
                    "event": "OPEN_BET",
                    "event_count": 1149
                },
                {
                    "event": "OPEN_DISPENSER",
                    "event_count": 88229
                },
                {
                    "event": "OPEN_ORDER",
                    "event_count": 530117
                },
                {
                    "event": "OPEN_RPS",
                    "event_count": 266
                },
                {
                    "event": "ORDER_EXPIRATION",
                    "event_count": 195968
                },
                {
                    "event": "ORDER_FILLED",
                    "event_count": 805
                },
                {
                    "event": "ORDER_MATCH",
                    "event_count": 209415
                },
                {
                    "event": "ORDER_MATCH_EXPIRATION",
                    "event_count": 20860
                },
                {
                    "event": "ORDER_MATCH_UPDATE",
                    "event_count": 23689
                },
                {
                    "event": "ORDER_UPDATE",
                    "event_count": 732646
                },
                {
                    "event": "REFILL_DISPENSER",
                    "event_count": 187
                },
                {
                    "event": "RESET_ISSUANCE",
                    "event_count": 454
                },
                {
                    "event": "RPS_EXPIRATION",
                    "event_count": 59
                },
                {
                    "event": "RPS_MATCH",
                    "event_count": 171
                },
                {
                    "event": "RPS_MATCH_EXPIRATION",
                    "event_count": 145
                },
                {
                    "event": "RPS_MATCH_UPDATE",
                    "event_count": 271
                },
                {
                    "event": "RPS_RESOLVE",
                    "event_count": 129
                },
                {
                    "event": "RPS_UPDATE",
                    "event_count": 540
                },
                {
                    "event": "SEND",
                    "event_count": 805983
                },
                {
                    "event": "SWEEP",
                    "event_count": 1020
                },
                {
                    "event": "TRANSACTION_PARSED",
                    "event_count": 2723802
                }
            ]
        }
    ```

### Get Events By Name [GET `/events/{event}`]

Returns the events filtered by event name

+ Parameters
    + event: `CREDIT` (str, required) - The event to return
    + last: `10665092` (int, optional) - The last event index to return
        + Default: `None`
    + limit: `5` (int, optional) - The maximum number of events to return
        + Default: `100`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "event_index": 10665090,
                    "event": "CREDIT",
                    "params": {
                        "address": "13re7J5Y5a8nZZSp8o1a3sEUqGik4NMXhS",
                        "asset": "THOTHPEPE",
                        "block_index": 744232,
                        "calling_function": "send",
                        "event": "7b39d3ebd9fe8293004a1a8b8eb2d01f1664e5d8b05e8cb94f30b1da2c2f9650",
                        "quantity": 1,
                        "tx_index": 2056160
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665085,
                    "event": "CREDIT",
                    "params": {
                        "address": "1LfDk3Ex9KPYS6L1WGwNdt1TvEg6Le8uq",
                        "asset": "XCP",
                        "block_index": 744232,
                        "calling_function": "dispense",
                        "event": "bbb2dfa7e7a32288a702ef0091ece8b2a929f94fd967a18e6071cd9c2b085eaf",
                        "quantity": 10000000000,
                        "tx_index": 2056159
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665082,
                    "event": "CREDIT",
                    "params": {
                        "address": "173cE6ScUFCmBLCqZeG18ij6r9KHRPbAjC",
                        "asset": "FREEDOMKEK",
                        "block_index": 744232,
                        "calling_function": "send",
                        "event": "b419d19729c2be813405c548431f4840d5c909b875f94b7c56aeca134e328ef6",
                        "quantity": 1,
                        "tx_index": 2056158
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665078,
                    "event": "CREDIT",
                    "params": {
                        "address": "1P8nYZwLmecAkQUHsx2H9Nkxd51UJ2Asau",
                        "asset": "PEPEFRIDAY",
                        "block_index": 744232,
                        "calling_function": "send",
                        "event": "145ebf6c563c4e91a2bc488954ef701dad730fc065697979c80d6d85cbba63e1",
                        "quantity": 1,
                        "tx_index": 2056157
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                },
                {
                    "event_index": 10665074,
                    "event": "CREDIT",
                    "params": {
                        "address": "1NzDQ7HLm6PqJ2Wy6jEKMT7Zw1UbtjUV5a",
                        "asset": "PEPEFRIDAY",
                        "block_index": 744232,
                        "calling_function": "send",
                        "event": "388c7208d52bf617c1a3eef238a668f694a4f72dc97b3be92562fe636ca646fa",
                        "quantity": 2,
                        "tx_index": 2056156
                    },
                    "block_index": 744232,
                    "timestamp": 1712256340
                }
            ]
        }
    ```

## Group Z-pages

### Check Server Health [GET `/healthz`]

Health check route.

+ Parameters
    + check_type: `light` (str, optional) - Type of health check to perform. Options are 'light' and 'heavy'
        + Default: `heavy`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "status": "Healthy"
            }
        }
    ```

## Group Bitcoin

### Get Transactions By Address [GET `/bitcoin/addresses/{address}/transactions`]

Returns all transactions involving a given address

+ Parameters
    + address: `14TjwxgnuqgB4HcDcSZk2m7WKwcGVYxRjS` (str, required) - The address to search for
    + unconfirmed: `True` (bool, optional) - Include unconfirmed transactions
        + Default: `True`
    + only_tx_hashes: `True` (bool, optional) - Return only the tx hashes
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "tx_hash": "eae4f1dba4d75bda9dd0de12f69a980be267bbc16b7a280a2a4b40c4b3bbb70a"
                },
                {
                    "tx_hash": "7ec16c461e3ba2d3acae48fcc8f58c04fba9f307b00c391eab507337ddc0bf16"
                },
                {
                    "tx_hash": "ad35f05767aadd39019122b4f4828ccb059b8121c07be6d36eb1e2ddbe9ac317"
                },
                {
                    "tx_hash": "3190047bf2320bdcd0fade655ae49be309519d151330aa478573815229cc0018"
                },
                {
                    "tx_hash": "aba5810714aa6196fec5538a83bbc281077a84ef2cbce2045b4c9f3c4439f14f"
                },
                {
                    "tx_hash": "23758832e0fc92a7ea303623b8f743219cb8e637e7e7ac9fb6f90641efac9379"
                },
                {
                    "tx_hash": "98bef616ef265dd2f6004683e908d7df97e0c5f322cdf2fb2ebea9a9131cfa79"
                },
                {
                    "tx_hash": "687b875d1dc472aa2fb994c5753c9b9b56e5c6fd1a6de18a92fcb3dc7ba8067e"
                },
                {
                    "tx_hash": "ec97c11ff5cb318505ebe20d7aa3c033816824a79f9a49821ffb584ed7d6c78f"
                },
                {
                    "tx_hash": "c732f0906eeada2113524c6652c17b2784780110bffd4333eb8f719ac0eff3be"
                },
                {
                    "tx_hash": "2c8bc3eede9ec60d26c6fd7f44829adc64da593552044a28c673022220f560c3"
                },
                {
                    "tx_hash": "a209e345549cffef6e2190b53ac0222afc965fd618843df5ccbd645a6a7999ee"
                }
            ]
        }
    ```

### Get Oldest Transaction By Address [GET `/bitcoin/addresses/{address}/transactions/oldest`]

Get the oldest transaction for an address.

+ Parameters
    + address: `14TjwxgnuqgB4HcDcSZk2m7WKwcGVYxRjS` (str, required) - The address to search for.
    + block_index (int, optional) - The block index to search from.
        + Default: `None`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "block_index": 833187,
                "tx_hash": "2c8bc3eede9ec60d26c6fd7f44829adc64da593552044a28c673022220f560c3"
            }
        }
    ```

### Get Unspent Txouts [GET `/bitcoin/addresses/{address}/utxos`]

Returns a list of unspent outputs for a specific address

+ Parameters
    + address: `14TjwxgnuqgB4HcDcSZk2m7WKwcGVYxRjS` (str, required) - The address to search for
    + unconfirmed (bool, optional) - Include unconfirmed transactions
        + Default: `False`
    + unspent_tx_hash (str, optional) - Filter by unspent_tx_hash
        + Default: `None`

+ Response 200 (application/json)

    ```
        {
            "result": [
                {
                    "vout": 6,
                    "height": 833559,
                    "value": 34611,
                    "confirmations": 7083,
                    "amount": 0.00034611,
                    "txid": "98bef616ef265dd2f6004683e908d7df97e0c5f322cdf2fb2ebea9a9131cfa79"
                },
                {
                    "vout": 0,
                    "height": 833187,
                    "value": 619481,
                    "confirmations": 7455,
                    "amount": 0.00619481,
                    "txid": "2c8bc3eede9ec60d26c6fd7f44829adc64da593552044a28c673022220f560c3"
                },
                {
                    "vout": 0,
                    "height": 837379,
                    "value": 992721,
                    "confirmations": 3263,
                    "amount": 0.00992721,
                    "txid": "ad35f05767aadd39019122b4f4828ccb059b8121c07be6d36eb1e2ddbe9ac317"
                },
                {
                    "vout": 0,
                    "height": 840640,
                    "value": 838185,
                    "confirmations": 2,
                    "amount": 0.00838185,
                    "txid": "3190047bf2320bdcd0fade655ae49be309519d151330aa478573815229cc0018"
                },
                {
                    "vout": 0,
                    "height": 839421,
                    "value": 336973,
                    "confirmations": 1221,
                    "amount": 0.00336973,
                    "txid": "c732f0906eeada2113524c6652c17b2784780110bffd4333eb8f719ac0eff3be"
                },
                {
                    "vout": 0,
                    "height": 839462,
                    "value": 78615,
                    "confirmations": 1180,
                    "amount": 0.00078615,
                    "txid": "eae4f1dba4d75bda9dd0de12f69a980be267bbc16b7a280a2a4b40c4b3bbb70a"
                },
                {
                    "vout": 0,
                    "height": 838442,
                    "value": 557283,
                    "confirmations": 2200,
                    "amount": 0.00557283,
                    "txid": "aba5810714aa6196fec5538a83bbc281077a84ef2cbce2045b4c9f3c4439f14f"
                },
                {
                    "vout": 0,
                    "height": 838608,
                    "value": 77148,
                    "confirmations": 2034,
                    "amount": 0.00077148,
                    "txid": "ec97c11ff5cb318505ebe20d7aa3c033816824a79f9a49821ffb584ed7d6c78f"
                },
                {
                    "vout": 0,
                    "height": 837402,
                    "value": 70501,
                    "confirmations": 3240,
                    "amount": 0.00070501,
                    "txid": "687b875d1dc472aa2fb994c5753c9b9b56e5c6fd1a6de18a92fcb3dc7ba8067e"
                },
                {
                    "vout": 0,
                    "height": 839021,
                    "value": 12354,
                    "confirmations": 1621,
                    "amount": 0.00012354,
                    "txid": "23758832e0fc92a7ea303623b8f743219cb8e637e7e7ac9fb6f90641efac9379"
                }
            ]
        }
    ```

### PubKeyHash To Pubkey [GET `/bitcoin/addresses/{address}/pubkey`]

Get pubkey for an address.

+ Parameters
    + address: `14TjwxgnuqgB4HcDcSZk2m7WKwcGVYxRjS` (str, required) - Address to get pubkey for.
    + provided_pubkeys (str, optional) - Comma separated list of provided pubkeys.
        + Default: `None`

+ Response 200 (application/json)

    ```
        {
            "result": "0388ef0905568d425f1ffd4031d93dda4ef0e220c9b5fc4a6cbaf11544c4a5ca49"
        }
    ```

### Get Transaction [GET `/bitcoin/transactions/{tx_hash}`]

Get a transaction from the blockchain

+ Parameters
    + tx_hash: `3190047bf2320bdcd0fade655ae49be309519d151330aa478573815229cc0018` (str, required) - The transaction hash
    + verbose: `True` (bool, optional) - Whether to return JSON output or raw hex
        + Default: `False`

+ Response 200 (application/json)

    ```
        {
            "result": {
                "txid": "3190047bf2320bdcd0fade655ae49be309519d151330aa478573815229cc0018",
                "hash": "417c24d7a5539bc5b8496e26528382ac297a85a1c6b891b220f72712405ec300",
                "version": 2,
                "size": 195,
                "vsize": 113,
                "weight": 450,
                "locktime": 0,
                "vin": [
                    {
                        "txid": "fc940430637d22a3d276bde8f7eb489760265cab642d8392f6017d73df94cd7a",
                        "vout": 2,
                        "scriptSig": {
                            "asm": "",
                            "hex": ""
                        },
                        "txinwitness": [
                            "3045022100e4a30e5c0e0f7a28dfcec566cda00d0775a4207744ed6f223a4234cbed87a8ac02205b2403279ba7d8235ea1e8b6497465b97b46f3b3066a58c326822a9b1c25b4a501",
                            "020e66cffeb4657b40a89063340cf7066030af3c6ce55744ed3570a7aecaa6b0da"
                        ],
                        "sequence": 4294967295
                    }
                ],
                "vout": [
                    {
                        "value": 0.00838185,
                        "n": 0,
                        "scriptPubKey": {
                            "asm": "OP_DUP OP_HASH160 25f70b0f1512c1742d3301fe34370894c79127bb OP_EQUALVERIFY OP_CHECKSIG",
                            "desc": "addr(14TjwxgnuqgB4HcDcSZk2m7WKwcGVYxRjS)#68uhm9u9",
                            "hex": "76a91425f70b0f1512c1742d3301fe34370894c79127bb88ac",
                            "address": "14TjwxgnuqgB4HcDcSZk2m7WKwcGVYxRjS",
                            "type": "pubkeyhash"
                        }
                    }
                ],
                "hex": "020000000001017acd94df737d01f692832d64ab5c26609748ebf7e8bd76d2a3227d63300494fc0200000000ffffffff0129ca0c00000000001976a91425f70b0f1512c1742d3301fe34370894c79127bb88ac02483045022100e4a30e5c0e0f7a28dfcec566cda00d0775a4207744ed6f223a4234cbed87a8ac02205b2403279ba7d8235ea1e8b6497465b97b46f3b3066a58c326822a9b1c25b4a50121020e66cffeb4657b40a89063340cf7066030af3c6ce55744ed3570a7aecaa6b0da00000000",
                "blockhash": "000000000000000000020f596ed481076b7754143284b47fc8d32642202e5f76",
                "confirmations": 2,
                "time": 1713951767,
                "blocktime": 1713951767
            }
        }
    ```

### Fee Per Kb [GET `/bitcoin/estimatesmartfee`]

Get the fee per kilobyte for a transaction to be confirmed in `conf_target` blocks.

+ Parameters
    + conf_target: `2` (int, optional) - Confirmation target in blocks (1 - 1008)
        + Default: `3`
    + mode: `CONSERVATIVE` (str, optional) - The fee estimate mode.
        + Default: `CONSERVATIVE`

+ Response 200 (application/json)

    ```
        {
            "result": 295443
        }
    ```

## Group Mempool

### Get All Mempool Events [GET `/mempool/events`]

Returns all mempool events
+ Response 200 (application/json)

    ```
        {
            "result": []
        }
    ```

### Get Mempool Events By Name [GET `/mempool/events/{event}`]

Returns the mempool events filtered by event name

+ Parameters
    + event: `OPEN_ORDER` (str, required) - The event to return

+ Response 200 (application/json)

    ```
        {
            "result": []
        }
    ```