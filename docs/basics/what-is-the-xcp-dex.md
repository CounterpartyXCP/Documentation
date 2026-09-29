---
title: What is the Counterparty Decentralized Exchange (XCP DEx)?
---

# What is the Counterparty Decentralized Exchange (XCP DEx)?

The Counterparty Decentralized Exchange (commonly called the XCP DEx) is a fully decentralized, peer-to-peer marketplace for trading assets built directly into the Counterparty protocol on the Bitcoin blockchain. It lets users exchange Counterparty-issued assets, tokens or coins (including the native currency XCP) directly with each other.

The Counterparty DEx is one of the oldest and most secure decentralized exchanges in crypto. It brings true peer-to-peer, trustless trading to the Bitcoin blockchain using a classic order-book model. With Bitcoin data as the backbone, the XCP DEx offers unmatched security, transparency, and decentralization for trading Bitcoin-native assets.

No central company, custodian, or intermediary holds your funds or controls the market. The entire process is deterministic and enforced by the protocol running on every Counterparty node.  The protocol acts as escrow with no platform fees for trading (only standard Bitcoin transaction fees). This makes the XCP DEx censorship resistant, permissionless, it allows for anyone with a supported wallet to participate, and is entirely transparent because all orders and trades are permanently recorded on Bitcoin.

Example below is a short list of recent XCP DEx postings from [xcp.io](https://xcp.io/orders) at the time of writing.

![Recent XCP DEx orders on xcp.io](https://github.com/user-attachments/assets/d0387c2b-2f1d-4f6c-94f6-4768fff58f85)

## Do I Have to Use a Specific Wallet to Access the XCP DEx?

You do not need to use any specific Counterparty wallet, just a [Counterparty Compatible Wallet](https://www.counterparty.io/#wallets).

The underlying XCP DEx is the same for each Counterparty wallet provider and each Counterparty block explorer as they use the same Bitcoin and Counterparty data. Keep in mind that trading for Counterparty-issued assets and XCP directly to Bitcoin (BTC) it is better to use Atomic Swaps, Counterparty Dispensers or a Centralized Exchange of your choice.

All Counterparty Wallets and Counterparty Block Explorers use the same data, below is an in-wallet example of a XCP DEx pair for PEPECASH/XCP from the [Freewallet](https://freewallet.io/) Counterparty Wallet.

![PEPECASH/XCP order book in Freewallet](https://github.com/user-attachments/assets/51f4949a-063e-4c05-9736-27f992736268)

## How Do I Create an XCP DEX Order?

Use any [Counterparty Wallet](https://www.counterparty.io/#wallets) as well as any [Counterparty Marketplace](https://www.counterparty.io/#marketplaces) of your choice. Some Counterparty Wallets can transact within the wallet itself.

Any Counterparty DEx order is recorded on the Bitcoin blockchain and you will first need a small amount of bitcoin to broadcast the order transaction. The Counterparty protocol automatically reads this data and includes it the XCP DEx within the next confirmed Bitcoin block.

To create a precise limit order (ex: “I want to sell 1,000 PEPECASH for 50 XCP”).

- In any supported Counterparty wallet you specify: The asset you’re giving (selling)
- How much of that asset you are selling
- The asset you want to receive (buying)
- How much of it you want to receive (this sets your price)
- How long the order should stay open (expiration times choices are: indefinite or any choice less than 65535 bitcoin blocks)

As soon as you broadcast the order, the Counterparty protocol immediately locks the assets you’re offering. They are held in escrow by the protocol itself. You cannot spend the tokens until the order is matched, canceled, or expires. This eliminates counterparty risk.

When another user places a complementary order (or when your order can partially fill existing ones), the protocol automatically executes the trade. Assets move directly between the two parties. Partial fills are supported.

Unmatched orders expire after the chosen number of blocks and release the escrowed assets back to you. You can also choose to cancel open orders before they expire (or if you have chosen the indefinite expiration option).

Below is an example from the [xcpdex.com](https://www.xcpdex.com/) explorer / marketplace of just how easy this can be. In this example we would be listing XCP to try to buy the PEPEKACHU token.

![Creating an XCP DEx order on xcpdex.com](https://github.com/user-attachments/assets/9a333fbb-aa38-4dff-b80c-ebae9ad20214)
