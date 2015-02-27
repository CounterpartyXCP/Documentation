Frequently Asked Questions
========

### Is XCP an alt-coin or competitor to Bitcoin?

No. XCP cannot exist without Bitcoin, as Counterparty extends the basic features of Bitcoin with proof-of-publication, oracle betting, decentralized exchange, automatic escrow, order matching, and smart contracts. 

### What kind of addresses does Counterparty use?

_Exactly_ the same Bitcoin addresses we all know and love. Counterparty uses the Bitcoin blockchain exclusively.

### How was the supply of XCP created?

During the proof-of-burn process, users were able to send Bitcoins to an provably unspendable address, and automatically receive XCP in return from the protocol. In accordance with Satoshi's philosophy, this created an equal opportunity for both developers and users.

### Can more XCP be created?

No. The supply of XCP is fixed, and decreasing because of fees being burned.

### Why does XCP have value?

XCP is the fuel for smart contracts. When smart contracts are running, fuel is used for each execution step. Appropriately enough, this fuel is **burned** (destroyed). This means that the supply of XCP is continously decreasing. However, the cost of fuel adjusts as the supply of XCP goes down, so that it cannot reach 0.

XCP is always the easiest token to trade against, as it is represented across all exchanges that support Counterparty. It is also used for anti-spam fees when registering named tokens, and when making distribution payments to token holders. The betting system also uses XCP.

Unfortunately these features cannot reach the achieve of the main Bitcoin blockchain without a metatoken, such as XCP. This intermediate step is a technical necessity, and many Counterparty features such as betting therefore use XCP. 

### What about Sidechains?

Counterparty is optimal for mainly higher value transactions and greatly benefits from the security of the main chain. However, if sidechains are ever released, there is no reason not to make them work with Counterparty.

### Can I secure my XCP and tokens in cold storage?

Yes

### How does the Counterparty protocol achieve consensus? 

The local Counterparty SQLite database is like the Bitcoin LevelDB database—independent of the consensus mechanism. What goes in the database s the parsed blockchain data: debits, credits, etc. Counterparty only uses prunable outputs to store its data. 

### What are the risks to consensus?

All of the Counterparty code is completely open-source. If someone published malicious code, people would notice and not update their clients. Same as with Bitcoin.

All of the data in the Bitcoin blockchain is safely parsed by the Counterparty client. The code is not ‘executed’. Again, all Bitcoin clients also parse Bitcoin blockchain data safely.

### How do Smart Contracts form a consensus?

Smart contracts don’t form consensus. Every network participant just executes each contract in the same way (like a ‘send’ transaction). The consensus is formed with the blockchain determining which contracts exist and the order they are found in.

### Can the Counterparty Team rewrite the Counterparty ledger’s history, in an emergency or by decree? How does that compare to the same risks with Bitcoin Core devs?

It’s identical to the case with Bitcoin. The Bitcoin core devs could publish a copy of Bitcoin Core that does anything, but no one would download it. There aren’t ‘Counterparty nodes’—Counterparty clients only communicate with each other through the Bitcoin blockchain.

### What happens when OP_RETURN data is auto-pruned as Gavin Andresen stated quite plainly would happen in due time at MIT?

Counterparty only needs some Bitcoin full nodes somewhere to have an unpruned copy of the blockchain (which is easy, especially as all Counterparty clients will have one).

### Is a 51% attack against Counterparty possible?

To do a 51% attack on Counterparty, you have to do a 51% attack on Bitcoin, and the effects would be the same, too. Blockchain reorganizations are handled by Counterparty the same way they are handled by Bitcoin.

### How can a thin client trustlessly lookup the Bitcoin public address associated with the OSTOCK asset name?

You can use a local copy of the blockchain just fine. The only difference between Counterparty and Bitcoin here is that Counterparty doesn’t support SPV. We’re working on solutions to this issue now. Protocols like VerSum offer excellent models for untrusted verification here.
