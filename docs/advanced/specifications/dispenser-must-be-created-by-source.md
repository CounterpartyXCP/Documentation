# Require Dispenser to be `Source` Address

# Motivation

For an unknown reason, it has always been possible to open a dispenser on an address that you yourself do not own. Of course, this is a major security vulnerability as it can allow anyone on the network to force other users to sell assets without their consent (potentially with major legal consequences). Generally speaking, this is just a Bad Idea(TM).

A hacky workaround was implemented in November 2023 (with the unhelpful ChangeLog entry "Redefined EMPTY address to mean no XCP or BTC history”) which prevents dispensers from being opened on any address that has any XCP or BTC history. This probably resolves the security issue but [that little patch](https://github.com/CounterpartyXCP/counterparty-core/pull/1255/files#diff-446a2aa52fd57fd6379f4732ae36f794df6f0fb1585494f798f4aa3f7b94fca2R136) unintentionally (and retroactively!) made the entirety of AddrIndexRs (and its ~200GB database) consensus-critical and mandatory for parsing. AddrIndexRs is a broken, unmaintained fork of a third-party codebase that is *not* deterministic and has been the cause of a [large number of critical bugs in Counterparty](https://github.com/CounterpartyXCP/counterparty-core/issues?q=is%3Aissue+addrindexrs+label%3Abug+), not to mention the fact that it makes Counterparty deployment a total PITA. Thankfully, once this protocol change goes into effect, we can kill AddrIndexRs, per [#1764](https://github.com/CounterpartyXCP/counterparty-core/issues/1764).

# Design

The implementation is straightforward, quick, and already done here: https://github.com/CounterpartyXCP/counterparty-core/pull/1792. 

A protocol change will be added `dispenser_must_be_created_by_source` to the `protocol_changes.json` file. From this block onwards, the `compose.validate` function will verify that `source == open_address`.

The only known downside to this change is that it will require a moving tokens to a wallet (e.g. a cold wallet) before using that wallet as a dispenser. (By differentiating between `source` and `origin`  you can simulate Ordinals-like fair minting; but we’re going to be implementing an *actual* [Fair Minting](https://www.notion.so/Fair-Minting-17033d5385ab4a61808dbf31ea33daf9?pvs=21) contract, so no functionality will be lost.)

## API Changes

*No API changes*.

## Database Changes

*No database changes*.
