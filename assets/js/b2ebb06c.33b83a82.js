"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[133],{5814:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var n=t(4848),i=t(8453);const r={title:"Understanding Assets on Counterparty"},a=void 0,o={id:"basics/assets/counterparty-assets",title:"Understanding Assets on Counterparty",description:'With Counterparty, users can create their own assets (also known as "tokens", "coins" or "currencies") inside the Bitcoin blockchain. These are seperate from Bitcoin the currency itself, but exist entirely inside ordinary Bitcoin transactions. Tokens can be received, stored, and sent from any Bitcoin address to any other. They can also be placed in cold storage. Unlike Colored Coins, Counterparty tokens are not tied to the BTC balance of any given address. This means that sending/receiving bitcoins has no effect on the balance of tokens.',source:"@site/docs/basics/assets/counterparty-assets.md",sourceDirName:"basics/assets",slug:"/basics/assets/counterparty-assets",permalink:"/docs/basics/assets/counterparty-assets",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/assets/counterparty-assets.md",tags:[],version:"current",frontMatter:{title:"Understanding Assets on Counterparty"},sidebar:"basics",previous:{title:"Basic Usage",permalink:"/docs/basics/usage"},next:{title:"Enhanced Asset Info",permalink:"/docs/basics/assets/enhanced-asset"}},c={},d=[{value:"Creating assets",id:"creating-assets",level:2},{value:"The different kinds of assets",id:"the-different-kinds-of-assets",level:3},{value:"Sending assets (<code>send</code>)",id:"sending-assets-send",level:2},{value:"Paying distributions on assets",id:"paying-distributions-on-assets",level:2},{value:"Trading on the decentralized exchange",id:"trading-on-the-decentralized-exchange",level:2},{value:"Creating an order",id:"creating-an-order",level:3},{value:"Protocol-based trustless escrow",id:"protocol-based-trustless-escrow",level:3},{value:"Automatic order matching on the Bitcoin blockchain",id:"automatic-order-matching-on-the-bitcoin-blockchain",level:4},{value:"A straightforward case",id:"a-straightforward-case",level:4},{value:"Matching an order: partially fulfilling an order",id:"matching-an-order-partially-fulfilling-an-order",level:4},{value:"Trading BTC on the Decentralized Exchange",id:"trading-btc-on-the-decentralized-exchange",level:4}];function l(e){const s={code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(s.p,{children:['With Counterparty, users can create their own assets (also known as "tokens", "coins" or "currencies") ',(0,n.jsx)(s.em,{children:"inside"})," the Bitcoin blockchain. These are seperate from Bitcoin the currency itself, but exist entirely inside ordinary Bitcoin transactions. Tokens can be received, stored, and sent from any Bitcoin address to any other. They can also be placed in cold storage. Unlike Colored Coins, Counterparty tokens are ",(0,n.jsx)(s.em,{children:"not"})," tied to the BTC balance of any given address. This means that sending/receiving bitcoins has no effect on the balance of tokens."]}),"\n",(0,n.jsxs)(s.p,{children:["Among other features, Counterparty adds the ability ",(0,n.jsx)(s.em,{children:"create"}),", ",(0,n.jsx)(s.em,{children:"send"}),", ",(0,n.jsx)(s.em,{children:"trade"}),", and ",(0,n.jsx)(s.em,{children:"pay distributions on"})," assets, in a fully decentralized and trustless manner. While Counterparty has its own internal currency (XCP), trading and creating assets does not require anything apart from regular Bitcoin transaction fees."]}),"\n",(0,n.jsx)(s.h2,{id:"creating-assets",children:"Creating assets"}),"\n",(0,n.jsxs)(s.p,{children:["Counterparty allows users to ",(0,n.jsx)(s.em,{children:"issue assets"}),". An asset that is created within the Counterparty protocol is often called a ",(0,n.jsx)(s.em,{children:"user-created token"}),". User-created tokens are just as real as XCP or even BTC. With the asset issuance function, every user has the ability to create a new currency project inside the Bitcoin and Counterparty ecosystem."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.em,{children:"You can create two different types of assets:"})}),"\n",(0,n.jsxs)(s.ol,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Named"}),": A unique string of 4 to 12 uppercase Latin characters (inclusive) not beginning with \u2018A\u2019. Alphabetic tokens carry a one\u2010time issuance fee of ",(0,n.jsx)(s.code,{children:"0.5 XCP"})," to discourage spam and squatting. This fee is burned (permanently taken out of circulation). ",(0,n.jsx)(s.code,{children:"BTC"})," and ",(0,n.jsx)(s.code,{children:"XCP"})," are the only three\u2010character asset names. For more information, see the Assets section in the Counterparty specification."]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Numeric (Free)"}),": An integer between ",(0,n.jsx)(s.code,{children:"26^12 + 1"})," and ",(0,n.jsx)(s.code,{children:"256^8"})," (inclusive), prefixed with ",(0,n.jsx)(s.code,{children:"A"}),". Numeric assets only require one Bitcoin transaction fee to be created."]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"the-different-kinds-of-assets",children:"The different kinds of assets"}),"\n",(0,n.jsx)(s.p,{children:"The most basic kind of asset must specify:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["who is issuing it (",(0,n.jsx)(s.code,{children:"source"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["the name of the asset (",(0,n.jsx)(s.code,{children:"asset"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["how much of ",(0,n.jsx)(s.code,{children:"asset"})," is being issued (",(0,n.jsx)(s.code,{children:"quantity"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["a description of asset (",(0,n.jsx)(s.code,{children:"description"}),")"]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["It is possible to issue more of ",(0,n.jsx)(s.code,{children:"asset"}),", but, at any one time, there can only be one address which issues ",(0,n.jsx)(s.code,{children:"asset"}),". With that said, the Counterparty protocol allows ",(0,n.jsx)(s.code,{children:"source"})," to transfer issuance rights of ",(0,n.jsx)(s.code,{children:"asset"}),". Moreover, an asset can also be locked, so that there can be no further issuances of it. (See the instructions on how to do this with ",(0,n.jsx)(s.code,{children:"counterparty-wallet"}),"). A description must always be included, even if ",(0,n.jsx)(s.code,{children:"description"})," is just an empty string; the syntax of an asset ",(0,n.jsx)(s.em,{children:"with no description"})," is ",(0,n.jsx)(s.code,{children:'description=""'}),".\nBeyond creating the most basic asset, it is also possible to make assets either ",(0,n.jsx)(s.em,{children:"divisible"})," or ",(0,n.jsx)(s.em,{children:"callable"}),". If an asset is made divisible (or callable) upon its initial issuance, it must always be divisible (or callable) with every issuance thereafter. A divisible user-created asset is, like, Bitcoin and XCP, divisible up to 8 decimal places. A callable asset is an asset which the issuer can call back (i.e. repurchase) from its owners at a date (",(0,n.jsx)(s.code,{children:"call-date"}),") and for a price (",(0,n.jsx)(s.code,{children:"call-price"}),") specified at the initial issuance."]}),"\n",(0,n.jsxs)(s.h2,{id:"sending-assets-send",children:["Sending assets (",(0,n.jsx)(s.code,{children:"send"}),")"]}),"\n",(0,n.jsx)(s.p,{children:"To send an asset in Counterparty, one must specify:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["who is sending the asset (",(0,n.jsx)(s.code,{children:"source"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["what asset ",(0,n.jsx)(s.code,{children:"source"})," is sending (",(0,n.jsx)(s.code,{children:"asset"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["how much of ",(0,n.jsx)(s.code,{children:"asset"})," ",(0,n.jsx)(s.code,{children:"source"})," is sending (",(0,n.jsx)(s.code,{children:"quantity"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["to whom ",(0,n.jsx)(s.code,{children:"source"})," is sending ",(0,n.jsx)(s.code,{children:"quantity"})," of asset (",(0,n.jsx)(s.code,{children:"destination"}),")"]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"paying-distributions-on-assets",children:"Paying distributions on assets"}),"\n",(0,n.jsxs)(s.p,{children:["It is possible to distribute funds proportionally among asset holders using the ",(0,n.jsx)(s.code,{children:"distribution"})," function. This feature is also also known as ",(0,n.jsx)(s.code,{children:"dividend payments"}),", depending on their desired purpose. Distributions are paid in in any ",(0,n.jsx)(s.code,{children:"distribution_asset"})," to everyone who holds the asset in proportion to how many units he holds; specifically: Let ",(0,n.jsx)(s.code,{children:"total"})," equal the total distribution paid out, and ",(0,n.jsx)(s.code,{children:"quantity"})," be the total amount of asset, then: ",(0,n.jsx)(s.code,{children:"quantity-per-unit = total/quantity"})]}),"\n",(0,n.jsx)(s.p,{children:"Distributions can be paid out to any assets that you ownership and control over. You can freely select the currency in which distributions are to be paid out: BTC, XCP, or any other user-created asset."}),"\n",(0,n.jsx)(s.h2,{id:"trading-on-the-decentralized-exchange",children:"Trading on the decentralized exchange"}),"\n",(0,n.jsxs)(s.p,{children:["Counterparty supports ",(0,n.jsx)(s.em,{children:"peer-to-peer asset exchange"}),": users can trade assets with no middleman and no counterparty risk. The platform upon which trading is done is Counterparty\u2019s ",(0,n.jsx)(s.em,{children:"decentralized exchange"})," and the Bitcoin blockchain. In what follows trading on the decentralized exchange will be detailed and explained by means of examples. For the purposes of the following use-cases:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\u201cordern\u201d denotes the ",(0,n.jsx)(s.em,{children:"nth"})," order in time, ",(0,n.jsx)(s.code,{children:"give_asset n"})," denotes\nthe asset being given in the order, etc."]}),"\n",(0,n.jsx)(s.li,{children:"Sally\u2019s creates order1 and Alice creates order2"}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.code,{children:"give_asset2 = get_asset1"})}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"creating-an-order",children:"Creating an order"}),"\n",(0,n.jsxs)(s.p,{children:["At its most basic level, a trade on Counterparty\u2019s decentralized\nexchange consists of two ",(0,n.jsx)(s.em,{children:"orders"}),", which are ",(0,n.jsx)(s.em,{children:"matched"})," by the protocol.\nWhen Sally is constructing her order, she must specify:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["her address (",(0,n.jsx)(s.code,{children:"source"}),"1)"]}),"\n",(0,n.jsxs)(s.li,{children:["the asset she will give (",(0,n.jsx)(s.code,{children:"give_asset1"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["the quantity of ",(0,n.jsx)(s.code,{children:"give_asset1"})," she will give (",(0,n.jsx)(s.code,{children:"give_quantity1"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["the asset she will get (",(0,n.jsx)(s.code,{children:"get_asset"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["the quantity of ",(0,n.jsx)(s.code,{children:"get_asset1"})," she will get (",(0,n.jsx)(s.code,{children:"get_quantity"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:["how long before her order expires (",(0,n.jsx)(s.code,{children:"expiration1"}),")"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"protocol-based-trustless-escrow",children:"Protocol-based trustless escrow"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"The Counterparty protocol acts as an escrow service, and thereby eliminates counterparty risk from the exchange of assets."})," Once Sally publishes her order ",(0,n.jsx)(s.code,{children:"give_quantity1"})," of ",(0,n.jsx)(s.code,{children:"give_asset1"})," is debited from her address; her address is debited ",(0,n.jsx)(s.em,{children:"before"})," her order is matched with Alice\u2019s, and so she cannot spend those funds before ",(0,n.jsx)(s.code,{children:"expiration1"})," passes, i.e. until her order expires. In the meantime, Sally\u2019s funds are not lost or borrowed, they are held by the protocol itself. If another order is placed which satisfies Sally\u2019s order, the protocol matches them, and sends each counterparty its respective funds."]}),"\n",(0,n.jsx)(s.h4,{id:"automatic-order-matching-on-the-bitcoin-blockchain",children:"Automatic order matching on the Bitcoin blockchain"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"give_quantity1 / get_quantity1"}),' is the "ratio" in which Sally will exchange ',(0,n.jsx)(s.code,{children:"give_asset1"})," for ",(0,n.jsx)(s.code,{children:"get_asset1"}),", and is denoted by ",(0,n.jsx)(s.code,{children:"ratio1"}),". In order for two orders to be matched, ",(0,n.jsx)(s.code,{children:"ratio1  must always be\u2019\u2018greater than or equal\u2019\u2019 to the inverse of "}),"ratio2",(0,n.jsx)(s.code,{children:", Thus, if, for example "}),"ratio2 (give_quantity1 + 1) / get_quantity1",(0,n.jsx)(s.code,{children:"would be high enough ratio to match Sally\u2019s bet, but if"}),"ratio2 =(quantity2 - 1) / quantity2",(0,n.jsx)(s.code,{children:"it would not. Having been matched, the exchange is always made at"}),"ratio1`. Further, when when an order is matched, the exchange is always settled as much as it can be."]}),"\n",(0,n.jsx)(s.h4,{id:"a-straightforward-case",children:"A straightforward case"}),"\n",(0,n.jsxs)(s.p,{children:["Suppose that Alice places order2 before ",(0,n.jsx)(s.code,{children:"expiration"}),"1 which matches order1 perfectly: ",(0,n.jsx)(s.code,{children:"give_quantity2 == get_quantity1"})," ",(0,n.jsx)(s.code,{children:"get_quantity2 == give_quantity1"}),". Once Alice has made her order, the protocol debits ",(0,n.jsx)(s.code,{children:"quantity2"})," of ",(0,n.jsx)(s.code,{children:"asset2"})," from her address, and, since her order satisfies Sally\u2019s, Alice\u2019s order funds are sent to Alice, and Sally\u2019s order funds are sent to Alice. This completes the trade between Alice and Sally."]}),"\n",(0,n.jsx)(s.h4,{id:"matching-an-order-partially-fulfilling-an-order",children:"Matching an order: partially fulfilling an order"}),"\n",(0,n.jsxs)(s.p,{children:["For the following example, let ",(0,n.jsx)(s.code,{children:"give_quantity1 = 10"})," and ",(0,n.jsx)(s.code,{children:"get_quantity1 = 20"}),", and that neither ",(0,n.jsx)(s.code,{children:"give_asset1"})," nor ",(0,n.jsx)(s.code,{children:"get_asset1"})," is BTC. Suppose that Alice wants to match Sally\u2019s order, does not want all 10 of ",(0,n.jsx)(s.code,{children:"give_asset"}),"; rather, she only wants 8."]}),"\n",(0,n.jsxs)(s.p,{children:["Since the ",(0,n.jsx)(s.code,{children:"ratio1 == 10/20 == 1/2"}),", Alice must ",(0,n.jsx)(s.code,{children:"ratio2 >= 2/1"}),", to match Sally\u2019s order. In other words Alice must offer \u2018\u2019at least\u2019\u201816 of ",(0,n.jsx)(s.code,{children:"asset_2"})," to get 8 of ",(0,n.jsx)(s.code,{children:"asset_1"})," from Sally\u2019s order. Let\u2019s say Alice constructs order2 such that ",(0,n.jsx)(s.code,{children:"give_quantity2 == 18"})," and hence ",(0,n.jsx)(s.code,{children:"ratio2 = 18/8 > 2/1"}),". The order will be settled at ",(0,n.jsx)(s.code,{children:"ratio1"}),": for every unit of ",(0,n.jsx)(s.code,{children:"give_asset1"})," that Sally gives Alice, she will get two units of ",(0,n.jsx)(s.code,{children:"get_asset1"}),". Moreover, since every trade is settled as much and ",(0,n.jsx)(s.code,{children:"give_quantity2 == 18"})," Sally will receive\u2019\u201818\u2019\u2019 ",(0,n.jsx)(s.code,{children:"get_asset1"})," in exchange for 9 ",(0,n.jsx)(s.code,{children:"give_asset1"}),"."]}),"\n",(0,n.jsx)(s.h4,{id:"trading-btc-on-the-decentralized-exchange",children:"Trading BTC on the Decentralized Exchange"}),"\n",(0,n.jsxs)(s.p,{children:["Suppose Sally makes an order to trade ",(0,n.jsx)(s.code,{children:"asset"})," in exchange for BTC, and Alice makes an order to trade BTC in exchange for ",(0,n.jsx)(s.code,{children:"asset"}),". Upon placing order1, Sally\u2019s account is immediately debited, as usual, and, once Alice has placed ",(0,n.jsx)(s.code,{children:"order2"}),", it is matched with ",(0,n.jsx)(s.code,{children:"order1"}),". However, her BTC is not debited from her account, and the protocol will not send her Sally\u2019s XCP until Alice sends her BTC using Counterparty\u2019s ",(0,n.jsx)(s.code,{children:"btcpay"})," function. If Alice sends the BTC using ",(0,n.jsx)(s.code,{children:"btcpay"})," in \u2018\u2019fewer than 10 blocks\u2019\u2019, the protocol will send her the XCP and thereby complete the transaction, otherwise, the trade expires, and the protocol will re-credit Sally\u2019s address with ",(0,n.jsx)(s.code,{children:"give_asset"}),"."]})]})}function h(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,s,t)=>{t.d(s,{R:()=>a,x:()=>o});var n=t(6540);const i={},r=n.createContext(i);function a(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);