---
title: REST API V2
---

## Available routes

The JSON RPC API is being migrated to a full REST API. Currently the following routes are available:

| Method | Routes | Parameters | Description |
| ------ | ------ | ---------- | ----------- |
| GET | `/addresses/<address>/balances` | | Returns all balances for a given `<address>` |
| GET | `/assets/<asset>/` | | Return `<asset>` information |
| GET | `/assets/<asset>/balances` | | Returns all balances for a given `<asset>` |
| GET | `/assets/<asset>/orders` | `status` (default: `open`) | Returns orders for a given `<asset>` |
| GET | `/orders/<tx_hash>` | | Return order information |
| GET | `/orders/<tx_hash>/matches` | `status` (default: `pending`) | Returns order matches for a given order |


## Examples

### GET `/assets/mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc/balances`

```
[
    {
        "MAX(rowid)": 68,
        "address": "mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc",
        "asset": "A95428956661682277",
        "quantity": 100000000
    },
    {
        "MAX(rowid)": 7,
        "address": "mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc",
        "asset": "CALLABLE",
        "quantity": 1000
    },
    ...
]
```

### GET `/assets/NODIVISIBLE/`

```
[
    {
        "asset": "NODIVISIBLE",
        "asset_longname": None,
        "description": "No divisible asset",
        "divisible": False,
        "issuer": "mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc",
        "locked": False,
        "owner": "mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc",
        "supply": 1000
    }
]
```

### GET `/addresses/XCP/balances`

```
[
    {
        "MAX(rowid)": 19,
        "address": "1_mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc_mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns_2",
        "asset": "XCP",
        "quantity": 300000000
    },
    {
        "MAX(rowid)": 46,
        "address": "2MyJHMUenMWonC35Yi6PHC7i2tkS7PuomCy",
        "asset": "XCP",
        "quantity": 46449548498
    },
    ...
]
```

### GET `/assets/XCP/orders`

```
[
    {
        "tx_index": 11,
        "tx_hash": "1899b2e6ec36ba4bc9d035e6640b0a62b08c3a147c77c89183a77d9ed9081b3a",
        "block_index": 310010,
        "source": "mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc",
        "give_asset": "XCP",
        "give_quantity": 100000000,
        "give_remaining": 100000000,
        "get_asset": "BTC",
        "get_quantity": 1000000,
        "get_remaining": 1000000,
        "expiration": 2000,
        "expire_index": 312010,
        "fee_required": 900000,
        "fee_required_remaining": 900000,
        "fee_provided": 6800,
        "fee_provided_remaining": 6800,
        "status": "open",
        "MAX(rowid)": 3
    },
    ...
]

```

### GET `/orders/1899b2e6ec36ba4bc9d035e6640b0a62b08c3a147c77c89183a77d9ed9081b3a`

```
[
    {
        "tx_index": 11,
        "tx_hash": "1899b2e6ec36ba4bc9d035e6640b0a62b08c3a147c77c89183a77d9ed9081b3a",
        "block_index": 310010,
        "source": "mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc",
        "give_asset": "XCP",
        "give_quantity": 100000000,
        "give_remaining": 100000000,
        "get_asset": "BTC",
        "get_quantity": 1000000,
        "get_remaining": 1000000,
        "expiration": 2000,
        "expire_index": 312010,
        "fee_required": 900000,
        "fee_required_remaining": 900000,
        "fee_provided": 6800,
        "fee_provided_remaining": 6800,
        "status": "open"
    }
]
```

### GET `/orders/74db175c4669a3d3a59e3fcddce9e97fcd7d12c35b58ef31845a1b20a1739498/matches`

```
[
    {
        "id": "74db175c4669a3d3a59e3fcddce9e97fcd7d12c35b58ef31845a1b20a1739498_1b294dd8592e76899b1c106782e4c96e63114abd8e3fa09ab6d2d52496b5bf81",
        "tx0_index": 492,
        "tx0_hash": "74db175c4669a3d3a59e3fcddce9e97fcd7d12c35b58ef31845a1b20a1739498",
        "tx0_address": "mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc",
        "tx1_index": 493,
        "tx1_hash": "1b294dd8592e76899b1c106782e4c96e63114abd8e3fa09ab6d2d52496b5bf81",
        "tx1_address": "mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns",
        "forward_asset": "XCP",
        "forward_quantity": 100000000,
        "backward_asset": "BTC",
        "backward_quantity": 800000,
        "tx0_block_index": 310491,
        "tx1_block_index": 310492,
        "block_index": 310492,
        "tx0_expiration": 2000,
        "tx1_expiration": 2000,
        "match_expire_index": 310512,
        "fee_paid": 7200,
        "status": "pending",
        "MAX(rowid)": 1
    },
    ...
]
```

