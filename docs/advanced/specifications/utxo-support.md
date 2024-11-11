# UTXO Support

# Motivations

With UTXO support, it is possible to **attach** / **detach** Counterparty assets directly to / from Bitcoin UTXOs, so that they can be spent just like Colored Coins–based protocols (such as Ordinals and Runes) using any Bitcoin wallets with support for sat tracking. This featuer enables single-transaction, trustless atomic swaps between BTC and Counterparty assets, as well as Counterparty assets and other L2 protocols. Attaching assets to UTXOs uses the [new gas system](gas-system.md) that allows for a dynamic XCP fee for transactions to reduce the barrier to entry into Counterparty for new users.

# Design

## Attach

1. It is possible to attach an arbitrary number of assets from an address to a UTXO.

1. Assets are attached from transaction source address to the first UTXO non-`OP_RETURN` output or, if provided, to the `destination_vout` output.

1. If `destination_vout` designates an invalid output (`OP_RETURN` or non-existent) or if the transaction contains only a single OP_RETURN output, the transaction is invalid.

1. Fees in XCP, calculated using the [new gas system](gas-system.md), will be paid by the `source` address for an `attach`.

1. For each `attach`, a row will be added to the `send` table, triggering the `ATTACH_TO_UTXO` event.

1. When assets are attached to a UTXO, it is impossible to use them for a Counterparty transaction (`order`, `send`, etc.), apart from `detach`.

1. The embedded data in a `attach` transaction is small enough that an `OP_RETURN` output is always sufficient.


## Detach

1. All inputs of every `detach` transaction are detached.

1. If no `destination` is provided, the assets are sent to the address corresponding to the detached input.

1. It is impossible to perform a `move` at the same time as a `detach`.

1. For each `detach`, a row will be added to the `send` table, triggering the `DETACH_FROM_UTXO` event.

1. The embedded data in a `detach` transaction is small enough that an `OP_RETURN` output is always sufficient.


## Move

1. `utxo.move_assets()` is executed before all Counterparty contracts, except for `attach` transaction.

1. When a UTXO is spent, a row is added to the `send` table for each asset attached to this UTXO, triggering a `UTXO_MOVE` event.


# API

1. API routes

```python
"/v2/addresses/<address>/compose/attach": compose.compose_attach,
"/v2/utxos/<utxo>/compose/detach": compose.compose_detach,
"/v2/utxos/<utxo>/compose/movetoutxo": compose.compose_movetoutxo,
"/v2/compose/attach/estimatexcpfees": compose.get_attach_estimate_xcp_fee,
```

1. To prevent assets from being moved unintentionally, the transaction composition API excludes UTXOs with assets attached by default.

1. Balances contain two fields for UTXO support: `utxo` and `utxo_address`.
