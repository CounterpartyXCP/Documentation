"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[738],{3857:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>c,toc:()=>h});var s=n(4848),i=n(8453);const o={},a="Atomic Swap with UTXO Support",c={id:"advanced/how-to/atomic-swap",title:"Atomic Swap with UTXO Support",description:"With the new attach and detach functionalities which allow you to attach and detach assets from a UTXO, it is now possible to do Atomic Swaps like Ordinals.",source:"@site/docs/advanced/how-to/atomic-swap.md",sourceDirName:"advanced/how-to",slug:"/advanced/how-to/atomic-swap",permalink:"/docs/advanced/how-to/atomic-swap",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/advanced/how-to/atomic-swap.md",tags:[],version:"current",frontMatter:{},sidebar:"advanced",previous:{title:"Sentry Integration",permalink:"/docs/advanced/how-to/sentry-integration"},next:{title:"Make Dispenses Normal Counterparty Transactions",permalink:"/docs/advanced/specifications/enable-dispense-tx"}},r={},h=[];function d(e){const t={code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"atomic-swap-with-utxo-support",children:"Atomic Swap with UTXO Support"}),"\n",(0,s.jsxs)(t.p,{children:["With the new ",(0,s.jsx)(t.code,{children:"attach"})," and ",(0,s.jsx)(t.code,{children:"detach"})," functionalities which allow you to attach and detach assets from a UTXO, it is now possible to do Atomic Swaps like Ordinals."]}),"\n",(0,s.jsx)(t.p,{children:"This guide details the different steps from opening a sell order to executing the buy order using Bitcoin Core for examples."}),"\n",(0,s.jsx)(t.h1,{id:"step-1-generation-of-a-psbt-by-the-seller",children:"Step 1: Generation of a PSBT by the seller"}),"\n",(0,s.jsxs)(t.p,{children:["After attaching assets to the UTXO ",(0,s.jsx)(t.code,{children:"$UTXO_TXID:$UTXO_VOUT"}),", the seller ",(0,s.jsx)(t.code,{children:"$SELLER_ADDRESS"})," can decide to sell them at the price ",(0,s.jsx)(t.code,{children:"$PRICE_BTC"}),". To do this, he must first prepare a \u201csale order\u201d in the form of a signed PSBT:"]}),"\n",(0,s.jsxs)(t.p,{children:["Creation of the PSBT ",(0,s.jsx)(t.code,{children:"$SELLER_PSBT"})]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:'$ bitcoin-cli createpsbt \'[{"txid":"$UTXO_TXID", "vout":"$UTXO_VOUT"}]\' \\\n\'[{"$SELLER_ADDRESS": "$PRICE_BTC"}]\'\n'})}),"\n",(0,s.jsx)(t.p,{children:"Signature of PSBT"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"$ bitcoin-cli walletprocesspsbt $SELLER_PSBT\n"})}),"\n",(0,s.jsx)(t.h1,{id:"step-2-dissemination-of-the-psbt",children:"Step 2: Dissemination of the PSBT"}),"\n",(0,s.jsx)(t.p,{children:"The seller can then share the PSBT in the way that seems most appropriate to him."}),"\n",(0,s.jsx)(t.h1,{id:"step-3-generation-of-a-psbt-by-the-buyer",children:"Step 3: Generation of a PSBT by the buyer"}),"\n",(0,s.jsx)(t.p,{children:"Once collected by a potential buyer, he creates a PSBT with the inputs of the sum necessary to pay for the assets and an output for the exchange."}),"\n",(0,s.jsxs)(t.p,{children:["After having determined the list of UTXOs with the ",(0,s.jsx)(t.code,{children:"listunspent"})," command, calculated the exchange ",(0,s.jsx)(t.code,{children:"$CHANGE"})," and the fees, the buyer ",(0,s.jsx)(t.code,{children:"$BUYER_ADDRESS"}),"can create his PSBT ",(0,s.jsx)(t.code,{children:"$BUYER_PSBT"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:'$ bitcoin-cli createpsbt \'[{"txid":"$UTXO1_TXID", "vout":"$UTXO2_VOUT"}, \u2026]\' \\\n\'[{"$BUYER_ADDRESS": "$CHANGE"}]\'\n'})}),"\n",(0,s.jsx)(t.h1,{id:"step-4-joining-the-psbts-of-the-seller-and-the-buyer",children:"Step 4: Joining the PSBTs of the seller and the buyer"}),"\n",(0,s.jsxs)(t.p,{children:["We must now join the two PSBTs into a single PSBT ",(0,s.jsx)(t.code,{children:"$PSBT_FINAL"})," with the ",(0,s.jsx)(t.code,{children:"joinpsbts"})," function."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Attention"}),": the ",(0,s.jsx)(t.code,{children:"joinpsbts"})," function mixes the inputs and outputs randomly, you must therefore repeat the operation until the first output belongs to the buyer. Indeed, it is always the first non-OP_RETURN output which is the destination of the atomic swap."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:'$ bitcoin-cli joinpsbts \'["$BUYER_PSBT", "$SELLER_PSBT"]\'\n'})}),"\n",(0,s.jsx)(t.h1,{id:"step-5-signature-finalization-and-broadcast-of-the-transaction",children:"Step 5: Signature, finalization and broadcast of the transaction"}),"\n",(0,s.jsxs)(t.p,{children:["Signature of ",(0,s.jsx)(t.code,{children:"$PSBT_FINAL"})]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"$ bitcoin-cli walletprocesspsbt $PSBT_FINAL\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Then finalizing ",(0,s.jsx)(t.code,{children:"$SIGNED_PSBT_FINAL"})]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"$ bitcoin-cli finalizepsbt $SIGNED_PSBT_FINAL\n"})}),"\n",(0,s.jsx)(t.p,{children:"And finally broadcast of the transaction"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"$ bitcoin-cli sendrawtransaction $RAWTRANSACTION\n"})}),"\n",(0,s.jsx)(t.h1,{id:"include-a-counterparty-transaction",children:"Include a Counterparty transaction"}),"\n",(0,s.jsx)(t.p,{children:"It is possible to include a Counterparty transaction inside the transaction used to finalize the atomic swap. For this it is enough:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["use the composition API with the ",(0,s.jsx)(t.code,{children:"return_data_only"})," argument"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["Add the ",(0,s.jsx)(t.code,{children:"CNTRPTY"})," prefix"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["Encrypt with ARC4 using the ",(0,s.jsx)(t.code,{children:"txid"})," of the first input of the transaction"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["Use the ",(0,s.jsx)(t.code,{children:"$DATA"})," obtained in \u201cStep 3: Generation of a PSBT by the buyer\u201d"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:'$ bitcoin-cli createpsbt \'[{"txid":"$UTXO1_TXID", "vout":"$UTXO2_VOUT"}, \u2026]\' \\\n\'[{"$BUYER_ADDRESS": "$CHANGE"}, {"data": "$DATA"}]\'\n'})}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"In \u201cStep 4: Joining the PSBTs of the seller and the buyer\u201d ensure that:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:"The first input belongs to the buyer"}),"\n",(0,s.jsx)(t.li,{children:"The first output is the OP_RETURN"}),"\n",(0,s.jsx)(t.li,{children:"The second output is to the buyer"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Attention"}),": this only works with an OP_RETURN, the size of ",(0,s.jsx)(t.code,{children:"$DATA"})," must therefore not exceed 80 bytes."]})]})}function l(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>c});var s=n(6540);const i={},o=s.createContext(i);function a(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);