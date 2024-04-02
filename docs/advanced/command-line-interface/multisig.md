---
title: Using multisig with counterparty-server
---

"Bare Multisig" (i.e. not P2SH) is supported with Counterparty. This document shows you how to use it with `counterparty-server` on testnet.

### Making a Multisig Tx

An example testnet multi‐sig source transaction is tx hash _e06d22276699de6ed1c5322133b0968114067ce833120bb9126182a1ad19de83_

Here's how you can make a multisig transaction:

```
counterparty-wallet --unconfirmed --testnet --database-file=test.db send --source=1_mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc_mfzSPkV7kAYma5oxZ37pHkw9qtwAEQx8Wy_2
--destination=mn6q3dS2EnDUx3bmyWc6D4szJNVGtaR7zc --quantity=.1337 --asset=XCP
```

So that's a 1-of-2 multisig address that the 0.1337 XCP would be sent to. 

The multisig addresses are represented as such a string as `{m}_{address}_{address}_{address}_{n}`, where the addresses (pubkeyhashes) are sorted alphabetically/numerically. 

1-of-2, 2-of-2, 1-of-3, 2-of-3 and 3-of-3 are supported at the moment. 

_**NOTE:** Each address in a multisig source must have already made **at least one non-multisig transaction** in the blockchain, for counterpartyd to be able to retrieve its pubkey from the blockchain._  

You can sign transactions with `bitcoind signrawtransaction`; broadcast with `sendrawtransaction`.
