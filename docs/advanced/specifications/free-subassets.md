# Eliminate XCP for Subasset Issuances

## Motivation

XCP fees for issuances are principally an *anti-squatting* mechanism (since the BTC fee is sufficient in this case to prevent true SPAM). For subassets, which are namespaced by the parent asset, there’s no need to limit the number of issuances in any way.

## Design

Fees are calculated in the `issuances.validate()` function.[[1](https://github.com/CounterpartyXCP/counterparty-core/blob/master/counterparty-core/counterpartycore/lib/messages/issuance.py#L279)] A protocol change `free_subassets` will be added in the `protocol_changes.json` file. From this block on, the function `issuances.validate()` will return `fee=0` for all subasset issuances.

## API Changes

*No API changes.*

## Database Changes

*No database changes*.