# UTXO Support

# Motivations

With Ordinals, a user who does not own an Ordinal cannot create a valid Bitcoin transaction to move an Ordinal that is not in their wallet. This is because the user must possess the UTXO that holds the "sat". Unlike Ordinals, Counterparty as a metaprotcol is entirely detached from Layer-1 consensus rules—this allows Counterparty to be much more versatile and extendable. However, Ordinals, given its large community, offers Counterparty asset owners the opportunity to benefit from greater liquidity and a larger ecosystem generally. For this it is necessary to be able to **attach and detach Counterparty assets to/from UTXOs**. This will allow Counterparty assets to be compliant with the Ordinals trading transactional structure, allowing the large players in the Ordinals ecosystem to seamlessly integrate with Counterparty assets.

# Design

The `balances`, `credits` and `debits` tables, as well as the `ledger.credit()` and `ledger.debit()` functions will be modified to be able to support balances attached to UTXOs.

Three new contracts allow managing UTXOs:

- `attach.py` to move assets from an address to a UTXO
- `detach.py` to move assets from a UTXO to an address  
- `move.py` to move assets from one UTXO to another UTXO

The `get_tx_info()` function will be modified to also return inputs with attached assets as well as the first non-OP_RETRUN output.

The inputs and output returned by `get_tx_info()` will be stored in the `utxos_info` field of the `transactions`  table by the `list_tx()` function.

Then the `parse_tx()` function will check that the `utxos_info` field contains entries and if so will pass them to the `move.move_assets()` function.

Here is the signature of the three new compose functions:

**`compose_attach()`**

```python
def compose_attach(
    db,
    address: str,
    asset: str,
    quantity: int,
    destination_vout: str = None,
    **construct_args,
):
    """
    Composes a transaction to attach assets from an address to UTXO.
    :param address: The address from which the assets are attached
    :param asset: The asset or subasset to attach (e.g. XCP)
    :param quantity: The quantity of the asset to attach (in satoshis, hence integer) (e.g. 1000)
    :param destination_vout: The vout of the destination output
    """
```

**`compose_detach()`**

```python
def compose_detach(
    db,
    utxo: str,
    destination: str = None,
    **construct_args,
):
    """
    Composes a transaction to detach assets from UTXO to an address.
    :param utxo: The utxo from which the assets are detached
    :param destination: The address to detach the assets to, if not provided the addresse corresponding to the utxo is used
    """
```

**`compose_movetoutxo()`**

```python
def compose_movetoutxo(db, utxo: str, destination: str, **construct_args):
    """
    Composes a transaction to move assets from UTXO to another UTXO.
    :param utxo: The utxo from which the assets are moved
    :param destination: The address to move the assets to
    """
```

## Considerations

### Attach

1. It is possible to attach an arbitrary number of assets from an address to a UTXO.

1. Assets are attached from transaction source address to the first UTXO non- `OP_RETURN` output or, if provided, to the `destination_vout` output.

1. If `destination_vout` designates an invalid output (`OP_RETURN` or non-existent) or if the transaction contains only a single OP_RETURN output, the transaction is invalid.

1. Fees in XCP, calculated using the [new Gas system](https://gist.github.com/adamkrellenstein/7c7cab257cee162233fc2ba6682eb8da), will be paid by the source address for an `attach`.

1. For each `attach` a row will be added to the `send` table, triggering the `ATTACH_TO_UTXO` event.

1. When assets are attached to a UTXO, it is impossible to use them for a Counterparty transaction (`order`, `send`, etc.) apart from `detach`.

1. The embedded data in a `attach` transaction is small enough that an `OP_RETURN` output is always sufficient.

### Detach

1. All inputs of a `detach` transaction are detached.

1. If no `destination` is provided, the assets are sent to the address corresponding to the detached input.

1. It is impossible to perform a `move` at the same time as a `detach`.

1. For each `detach` a row will be added to the `send` table, triggering the `DETACH_FROM_UTXO` event.

1. The embedded data in a `detach` transaction is small enough that an `OP_RETURN` output is always sufficient.


### Move

1. `utxo.move_assets()` is executed before Counterparty contracts except for `attach` transaction.

1. When a UTXO is spent, a row is added to the `send` table for each asset attached to this UTXO, triggering a `UTXO_MOVE` event.

## API Changes

1. Four new routes will be added:

```python
"/v2/addresses/<address>/compose/attach": compose.compose_attach,
"/v2/utxos/<utxo>/compose/detach": compose.compose_detach,
"/v2/utxos/<utxo>/compose/movetoutxo": compose.compose_movetoutxo,
"/v2/compose/attach/estimatexcpfees": compose.get_attach_estimate_xcp_fee,
```

1. To prevent assets from being moved unintentionally, the transaction composition API excludes UTXOs with assets attached by default.

1. Balances will now contain two additionals fields: `utxo` and `utxo_address`.

## Database Changes

`utxo` and `utxo_address` fields will be added to the `credits`, `debits` and `balances` tables. One of the two fields, `address` or `utxo` will be null. The format of the `utxo` field is `<tx_hash>:<n>` .

A `utxos_info` field will be added to the `transactions` table. This field will contain:

- the list of inputs with assets attached
- the first non-OP_RETURN output
- the number of outputs
- the position of a possible OP_RETURN output