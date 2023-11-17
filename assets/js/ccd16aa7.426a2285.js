"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[7083],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>h});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),u=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(r),m=n,h=c["".concat(o,".").concat(m)]||c[m]||p[m]||i;return r?a.createElement(h,s(s({ref:t},d),{},{components:r})):a.createElement(h,s({ref:t},d))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,s=new Array(i);s[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[c]="string"==typeof e?e:n,s[1]=l;for(var u=2;u<i;u++)s[u]=r[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3587:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var a=r(7462),n=(r(7294),r(3905));const i={title:"Using multisig with Counterwallet"},s=void 0,l={unversionedId:"wallets/counterwallet-tutorials/multisig",id:"wallets/counterwallet-tutorials/multisig",title:"Using multisig with Counterwallet",description:"Counterparty and Counterwallet support a basic form of multisig. Here\u2019s an example of the process involved with creating and sending to and from a multisig address. Currently, 1-of-2, 2-of-2, 1-of-3, 2-of-3 and 3-of-3 multisig are supported at the moment.",source:"@site/docs/wallets/counterwallet-tutorials/multisig.md",sourceDirName:"wallets/counterwallet-tutorials",slug:"/wallets/counterwallet-tutorials/multisig",permalink:"/docs/wallets/counterwallet-tutorials/multisig",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/wallets/counterwallet-tutorials/multisig.md",tags:[],version:"current",frontMatter:{title:"Using multisig with Counterwallet"},sidebar:"wallets",previous:{title:"Decentralized Exchange",permalink:"/docs/wallets/counterwallet-tutorials/dex-trade"},next:{title:"Show QR Code for Address",permalink:"/docs/wallets/counterwallet-tutorials/show-qrcode"}},o={},u=[{value:"Creating a 2-of-3 multisig address:",id:"creating-a-2-of-3-multisig-address",level:2},{value:"To Receive BTC or a Counterparty asset to the multisig address:",id:"to-receive-btc-or-a-counterparty-asset-to-the-multisig-address",level:2},{value:"To Send BTC or a Counterparty asset from the multisig address:",id:"to-send-btc-or-a-counterparty-asset-from-the-multisig-address",level:2}],d={toc:u},c="wrapper";function p(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Counterparty and Counterwallet support a basic form of multisig. Here\u2019s an example of the process involved with creating and sending to and from a multisig address. Currently, 1-of-2, 2-of-2, 1-of-3, 2-of-3 and 3-of-3 multisig are supported at the moment. "),(0,n.kt)("p",null,"In this example, we\u2019ll use a ",(0,n.kt)("strong",{parentName:"p"},"2-of-3")," multisig. With our multisig support, you may send and receive Bitcoin or any Counterparty asset (including XCP) in Counterwallet."),(0,n.kt)("h2",{id:"creating-a-2-of-3-multisig-address"},"Creating a 2-of-3 multisig address:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Create 3 separate Counterwallet accounts. (Each one will normally be owned by a separate person, although this is not a requirement.)"),(0,n.kt)("li",{parentName:"ul"},"Each new wallet will have 1 Bitcoin/Counterparty address by default. That will be utilized for the multisig"),(0,n.kt)("li",{parentName:"ul"},"Send some Bitcoin to each address in each of the 3 wallets"),(0,n.kt)("li",{parentName:"ul"},"For each address in each of the 3 wallets, send a very small amount (e.g. 0.0001) from them back to the sender address. This is necessary to broadcast each address' public key onto the blockchain, which Counterparty multisig currently requires to operate."),(0,n.kt)("li",{parentName:"ul"},"In the first Counterwallet, click ",(0,n.kt)("strong",{parentName:"li"},"Create New Address"),", then choose ",(0,n.kt)("strong",{parentName:"li"},"Create Multisig Address")),(0,n.kt)("li",{parentName:"ul"},"On the dialog that appears, select 2-of-3 for ",(0,n.kt)("strong",{parentName:"li"},"Type"),", and enter the 3 addresses from the 3 separate Counterwallet accounts"),(0,n.kt)("li",{parentName:"ul"},"A multisig address entry will be created in that first Counterwallet account. Get that address by clicking on address area of the titlebar for it, and copying it. It will be in a format like: ",(0,n.kt)("em",{parentName:"li"},"2_1HrSbJR3fcjCDrp2mMJCzGrWR7jtYu4wq5_1Dzfoo4QmhMtHNthmC8hZBry3KPS9FUtgo_152f1muMCNa7goXYhYAQC61hxEgGacmncB_3")),(0,n.kt)("li",{parentName:"ul"},"Send a bit of BTC (e.g .001, .005, etc) to this multisig address from another address in your Counterwallet. This will be necessary for sending things ",(0,n.kt)("em",{parentName:"li"},"from")," the multi-sig address")),(0,n.kt)("h2",{id:"to-receive-btc-or-a-counterparty-asset-to-the-multisig-address"},"To Receive BTC or a Counterparty asset to the multisig address:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"You can send to this address from another Counterwallet address just like you would with any other address, e.g. click ",(0,n.kt)("strong",{parentName:"li"},"Send")," for the appropriate asset in the appropriate sending address, paste in the full multisig address (as in above), and click ",(0,n.kt)("strong",{parentName:"li"},"Send")," again.")),(0,n.kt)("h2",{id:"to-send-btc-or-a-counterparty-asset-from-the-multisig-address"},"To Send BTC or a Counterparty asset from the multisig address:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Log into the Counterwallet for the first multisig signer (which will have the entry for the multisig address)"),(0,n.kt)("li",{parentName:"ul"},"For the multisig address, click Address Actions, click ",(0,n.kt)("strong",{parentName:"li"},"Send")," for the appropriate asset, and fill out the required info."),(0,n.kt)("li",{parentName:"ul"},"A raw unsigned TX will be produced once the Send dialog\u2019s ",(0,n.kt)("strong",{parentName:"li"},"Send")," button is clicked "),(0,n.kt)("li",{parentName:"ul"},"On the 1st address that makes up that multisig (which, following this example, should be in that same Counterwallet account), click ",(0,n.kt)("strong",{parentName:"li"},"Address Actions"),", then click ",(0,n.kt)("strong",{parentName:"li"},"Sign Transaction")),(0,n.kt)("li",{parentName:"ul"},"Paste in the unsigned transaction and click ",(0,n.kt)("strong",{parentName:"li"},"Sign")),(0,n.kt)("li",{parentName:"ul"},"Copy the resultant text and send (email, etc) to the 2nd party"),(0,n.kt)("li",{parentName:"ul"},"The 2nd party will then do the same thing (sign the transaction in their Counterwallet account from their address that makes up 1 of the 3-of-3 multisig), except instead of clicking Sign, they will click ",(0,n.kt)("strong",{parentName:"li"},"Sign and Broadcast"),", as they will be the last signer."),(0,n.kt)("li",{parentName:"ul"},"(",(0,n.kt)("strong",{parentName:"li"},"NOTE:")," If you were doing this with a 3-of-3 multisig address, for instance, the 2nd party would instead just click ",(0,n.kt)("strong",{parentName:"li"},"Sign")," and then send to the 3rd party, who would do ",(0,n.kt)("strong",{parentName:"li"},"Sign and Broadcast"),". I.e. you will get as many signatures as you need, and the last party will sign and broadcast the transaction.)"),(0,n.kt)("li",{parentName:"ul"},"Upon clicking this, the fully signed multisig transaction is broadcast on the network and, once confirmed, the sent funds are disbursed.")))}p.isMDXComponent=!0}}]);