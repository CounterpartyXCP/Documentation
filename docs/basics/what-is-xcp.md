---
title: What is XCP?
---

### What is XCP?

XCP is the native token of Counterparty. It is used in all cases where the Bitcoin token is not capable of acting as the working currency, either as a denominational unit or for paying network fees.

Because Bitcoin is not “aware” of the Counterparty protocol, BTC cannot be used as the native token except as a minimal 'anti-spam' mechanism to pay Bitcoin miner fees for Counterparty transactions.

### How was XCP created?

![Why Proof-of-Burn article](https://github.com/user-attachments/assets/3fb59112-69c2-44df-a836-38ec4bde89a0)

The total supply of XCP was created in a process called 'proof-of-burn' that was active between January 2nd and February 3rd of 2014 (5,000 Bitcoin blocks). Above is a historic article titled 'Why Proof-of-Burn' [published on the Counterparty website](https://web.archive.org/web/20160315012214/http://counterparty.io/why-proof-of-burn/) in March of 2014.

During this period, anyone was able to destroy bitcoins by sending them an unspendable Bitcoin address (`1CounterpartyXXXXXXXXXXXXXXXUWLpVr`), and this destruction triggered the creation of a corresponding quantity of XCP automatically.

Burning each 1 BTC triggered the creation of between 1,000 and 1,500 XCP, with more being rewarded the earlier the burn took place (the ratio decreasing linearly), with each address being limited to 1 BTC burned in total.

The proof-of-burn process created an equal opportunity for all potential Counterparty users to acquire XCP, with no centralization or trust at all. This method is relatively rare in the crypto space because it does not provide the founders with starting capital (as with a “pre-mine”).

Proof-of-burn has the following advantages:
- It avoids issues with regulatory uncertainty and legal liability
- It incentivises developers and users equally
- Funds are never in the control of any third party
- There is full transparency into the process

Below is the [original BitcoinTalk Post announcing Counterparty](https://bitcointalk.org/index.php?topic=395761.0), exemplifying this 'un-mined and slightly deflationary' proof-of-burn philosophy.

![Original BitcoinTalk announcement](https://github.com/user-attachments/assets/77cdf976-0443-4d1d-ae5b-0f718cb67729)

### What Counterparty Transactions Require the Use of XCP?

Since BTC is used in all Counterparty transactions, but cannot be used as an anti-spam mechanism for Counterparty functionality, XCP as a token is used instead as a barrier to add some friction to worthwhile Counterparty features (like the unique one-of-a-kind issuing of Named Tokens).

When this XCP is used for these functions below, the XCP used is destroyed, thus reducing the circulating supply:
- Create (Issue) a Named Token: 0.5 XCP Static Fee
- Sweep Address: Dynamic XCP Fee (proportional to number of assets swept)
- Dividends: 0.0002 XCP Per Asset Holder Recieving Dividend
- Attach Asset to UTXO: Dynamic XCP Fee
- Mint Fairmint* / XCP-69 (*if Fairmint requires XCP): Fee depends on Fairmint specifications

There are other Counterparty transactions that do not require the use of the XCP token due to their simplicity, most notably straightforward asset transfers and issuances of numeric assets (Counterparty assets without a human-readable identiﬁer), which create a low computational burden for Counterparty nodes. These include:
- Send and Receive (BTC + all XCP Assets / Add Memo Optional)
- Broadcast Data
- Create (Issue) a Numeric Asset or a Subasset
- Issue More Token Supply
- Lock / Reset Token Supply
- Add / Edit Description + Lock Description
- Mint Open Fairmint
- MPMA Multi-Sends
- Create / Cancel XCP DEX Order (Any Pair, New or Existing)
- Open / Close Dispenser
- Buy from Dispenser
- Atomic Swap with UTXOs (BTC / PSBT markets)
- Counterparty Inscriptions (on-chain Taproot)
- Transfer Token Ownership of Asset
- Destroy Asset Supply
- Create Fairminter
- Move Attached Assets to Different UTXO

Below is an example Counterparty transaction from the [tokenscan.io](https://tokenscan.io/tx/7583) Counterparty Block Explorer for issuing the named asset 'MICE', which required 0.5 XCP to be destroyed for the MICE token to be created.

![MICE issuance destroying 0.5 XCP](https://github.com/user-attachments/assets/d6bfc5f2-71b9-4a8f-8cd0-a238b09bac6d)

### How do I acquire XCP?

You can acquire XCP a few ways using on-chain Counterparty functionality:

- Buying XCP from [Atomic Swap Markets](https://www.counterparty.io/#marketplaces) (using BTC as payment from a Counterparty Wallet)
- Buying XCP from [Dispensers](https://www.counterparty.io/#explorers) (using BTC as payment from a Counterparty Wallet)
- Selling an Asset you have received (or created) for XCP directly on the [Counterparty Decentralized Exchange](https://www.counterparty.io/#explorers) (aka: XCP DEX)

Since the inception of XCP in 2014, XCP has traded on quite a few centralized exchanges such as Poloniex, Bittrex, TuxExchange and others. While many of these exchanges have since been disbanded, a few centralized exchanges still offer XCP trading such as:

- [Zaif](https://zaif.jp/?lang=en) (Japan Only)
- [DexTrade](https://dex-trade.com/)

Once you have created a [Counterparty Wallet](https://www.counterparty.io/#wallets) address, you can simply send XCP to your Counterparty Wallet Address just like you would BTC.

Below is a great example of the user experience of buying XCP from the [XCP.FUN](https://xcp.fun/dispense) marketplace and launchpad by using a Counterparty Dispenser.

![Buying XCP from XCP.FUN dispenser](https://github.com/user-attachments/assets/e54433c8-66a7-4c22-87f0-7ee831cb5051)
