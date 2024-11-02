# Subassets on Numeric Assets

## Motivation

There is no particular reason to disallow subassets on numeric assets and there is a strong community demand to be able to do so (see for example https://github.com/mikeinspace/Glyphs/blob/main/README.md)

## Design

Currently the `validate_subasset_parent_name` function checks that the parent asset is not numeric: https://github.com/CounterpartyXCP/counterparty-core/blob/master/counterparty-core/counterpartycore/lib/util.py#L238 This is the only place where this check is performed.

A protocol change `allow_subassets_on_numerics` will be added in the `protocol_changes.json` file. From this block on, the verification will be removed from the function `validate_subasset_parent_name`.

## API Changes

No API changes.

## Database Changes

No database changes.