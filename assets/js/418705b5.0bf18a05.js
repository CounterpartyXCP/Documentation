"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[107],{4422:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var o=n(4848),s=n(8453);const i={title:"What is Counterparty?"},a=void 0,r={id:"basics/what-is-counterparty",title:"What is Counterparty?",description:"How does Counterparty work?",source:"@site/docs/basics/what-is-counterparty.md",sourceDirName:"basics",slug:"/basics/what-is-counterparty",permalink:"/docs/basics/what-is-counterparty",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/what-is-counterparty.md",tags:[],version:"current",frontMatter:{title:"What is Counterparty?"},sidebar:"basics",next:{title:"What is XCP?",permalink:"/docs/basics/what-is-xcp"}},c={},d=[{value:"How does Counterparty work?",id:"how-does-counterparty-work",level:3},{value:"So Counterparty is not its own Blockchain, but &quot;rides on top of&quot; Bitcoin?",id:"so-counterparty-is-not-its-own-blockchain-but-rides-on-top-of-bitcoin",level:3},{value:"Is Counterparty &quot;polluting&quot; the Bitcoin blockchain, then?",id:"is-counterparty-polluting-the-bitcoin-blockchain-then",level:3},{value:"Are Counterparty transactions less secure than Bitcoin transactions?",id:"are-counterparty-transactions-less-secure-than-bitcoin-transactions",level:3},{value:"How do the Counterparty nodes stay in sync? What&#39;s to stop one node from disagreeing with another?",id:"how-do-the-counterparty-nodes-stay-in-sync-whats-to-stop-one-node-from-disagreeing-with-another",level:3},{value:"What kind of addresses does Counterparty use?",id:"what-kind-of-addresses-does-counterparty-use",level:3}];function h(t){const e={a:"a",code:"code",em:"em",h3:"h3",p:"p",strong:"strong",...(0,s.R)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h3,{id:"how-does-counterparty-work",children:"How does Counterparty work?"}),"\n",(0,o.jsxs)(e.p,{children:["Counterparty embeds data into regular Bitcoin transactions. To a regular Bitcoin client, these transactions look like normal Bitcoin transactions, with one party sending another party a very small amount of Bitcoin. A Counterparty node (which runs the Bitcoin client along with ",(0,o.jsx)(e.a,{href:"https://github.com/CounterpartyXCP/counterparty-core",children:"the Counterparty Core software"}),") will recognize and interpret the data in these Bitcoin transactions based on specific rules. From this, it constructs its own ledger of Counterparty transactions that it has seen on the Bitcoin network."]}),"\n",(0,o.jsxs)(e.p,{children:["To better help understand this, ",(0,o.jsx)(e.a,{href:"https://counterpartychain.io/transaction/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f",children:"here"})," is a record of a Counterparty transaction where one address is sending 48 SJCX tokens (a custom token used by ",(0,o.jsx)(e.a,{href:"https://storj.io/",children:"Storj"}),") to another address. ",(0,o.jsx)(e.a,{href:"https://blockchain.info/tx/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f",children:"Here"})," is what this transaction looks like to a blockchain.info, a popular Bitcoin block explorer. You can see that while it is indeed a Bitcoin transaction, the amount of Bitcoin moved is small. In reality, the BTC spent is just enough to compensate the Bitcoin miners to include the transaction in a block. Essentially, the user that sent the transaction is paying the Bitcoin network to record and secure this embedded Counterparty data."]}),"\n",(0,o.jsx)(e.h3,{id:"so-counterparty-is-not-its-own-blockchain-but-rides-on-top-of-bitcoin",children:'So Counterparty is not its own Blockchain, but "rides on top of" Bitcoin?'}),"\n",(0,o.jsxs)(e.p,{children:["Yes. Another way to think of it is similar to a ",(0,o.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Matryoshka_doll",children:"Russian nesting doll"}),", where the bigger doll would be the Bitcoin transaction, and the next doll (inside of it) would be a Counterparty transaction."]}),"\n",(0,o.jsxs)(e.p,{children:["This embedding method is technically known as ",(0,o.jsx)(e.strong,{children:"embedded consensus"}),"."]}),"\n",(0,o.jsx)(e.h3,{id:"is-counterparty-polluting-the-bitcoin-blockchain-then",children:'Is Counterparty "polluting" the Bitcoin blockchain, then?'}),"\n",(0,o.jsxs)(e.p,{children:["No. 99%+ of Counterparty transactions utilize a data encoding method called ",(0,o.jsx)(e.code,{children:"OP_RETURN"}),', which is fully "prunable", meaning that the data may be safely discarded by Bitcoin nodes which wish to do so. For the remaining 1% of transactions, an different encoding method is utilized that produces fully "spendable" outputs. These outputs do not stick around in the critical list of unspent outputs (the "UTXO set"). Of course, every Counterparty transaction pays a fair fee to the network for inclusion.']}),"\n",(0,o.jsx)(e.h3,{id:"are-counterparty-transactions-less-secure-than-bitcoin-transactions",children:"Are Counterparty transactions less secure than Bitcoin transactions?"}),"\n",(0,o.jsxs)(e.p,{children:["As Counterparty transactions ",(0,o.jsx)(e.em,{children:"are"})," Bitcoin transactions, their data are just as secure as any other Bitcoin transaction."]}),"\n",(0,o.jsx)(e.h3,{id:"how-do-the-counterparty-nodes-stay-in-sync-whats-to-stop-one-node-from-disagreeing-with-another",children:"How do the Counterparty nodes stay in sync? What's to stop one node from disagreeing with another?"}),"\n",(0,o.jsx)(e.p,{children:'As all Counterparty nodes run the same code, and all receive the same Bitcoin transaction data, the ledgers across each node match exactly. Counterparty nodes are not like Bitcoin nodes in that they don\'t communicate with each other directly: they simply connect to the Bitcoin software and download transactions from it, decoding each one as they go along. In this way, the immense security and computing power behind Bitcoin is leveraged as the "transport network" for Counterparty data.'}),"\n",(0,o.jsx)(e.p,{children:'Given the above, there is no "Counterparty peer-to-peer network" like there is a "Bitcoin peer-to-peer network": Counterparty-aware nodes comprise a subset of the Bitcoin full nodes in existance.'}),"\n",(0,o.jsx)(e.h3,{id:"what-kind-of-addresses-does-counterparty-use",children:"What kind of addresses does Counterparty use?"}),"\n",(0,o.jsx)(e.p,{children:"Counterparty uses the same Bitcoin addresses we all know and love. As such, Counterparty tokens (such as XCP, SJCX, CAKE, and more) may be sent to any Bitcoin address."})]})}function u(t={}){const{wrapper:e}={...(0,s.R)(),...t.components};return e?(0,o.jsx)(e,{...t,children:(0,o.jsx)(h,{...t})}):h(t)}},8453:(t,e,n)=>{n.d(e,{R:()=>a,x:()=>r});var o=n(6540);const s={},i=o.createContext(s);function a(t){const e=o.useContext(i);return o.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function r(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:a(t.components),o.createElement(i.Provider,{value:e},t.children)}}}]);