"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[107],{4422:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>r,metadata:()=>s,toc:()=>h});var o=n(4848),a=n(8453);const r={title:"What is Counterparty?"},i=void 0,s={id:"basics/what-is-counterparty",title:"What is Counterparty?",description:"What is Counterparty?",source:"@site/docs/basics/what-is-counterparty.md",sourceDirName:"basics",slug:"/basics/what-is-counterparty",permalink:"/docs/basics/what-is-counterparty",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/what-is-counterparty.md",tags:[],version:"current",frontMatter:{title:"What is Counterparty?"},sidebar:"basics",next:{title:"What is XCP?",permalink:"/docs/basics/what-is-xcp"}},c={},h=[{value:"What is Counterparty?",id:"what-is-counterparty",level:3},{value:"How does Counterparty work?",id:"how-does-counterparty-work",level:3},{value:"What does a Counterparty transaction look like?",id:"what-does-a-counterparty-transaction-look-like",level:3},{value:"Does Counterparty have its own blockchain?",id:"does-counterparty-have-its-own-blockchain",level:3},{value:"Is Counterparty &quot;polluting&quot; the Bitcoin blockchain, then?",id:"is-counterparty-polluting-the-bitcoin-blockchain-then",level:3},{value:"How is the Counterparty network secured?",id:"how-is-the-counterparty-network-secured",level:3},{value:"How do the Counterparty nodes stay in sync? What&#39;s to stop one node from disagreeing with another?",id:"how-do-the-counterparty-nodes-stay-in-sync-whats-to-stop-one-node-from-disagreeing-with-another",level:3}];function d(t){const e={a:"a",code:"code",em:"em",h3:"h3",p:"p",strong:"strong",...(0,a.R)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h3,{id:"what-is-counterparty",children:"What is Counterparty?"}),"\n",(0,o.jsx)(e.p,{children:"The Counterparty Protocol is an extension to the Bitcoin protocol which implements a number of features that Bitcoin itself does not offer. These include token issuance, a fully decentralized and trustless asset exchange, contracts for difference, native oracles and trustless gaming."}),"\n",(0,o.jsx)(e.h3,{id:"how-does-counterparty-work",children:"How does Counterparty work?"}),"\n",(0,o.jsxs)(e.p,{children:["Counterparty works by \u2018writing in the margins\u2019 of Bitcoin transactions, and all Counterparty transactions are Bitcoin transactions with additional data that the Counterparty software can read and interpret. To a regular Bitcoin client, these transactions look like normal Bitcoin transactions, with one party sending another party a very small amount of Bitcoin. A Counterparty node (which runs the Bitcoin client along with ",(0,o.jsx)(e.a,{href:"https://github.com/CounterpartyXCP/counterparty-core",children:"Counterparty Core"}),") will recognize and interpret the data in these Bitcoin transactions based on specific rules. From this, it constructs its own ledger of Counterparty transactions and Counterparty network state."]}),"\n",(0,o.jsx)(e.h3,{id:"what-does-a-counterparty-transaction-look-like",children:"What does a Counterparty transaction look like?"}),"\n",(0,o.jsxs)(e.p,{children:[(0,o.jsx)(e.a,{href:"https://counterpartychain.io/transaction/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f",children:"Here"})," is a record of a Counterparty transaction where one address is sending 48 SJCX tokens (a custom token used by ",(0,o.jsx)(e.a,{href:"https://storj.io/",children:"Storj"}),") to another address."]}),"\n",(0,o.jsxs)(e.p,{children:[(0,o.jsx)(e.a,{href:"https://blockchain.info/tx/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f",children:"Here"})," is what this transaction looks like to a blockchain.info, a popular Bitcoin block explorer. You can see that while it is indeed a Bitcoin transaction, the amount of Bitcoin moved is small. In reality, the BTC spent is just enough to compensate the Bitcoin miners to include the transaction in a block. Essentially, the user that sent the transaction is paying the Bitcoin network to record and secure this embedded Counterparty data."]}),"\n",(0,o.jsx)(e.h3,{id:"does-counterparty-have-its-own-blockchain",children:"Does Counterparty have its own blockchain?"}),"\n",(0,o.jsxs)(e.p,{children:["Counterparty lives entirely on the Bitcoin blockchain. Such a protocol is sometimes called a ",(0,o.jsx)(e.strong,{children:"metaprotocol"})," or ",(0,o.jsx)(e.strong,{children:"metachain"}),"."]}),"\n",(0,o.jsx)(e.h3,{id:"is-counterparty-polluting-the-bitcoin-blockchain-then",children:'Is Counterparty "polluting" the Bitcoin blockchain, then?'}),"\n",(0,o.jsxs)(e.p,{children:["The vast majority of Counterparty transactions utilize a data-encoding method called ",(0,o.jsx)(e.code,{children:"OP_RETURN"}),', which is fully "prunable". This means that the data may be safely discarded by Bitcoin nodes that don\'t wish to store it. Unprunable Counterparty transactions use alternative encoding methods. However, these outputs for these transactions do not stay in the memory of Bitcoin nodes for very long. Of course, every Counterparty transaction pays a fair fee to the network for being mined.']}),"\n",(0,o.jsx)(e.h3,{id:"how-is-the-counterparty-network-secured",children:"How is the Counterparty network secured?"}),"\n",(0,o.jsxs)(e.p,{children:["Counterparty transactions are just as secure as regular Bitcoin transactions because Counterparty transactions ",(0,o.jsx)(e.em,{children:"are"})," Bitcoin transactions, so Bitcoin miners validate the entire history of the Counterparty network. It is no easier to attack Counterparty than it is to attack Bitcoin itself."]}),"\n",(0,o.jsx)(e.h3,{id:"how-do-the-counterparty-nodes-stay-in-sync-whats-to-stop-one-node-from-disagreeing-with-another",children:"How do the Counterparty nodes stay in sync? What's to stop one node from disagreeing with another?"}),"\n",(0,o.jsx)(e.p,{children:'As all Counterparty nodes run the same code, and all receive the same Bitcoin transaction data, the ledgers across each node match exactly. Counterparty nodes are not like Bitcoin nodes in that they don\'t communicate with each other directly: they simply connect to the Bitcoin software and download transactions from it, decoding each one as they go along. In this way, the immense security and computing power behind Bitcoin is leveraged as the "transport network" for Counterparty data.'})]})}function l(t={}){const{wrapper:e}={...(0,a.R)(),...t.components};return e?(0,o.jsx)(e,{...t,children:(0,o.jsx)(d,{...t})}):d(t)}},8453:(t,e,n)=>{n.d(e,{R:()=>i,x:()=>s});var o=n(6540);const a={},r=o.createContext(a);function i(t){const e=o.useContext(r);return o.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function s(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(a):t.components||a:i(t.components),o.createElement(r.Provider,{value:e},t.children)}}}]);