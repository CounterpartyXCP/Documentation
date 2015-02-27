How to Proportionally Distribute Funds to Token Holders
---------------------------

Counterparty natively supports payment distributions. This feature lets you distribute XCP, BTC or any other token to the holders of your own token. You can specify an amount per unit, and everyone who holds units of your own token will receive a proportional amount of the secondary token being distributed. Depending on the way it is used, this can also be referred to as 'dividend payments'. This feature has many clever uses, such as [transparent voting](voting_with_tokens.md).

**For example:**

1. You create a token TRADEME with 100 total units.
2. You sell 25 TRADEME to user A.
3. You sell 25 TRADEME to user B.
4. Now you have 50 TRADEME, while both users have 25 each.
5. Next, you make a distribution payment of 0.001 BTC per unit.
6. User A will receive 0.025 BTC
7. User B will receive 0.025 BTC

### How to make a Distribution Payment in Counterwallet

Choose the address which owns the token you want to make a distribution payment on. 

**Click address actions, and "Pay Distribution".**

![](/_images/distribution1.png)

**Write the name of your token in the first field. You can only distribute funds to a token you have issued or control.**

![](/_images/distribution2.png)

**Specify the token to be distributed.**

![](/_images/distribution3.png)

**Specify the amount of the token to be distributed per unit ("_share_") and the costs will be displayed. Click "Pay Distribution" and after a while it will be confirmed by the Bitcoin network.**
![](/_images/distribution4.png)

**Note:** If you are paying out BTC dividends, this process is a regular Bitcoin transaction. This means it will not be possible to distinguish it as a Counterparty type transaction. We recommend that if you plan to pay out BTC dividends, do not use that particular address for anything else. And only use one address per asset. This will make it much easier to keep track of past BTC dividends for yourself, as well as your users. Otherwise it may be difficult to retain an overview over your payments. 
