---
title: Why do I need small amounts of Bitcoin to use Counterparty?
---

# Why do I need small amounts of Bitcoin to use Counterparty?

Counterparty builds directly on top of the Bitcoin network. Every Counterparty transaction is a Bitcoin transaction as well.

This means that Counterparty transactions are the same as Bitcoin transactions, with some amount of extra information attached through Bitcoin centric functions like OP_RETURN, Multi-Sig, and even Taproot.

Adam Krellenstein, co-founder of Counterparty, wrote about this functionality and labelled Counterparty as a 'metaprotocol' in the [Counterparty Whitepaper](https://krellenstein.com/adam/get/counterparty-whitepaper_2024-03-29.pdf) titled "Counterparty An Extension to Bitcoin by State-Machine Replication".

![Counterparty whitepaper excerpt](https://github.com/user-attachments/assets/fe87ec93-4a2b-40e8-ab40-ebfc56a29df8)

Because of this, Counterparty transactions using any Counterparty wallet MUST pay a small BTC fee to the Bitcoin miners for each Counterparty transaction. Beyond being a sign of commitment to the health of the Bitcoin network, this allows Counterparty transactions to be given a high priority and be confirmed quickly while maintaining the same security that Bitcoin has.

## What does a Bitcoin transaction with Counterparty data look like?

Many internal Counterparty transactions such as asset creation, issuance change, token locking etc. are transactions “sent to yourself” with this Counterparty information layered on top of it.

Below is [an example](https://tokenscan.io/tx/21455) of a Counterparty transaction with OP_RETURN data attached that represented a named token creation transaction for KALEIDOSCOPE.

Notice how the receive Bitcoin / Counterparty address is the same as the sender in this specific example. Also notice the extra 'OP_RETURN' information added. This example is from the Bitcoin Block Explorer [mempool.space](https://mempool.space/).

![KALEIDOSCOPE issuance on mempool.space](https://github.com/user-attachments/assets/c7d86a1b-010c-4152-af48-9fd981b80c7d)

Below is the detailed OP_RETURN data for that [Counterparty transaction for issuing KALEIDOSCOPE](https://tokenscan.io/tx/1215130) which can be viewed on [Counterparty Block Explorers](https://www.counterparty.io/#explorers), while all 'BTC only' transactions can be viewed on a BTC block explorer. This example is from [tokenscan.io](https://tokenscan.io/).

Take note this is the same 'transaction ID' as the screenshot before but the 'OP_RETURN' information has been decoded to show you the Counterparty action in great detail.

![KALEIDOSCOPE issuance decoded on tokenscan.io](https://github.com/user-attachments/assets/bb47afac-ad88-4550-bfef-40cd77234c63)
