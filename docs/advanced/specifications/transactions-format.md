# CBOR Format Migration Guide

## Introduction

Until v11, each transaction used a custom binary format, sometimes multiple formats, which was difficult to maintain and non-standard. Starting from v11, all transactions will be progressively updated to use the CBOR format.

At the time when the original contracts were written, CBOR had just been created and there was no mature solution yet. Additionally, it was important to save every byte to try to fit within an OP_RETURN.

Today, CBOR has become a mature and sustainable standard, and with the new encoding methods in witnesses, it is no longer as crucial to save every byte. CBOR is therefore perfectly suitable and this migration is part of the major cleanup and modernization effort of the Counterparty codebase that began last year.

## General Format

The new format follows this structure:
1. **1 byte** for the transaction ID (using `config.SHORT_TXTYPE_FORMAT`)
2. **CBOR serialization** of a list of values of arbitrary types

Addresses are compressed with the following function: https://github.com/CounterpartyXCP/counterparty-core/blob/master/counterparty-rs/src/utils.rs#L348-L377.

Asset descriptions and broadcast texts are converted to bytes with the following function: https://github.com/CounterpartyXCP/counterparty-core/blob/master/counterparty-core/counterpartycore/lib/utils/helpers.py#L200-L204.

## Transactions Using CBOR

### Enhanced Send (ID: 2)

```python
data = struct.pack(config.SHORT_TXTYPE_FORMAT, ID)
data += cbor2.dumps([
    asset_id,
    quantity,
    short_address_bytes,
    memo_bytes,
])
```

### Sweep (ID: 4)

```python
data = struct.pack(config.SHORT_TXTYPE_FORMAT, ID)
data += cbor2.dumps([
    short_address_bytes,
    flags,
    memo_bytes,
])
```

### Issuance Standard (ID: 20)

```python
data = struct.pack(config.SHORT_TXTYPE_FORMAT, ID)
data_array = [
    asset_id,
    quantity,
    divisible,
    lock,
    reset,
    mime_type,
]
if validated_description is not None:
    data_array.append(
        helpers.content_to_bytes(validated_description, mime_type or "text/plain")
    )
else:
    data_array.append(None)
data += cbor2.dumps(data_array)
```

### Issuance Subasset (ID: 21)

```python
data = struct.pack(config.SHORT_TXTYPE_FORMAT, ID)
data_array = [
    asset_id,
    quantity,
    1 if divisible else 0,
    1 if lock else 0,
    1 if reset else 0,
    compacted_subasset_length,
    compacted_subasset_longname,
    mime_type,
]
if validated_description is not None:
    data_array.append(
        helpers.content_to_bytes(validated_description, mime_type or "text/plain")
    )
else:
    data_array.append(None)
data += cbor2.dumps(data_array)
```

### Fairminter (ID: 90)

```python
data = struct.pack(config.SHORT_TXTYPE_FORMAT, ID)
data += cbor2.dumps([
    asset_id,
    asset_parent_id,
    price,
    quantity_by_price,
    max_mint_per_tx,
    max_mint_per_address,
    hard_cap,
    premint_quantity,
    start_block,
    end_block,
    soft_cap,
    soft_cap_deadline_block,
    minted_asset_commission_int,
    burn_payment,
    lock_description,
    lock_quantity,
    divisible,
    mime_type,
    helpers.content_to_bytes(description, mime_type or "text/plain"),
])
```

### Fairmint (ID: 91)

```python
data = struct.pack(config.SHORT_TXTYPE_FORMAT, ID)
data += cbor2.dumps([asset_id, quantity])
```

### Broadcast (ID: 30)

```python
data = struct.pack(config.SHORT_TXTYPE_FORMAT, ID)
data += cbor2.dumps([
    timestamp,
    value,
    fee_fraction_int,
    mime_type,
    helpers.content_to_bytes(text, mime_type or "text/plain"),
])
```