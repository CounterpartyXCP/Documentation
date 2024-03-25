"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[365],{876:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var n=o(4848),a=o(8453);const r={title:"Frequently Asked Questions"},s=void 0,i={id:"basics/faq",title:"Frequently Asked Questions",description:"Can I secure my XCP and Counterparty tokens in cold storage?",source:"@site/docs/basics/faq.md",sourceDirName:"basics",slug:"/basics/faq",permalink:"/docs/basics/faq",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/faq.md",tags:[],version:"current",frontMatter:{title:"Frequently Asked Questions"}},c={},d=[{value:"Can I secure my XCP and Counterparty tokens in cold storage?",id:"can-i-secure-my-xcp-and-counterparty-tokens-in-cold-storage",level:3},{value:"Is a 51% attack against Counterparty possible?",id:"is-a-51-attack-against-counterparty-possible",level:3},{value:"So can the Counterparty Team rewrite the Counterparty ledger\u2019s history, in an emergency or by decree? How does that compare to the same risks with Bitcoin Core devs?",id:"so-can-the-counterparty-team-rewrite-the-counterparty-ledgers-history-in-an-emergency-or-by-decree-how-does-that-compare-to-the-same-risks-with-bitcoin-core-devs",level:3},{value:"What about support for other blockchains instead of Bitcoin?",id:"what-about-support-for-other-blockchains-instead-of-bitcoin",level:3},{value:"What happens if and when <code>OP_RETURN</code> data is auto-pruned?",id:"what-happens-if-and-when-op_return-data-is-auto-pruned",level:3},{value:"How are blockchain reorganizations (&quot;reorgs&quot;) handled by Counterparty?",id:"how-are-blockchain-reorganizations-reorgs-handled-by-counterparty",level:3},{value:"How can a thin client trustlessly lookup the Bitcoin public address associated with the OSTOCK asset name?",id:"how-can-a-thin-client-trustlessly-lookup-the-bitcoin-public-address-associated-with-the-ostock-asset-name",level:3}];function h(e){const t={a:"a",code:"code",h3:"h3",p:"p",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h3,{id:"can-i-secure-my-xcp-and-counterparty-tokens-in-cold-storage",children:"Can I secure my XCP and Counterparty tokens in cold storage?"}),"\n",(0,n.jsx)(t.p,{children:"Yes. You can make a regular Bitcoin paper wallet and store them there. Later, you can sweep the funds into a Counterparty wallet."}),"\n",(0,n.jsx)(t.h3,{id:"is-a-51-attack-against-counterparty-possible",children:"Is a 51% attack against Counterparty possible?"}),"\n",(0,n.jsx)(t.p,{children:'As every Counterparty transaction is a Bitcoin transaction, to do a "51% attack" on Counterparty you would have to do a 51% attack on Bitcoin.'}),"\n",(0,n.jsx)(t.h3,{id:"so-can-the-counterparty-team-rewrite-the-counterparty-ledgers-history-in-an-emergency-or-by-decree-how-does-that-compare-to-the-same-risks-with-bitcoin-core-devs",children:"So can the Counterparty Team rewrite the Counterparty ledger\u2019s history, in an emergency or by decree? How does that compare to the same risks with Bitcoin Core devs?"}),"\n",(0,n.jsx)(t.p,{children:"It\u2019s identical to the case with Bitcoin. The Bitcoin core devs could publish a copy of Bitcoin Core that does anything, but no one would download it."}),"\n",(0,n.jsxs)(t.p,{children:["Counterparty is 100% open source, with ",(0,n.jsx)(t.a,{href:"https://github.com/CounterpartyXCP/counterparty-core/releases",children:"a list of code changes"})," from one release to the next visible for all to see and inspect."]}),"\n",(0,n.jsx)(t.h3,{id:"what-about-support-for-other-blockchains-instead-of-bitcoin",children:"What about support for other blockchains instead of Bitcoin?"}),"\n",(0,n.jsx)(t.p,{children:'Counterparty is built on Bitcoin. That has always been the case and we do not see it changing, ever. For other blockchains, there are "forks" of the Counterparty software. Examples would be Dogeparty for Dogecoin, and Viacoin\'s ClearingHouse.'}),"\n",(0,n.jsxs)(t.h3,{id:"what-happens-if-and-when-op_return-data-is-auto-pruned",children:["What happens if and when ",(0,n.jsx)(t.code,{children:"OP_RETURN"})," data is auto-pruned?"]}),"\n",(0,n.jsx)(t.p,{children:"Counterparty only needs some Bitcoin full nodes somewhere to have an unpruned copy of the blockchain. As every Counterparty full node is also a Bitcoin full node, this is easily done."}),"\n",(0,n.jsx)(t.h3,{id:"how-are-blockchain-reorganizations-reorgs-handled-by-counterparty",children:'How are blockchain reorganizations ("reorgs") handled by Counterparty?'}),"\n",(0,n.jsx)(t.p,{children:"Blockchain reorganizations are essentially handled by Counterparty the same way they are handled by Bitcoin. The Counterparty database is log-structured. This means that Counterparty simply deletes all the database rows written after a certain block to execute a rollback, and then process new transactions on the now-longest chain."}),"\n",(0,n.jsx)(t.h3,{id:"how-can-a-thin-client-trustlessly-lookup-the-bitcoin-public-address-associated-with-the-ostock-asset-name",children:"How can a thin client trustlessly lookup the Bitcoin public address associated with the OSTOCK asset name?"}),"\n",(0,n.jsx)(t.p,{children:"You can use a local copy of the blockchain just fine. The only difference between Counterparty and Bitcoin here is that Counterparty doesn't support SPV."})]})}function l(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},8453:(e,t,o)=>{o.d(t,{R:()=>s,x:()=>i});var n=o(6540);const a={},r=n.createContext(a);function s(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);