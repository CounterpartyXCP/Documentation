# Make Dispenses Normal Counterparty Transactions

## Motivation

It is a serious flaw in the protocol that dispenses are not normal Counterparty transactions with the `CNTRPRTY` prefix. Any BTC transaction sent to an address with an open dispenser will trigger that dispenser. This was not part of the original specification for the feature, and it causes major problems both in terms of the Counterparty user experience and in overall code-quality/performance.

That vanilla BTC transactions can trigger dispenses is responsible for significant loss of funds due to accidental and invalid dispenses. Some users now consider this to be a feature instead of a bug, however without a Counterparty wallet users are unable to detect whether a dispenser is already closed, whether they are using a compatible address type, etc. and they regularly lose funds due to those missing checks. Of course, after receiving the dispensed asset, the user is unable to view or spend that asset without migrating to a Counterparty wallet.

## Design

Currently, it's possible to use a `dispenser` with a vanilla BTC transaction. The `get_tx_info` function examines each output of every transaction to determine if the destination address contains a dispenser. If so, `get_tx_info` behaves as if the transaction contained the following data:

```
data = struct.pack(config.SHORT_TXTYPE_FORMAT, dispenser.DISPENSE_ID)
data += b"\\x00"
```

Subsequently, in the second parsing step, the `parse_tx` function recognizes the `dispenser.DISPENSE_ID` and invokes the `dispenser.dispense` function.

## Implementation

1. Introduce two protocol changes in the `protocol_changes.json` file:
    1. `enable_dispense_tx`: From this block onwards, transactions containing `dispenser.DISPENSE_ID` will trigger one or more dispenses, similar to current vanilla BTC transactions.
    2.  `disable_vanilla_btc_dispense`: From this block onwards, vanilla BTC transactions will no longer trigger dispenses.
2. Add a new `dispense.compose()` to construct a transaction with the same data as currently used (see above). This function will perform necessary sanity checks (e.g., empty dispenser, closed status).
3. Modify `send.compose()` to check if the destination is a dispenser. If so, call the `dispense.compose()` function.
4. Update `get_tx_info` so that from the `disable_vanilla_btc_dispense` block onwards, transactions without `data` will consistently raise a `BTCOnlyError`, and outputs will no longer be checked for dispensers.
5. For `/v2/addresses/<address>/compose/send?asset=BTC` check if the destination is not a dispenser and if so return the same as `/v2/addresses/<address>/compose/dispense`(after `enable_dispense_tx`)

## API Changes

1. New route: `/v2/addresses/<address>/compose/dispense`

*NOTE: It will no longer be possible to trigger a dispense with a non-Counterparty wallet. Explorers should update their existing dispenser warnings accordingly.*

## Database Changes

After this change has gone into effect, it will be possible to record in a separate file all historical vanilla BTC dispenses and parse this file during the initial catchup. (The same thing was done with the original BTC burns for XCP.) This will allow for a major simplification and optimization of the existing codebase. The file will be able to be validated simply using old versions of the Counterparty Core software.