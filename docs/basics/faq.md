---
title: General FAQ
---

### Is it safe to use Counterparty?

Yes. As long as you correctly use the [Counterparty Tooling](https://www.counterparty.io/#explorers), [Counterparty Supported Wallets](https://www.counterparty.io/#wallets) and [Protocol Infrastructure](https://github.com/CounterpartyXCP) that supports the latest version of Counterparty, there’s no risk.

As a general rule, as is with most Bitcoin and cryptocurrency spaces, do NOT share your Counterparty wallet passphrase or any Counterparty address private keys with anyone.

If you choose to engage in community telegrams or places like X (Twitter) take serious note, nobody that is legitimate will try to direct message you. Be careful!

Never trust, always verify.

Verifying is what the Counterparty protocol, the Counterparty Decentralized Exchange, the extensive Counterparty public blockchain tooling and even Bitcoin itself was created for.

Please ensure that the use-case you are aiming for is legal within your jurisdiction, and seek professional advice when acquiring assets, starting a project, issuing an asset or using any Counterparty functionality.

### Is a 51% attack against Counterparty possible?

As every Counterparty transaction is a Bitcoin transaction, to do a "51% attack" on Counterparty you would have to do a 51% attack on Bitcoin.

Good luck.

### Can I secure my XCP and Counterparty tokens in cold storage or a hardware wallet?

Yes.

You can either make a regular Bitcoin paper wallet, store them there and later sweep the funds into a Counterparty wallet, or create a cold Counterparty paper wallet and store that way.

For hardware wallet storage, some [Counterparty Wallets](https://www.counterparty.io/#wallets) support hardware devices like Trezor and Ledger. Below is a screenshot from the [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg) showing the option of using Trezor Connect.

![XCP Wallet Trezor Connect](https://github.com/user-attachments/assets/0e2c600f-05df-4bfd-81c4-bfb8ae483c54)

### What happened to Counterwallet?

Counterwallet has unfortunately not been actively maintained in a number of years.

The community has since spent its energy on the creation of a new generation of wallets such as [Counterwallet V2](https://derpherpenstein.github.io/CounterWalletV2/), [Horizon Wallet](https://chromewebstore.google.com/detail/horizon-wallet/bnmgkjlaommgappfckljlelgahnbngme) and [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg) rather than attempt to revive Counterblock and Counterwallet.

However, [the code is all open-source](https://github.com/CounterpartyXCP/counterwallet) and anyone is free to work on it.

Below is a screenshot of the user interface of Counterwallet V2.

![Counterwallet V2](https://github.com/user-attachments/assets/1eae9ce0-e769-475b-8fea-226769925b1d)

### How are blockchain reorganizations ("reorgs") handled by Counterparty?

Blockchain reorganizations are essentially handled by Counterparty the same way they are handled by Bitcoin.

The Counterparty database is log-structured. This means that Counterparty simply deletes all the database rows written after a certain block to execute a rollback, and then process new transactions on the now-longest chain.

### What happens if and when OP_RETURN data is auto-pruned?

Counterparty only needs some Bitcoin full nodes somewhere to have an unpruned copy of the blockchain.

As every Counterparty full node is also a Bitcoin full node, this is easily done by just running a Counterparty full node!

### What about support for other blockchains instead of Bitcoin?

Counterparty is built on Bitcoin. That has always been the case and we do not see it changing, ever.

That being said, there are ways to interoperate Counterparty assets to platforms like Ethereum and even Solana. A main and well used example of this would be [Emblem Vault](https://emblem.vision/), which allow Counterparty users to vault Counterparty assets to sell on places like Ethereum Marketplaces like OpenSea.

Below is an example of the [Emblem Vault Curated Rare Pepe Collection](https://opensea.io/collection/rare-pepe-curated) as seen on Opensea.io. User are able to freely transact Counterparty tokens using Emblem Vault on Ethereum. Once vaulted assets are acquired, users are able to 'unlock' the vaults and send their Counterparty assets to any supported Counterparty Wallet.

![Emblem Vault Rare Pepe collection](https://github.com/user-attachments/assets/50e27659-b859-4580-a91d-62ee56d0fc1b)

### Has Counterparty forked?

The word "fork" is used in three main ways: protocol upgrades (like Bitcoin hardforks), software forks (like Litecoin), and network forks (like BSV).

Protocol upgrades are a normal part of the evolution of the Counterparty protocol, and there have been [dozens](https://github.com/CounterpartyXCP/counterparty-core/blob/master/counterparty-core/counterpartycore/protocol_changes.json) throughout its history.

Other blockchains also can run similar software, as over the years there have been "software forks" of the Counterparty software. Good examples of this would be [Dogeparty](https://dogeparty.net/) on Dogecoin, and Monaparty on Monacoin.

In Counterparty's history there have not been network forks with any adoption.
