"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[4885],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=d(n),h=i,m=p["".concat(l,".").concat(h)]||p[h]||u[h]||r;return n?a.createElement(m,s(s({ref:t},c),{},{components:n})):a.createElement(m,s({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=h;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[p]="string"==typeof e?e:i,s[1]=o;for(var d=2;d<r;d++)s[d]=n[d];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},5498:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const r={title:"Understanding assets on Counterparty"},s=void 0,o={unversionedId:"basics/assets/counterparty-assets",id:"basics/assets/counterparty-assets",title:"Understanding assets on Counterparty",description:'With Counterparty, users can create their own assets (also known as "tokens", "coins" or "currencies") inside the Bitcoin blockchain. These are seperate from Bitcoin the currency itself, but exist entirely inside ordinary Bitcoin transactions. Tokens can be received, stored, and sent from any Bitcoin address to any other. They can also be placed in cold storage. Unlike Colored Coins, Counterparty tokens are not tied to the BTC balance of any given address. This means that sending/receiving bitcoins has no effect on the balance of tokens.',source:"@site/docs/basics/assets/counterparty-assets.md",sourceDirName:"basics/assets",slug:"/basics/assets/counterparty-assets",permalink:"/docs/basics/assets/counterparty-assets",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/assets/counterparty-assets.md",tags:[],version:"current",frontMatter:{title:"Understanding assets on Counterparty"},sidebar:"basics",previous:{title:"An incencentivization token",permalink:"/docs/basics/what-is-counterparty/an-incentivization-token"},next:{title:"Enhanced Asset Info",permalink:"/docs/basics/assets/enhanced-asset"}},l={},d=[{value:"Creating assets",id:"creating-assets",level:2},{value:"The different kinds of assets",id:"the-different-kinds-of-assets",level:3},{value:"Sending assets (<code>send</code>)",id:"sending-assets-send",level:2},{value:"Paying distributions on assets",id:"paying-distributions-on-assets",level:2},{value:"Trading on the decentralized exchange",id:"trading-on-the-decentralized-exchange",level:2},{value:"Creating an order",id:"creating-an-order",level:3},{value:"Protocol-based trustless escrow",id:"protocol-based-trustless-escrow",level:3},{value:"Automatic order matching on the Bitcoin blockchain",id:"automatic-order-matching-on-the-bitcoin-blockchain",level:4},{value:"A straightforward case",id:"a-straightforward-case",level:4},{value:"Matching an order: partially fulfilling an order",id:"matching-an-order-partially-fulfilling-an-order",level:4},{value:"Trading BTC on the decentralized exchange",id:"trading-btc-on-the-decentralized-exchange",level:4}],c={toc:d},p="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,'With Counterparty, users can create their own assets (also known as "tokens", "coins" or "currencies") ',(0,i.kt)("em",{parentName:"p"},"inside")," the Bitcoin blockchain. These are seperate from Bitcoin the currency itself, but exist entirely inside ordinary Bitcoin transactions. Tokens can be received, stored, and sent from any Bitcoin address to any other. They can also be placed in cold storage. Unlike Colored Coins, Counterparty tokens are ",(0,i.kt)("em",{parentName:"p"},"not")," tied to the BTC balance of any given address. This means that sending/receiving bitcoins has no effect on the balance of tokens."),(0,i.kt)("p",null,"Among other features, Counterparty adds the ability ",(0,i.kt)("em",{parentName:"p"},"create"),", ",(0,i.kt)("em",{parentName:"p"},"send"),", ",(0,i.kt)("em",{parentName:"p"},"trade"),", and ",(0,i.kt)("em",{parentName:"p"},"pay distributions on")," assets, in a fully decentralized and trustless manner. While Counterparty has its own internal currency (XCP), trading and creating assets does not require anything apart from regular Bitcoin transaction fees."),(0,i.kt)("p",null,"Many of the features described below can be accessed using the Web-based Counterwallet. Especially casual users and those without a ",(0,i.kt)("inlineCode",{parentName:"p"},"counterparty-cli")," setup can benefit from the convenience of Counterwallet."),(0,i.kt)("h2",{id:"creating-assets"},"Creating assets"),(0,i.kt)("p",null,"Counterparty allows users to ",(0,i.kt)("em",{parentName:"p"},"issue assets"),". An asset that is created\nwithin the Counterparty protocol is often called a ",(0,i.kt)("em",{parentName:"p"},"user-created token"),".\nUser-created tokens are just as real as XCP or even BTC. With the asset\nissuance function, every user has the ability to create a new currency project inside\nthe Bitcoin and Counterparty ecosystem."),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"You can create two different types of assets:")),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Named"),": A unique string of 4 to 12 uppercase Latin characters (inclusive) not beginning with \u2018A\u2019. Alphabetic tokens carry a one\u2010time issuance fee of ",(0,i.kt)("inlineCode",{parentName:"p"},"0.5 XCP")," to discourage spam and squatting. This fee is burned (permanently taken out of circulation). ",(0,i.kt)("inlineCode",{parentName:"p"},"BTC")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"XCP")," are the only three\u2010character asset names. For more information, see the Assets section in the Counterparty specification.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Numeric (Free)"),": An integer between ",(0,i.kt)("inlineCode",{parentName:"p"},"26^12 + 1")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"256^8")," (inclusive), prefixed with ",(0,i.kt)("inlineCode",{parentName:"p"},"A"),". Numeric assets only require one Bitcoin transaction fee to be created."))),(0,i.kt)("h3",{id:"the-different-kinds-of-assets"},"The different kinds of assets"),(0,i.kt)("p",null,"The most basic kind of asset must specify:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"who is issuing it (",(0,i.kt)("inlineCode",{parentName:"li"},"source"),")"),(0,i.kt)("li",{parentName:"ul"},"the name of the asset (",(0,i.kt)("inlineCode",{parentName:"li"},"asset"),")"),(0,i.kt)("li",{parentName:"ul"},"how much of ",(0,i.kt)("inlineCode",{parentName:"li"},"asset")," is being issued (",(0,i.kt)("inlineCode",{parentName:"li"},"quantity"),")"),(0,i.kt)("li",{parentName:"ul"},"a description of asset (",(0,i.kt)("inlineCode",{parentName:"li"},"description"),")")),(0,i.kt)("p",null,"It is possible to issue\nmore of ",(0,i.kt)("inlineCode",{parentName:"p"},"asset"),", but, at any one time, there can only be one address\nwhich issues ",(0,i.kt)("inlineCode",{parentName:"p"},"asset"),". With that said, the Counterparty protocol allows\n",(0,i.kt)("inlineCode",{parentName:"p"},"source")," to transfer issuance rights of ",(0,i.kt)("inlineCode",{parentName:"p"},"asset"),". Moreover, an asset can\nalso be locked, so that there can be no further issuances of it. (See\nthe instructions on how to do this with ",(0,i.kt)("inlineCode",{parentName:"p"},"counterparty-cli"),").\nA description must always be included, even if ",(0,i.kt)("inlineCode",{parentName:"p"},"description")," is just an\nempty string; the syntax of an asset ",(0,i.kt)("em",{parentName:"p"},"with no description")," is\n",(0,i.kt)("inlineCode",{parentName:"p"},'description=""'),"."),(0,i.kt)("p",null,"Beyond creating the most basic asset, it is also possible to make assets\neither ",(0,i.kt)("em",{parentName:"p"},"divisible")," or ",(0,i.kt)("em",{parentName:"p"},"callable"),". If an asset is made divisible (or\ncallable) upon its initial issuance, it must always be divisible (or\ncallable) with every issuance thereafter. A divisible user-created asset\nis, like, Bitcoin and XCP, divisible up to 8 decimal places. A callable\nasset is an asset which the issuer can call back (i.e. repurchase) from\nits owners at a date (",(0,i.kt)("inlineCode",{parentName:"p"},"call-date"),") and for a price (",(0,i.kt)("inlineCode",{parentName:"p"},"call-price"),")\nspecified at the initial issuance."),(0,i.kt)("h2",{id:"sending-assets-send"},"Sending assets (",(0,i.kt)("inlineCode",{parentName:"h2"},"send"),")"),(0,i.kt)("p",null,"To send an asset in Counterparty, one must specify:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"who is sending the asset (",(0,i.kt)("inlineCode",{parentName:"li"},"source"),")"),(0,i.kt)("li",{parentName:"ul"},"what asset ",(0,i.kt)("inlineCode",{parentName:"li"},"source")," is sending (",(0,i.kt)("inlineCode",{parentName:"li"},"asset"),")"),(0,i.kt)("li",{parentName:"ul"},"how much of ",(0,i.kt)("inlineCode",{parentName:"li"},"asset")," ",(0,i.kt)("inlineCode",{parentName:"li"},"source")," is sending (",(0,i.kt)("inlineCode",{parentName:"li"},"quantity"),")"),(0,i.kt)("li",{parentName:"ul"},"to whom ",(0,i.kt)("inlineCode",{parentName:"li"},"source")," is sending ",(0,i.kt)("inlineCode",{parentName:"li"},"quantity")," of asset (",(0,i.kt)("inlineCode",{parentName:"li"},"destination"),")")),(0,i.kt)("h2",{id:"paying-distributions-on-assets"},"Paying distributions on assets"),(0,i.kt)("p",null,"It is possible to distribute funds proportionally among asset holders using the ",(0,i.kt)("inlineCode",{parentName:"p"},"distribution"),"\nfunction. This feature is also also known as ",(0,i.kt)("inlineCode",{parentName:"p"},"dividend payments"),", depending on their desired purpose. Distributions are paid in in any ",(0,i.kt)("inlineCode",{parentName:"p"},"distribution_asset")," to everyone who\nholds the asset in proportion to how many units he holds; specifically:\nLet ",(0,i.kt)("inlineCode",{parentName:"p"},"total")," equal the total distribution paid out, and\n",(0,i.kt)("inlineCode",{parentName:"p"},"quantity")," be the total amount of asset, then:\n",(0,i.kt)("inlineCode",{parentName:"p"},"quantity-per-unit = total/quantity")),(0,i.kt)("p",null,"Distributions can be paid out to any assets that you ownership and control over. You can freely select the currency in which distributions are to be paid out: BTC, XCP, or any other user-created asset."),(0,i.kt)("h2",{id:"trading-on-the-decentralized-exchange"},"Trading on the decentralized exchange"),(0,i.kt)("p",null,"Counterparty supports ",(0,i.kt)("em",{parentName:"p"},"peer-to-peer asset exchange"),": users can trade\nassets with no middleman and no counterparty risk. The platform upon\nwhich trading is done is Counterparty\u2019s ",(0,i.kt)("em",{parentName:"p"},"decentralized exchange")," and the Bitcoin blockchain. In\nwhat follows trading on the decentralized exchange will be detailed and\nexplained by means of examples. For the purposes of the following\nuse-cases:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u201cordern\u201d denotes the ",(0,i.kt)("em",{parentName:"li"},"nth")," order in time, ",(0,i.kt)("inlineCode",{parentName:"li"},"give_asset n")," denotes\nthe asset being given in the order, etc."),(0,i.kt)("li",{parentName:"ul"},"Sally\u2019s creates order1 and Alice creates order2"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"give_asset2 = get_asset1"))),(0,i.kt)("h3",{id:"creating-an-order"},"Creating an order"),(0,i.kt)("p",null,"At its most basic level, a trade on Counterparty\u2019s decentralized\nexchange consists of two ",(0,i.kt)("em",{parentName:"p"},"orders"),", which are ",(0,i.kt)("em",{parentName:"p"},"matched")," by the protocol.\nWhen Sally is constructing her order, she must specify:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"her address (",(0,i.kt)("inlineCode",{parentName:"li"},"source"),"1)"),(0,i.kt)("li",{parentName:"ul"},"the asset she will give (",(0,i.kt)("inlineCode",{parentName:"li"},"give_asset1"),")"),(0,i.kt)("li",{parentName:"ul"},"the quantity of ",(0,i.kt)("inlineCode",{parentName:"li"},"give_asset1")," she will give (",(0,i.kt)("inlineCode",{parentName:"li"},"give_quantity1"),")"),(0,i.kt)("li",{parentName:"ul"},"the asset she will get (",(0,i.kt)("inlineCode",{parentName:"li"},"get_asset"),")"),(0,i.kt)("li",{parentName:"ul"},"the quantity of ",(0,i.kt)("inlineCode",{parentName:"li"},"get_asset1")," she will get (",(0,i.kt)("inlineCode",{parentName:"li"},"get_quantity"),")"),(0,i.kt)("li",{parentName:"ul"},"how long before her order expires (",(0,i.kt)("inlineCode",{parentName:"li"},"expiration1"),")")),(0,i.kt)("h3",{id:"protocol-based-trustless-escrow"},"Protocol-based trustless escrow"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"The Counterparty protocol acts as an escrow service, and\nthereby eliminates counterparty risk from the exchange of assets."),"\nOnce Sally publishes her order ",(0,i.kt)("inlineCode",{parentName:"p"},"give_quantity1")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"give_asset1")," is\ndebited from her address; her address is debited ",(0,i.kt)("em",{parentName:"p"},"before")," her order is\nmatched with Alice\u2019s, and so she cannot spend those funds before\n",(0,i.kt)("inlineCode",{parentName:"p"},"expiration1")," passes, i.e. until her order expires. In the meantime,\nSally\u2019s funds are not lost or borrowed, they are held by the protocol\nitself. If\nanother order is placed which satisfies Sally\u2019s order, the protocol\nmatches them, and sends each counterparty its respective funds."),(0,i.kt)("h4",{id:"automatic-order-matching-on-the-bitcoin-blockchain"},"Automatic order matching on the Bitcoin blockchain"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"give_quantity1 / get_quantity1"),' is the "ratio" in which Sally will\nexchange ',(0,i.kt)("inlineCode",{parentName:"p"},"give_asset1")," for ",(0,i.kt)("inlineCode",{parentName:"p"},"get_asset1"),", and is denoted by ",(0,i.kt)("inlineCode",{parentName:"p"},"ratio1"),". In\norder for two orders to be matched, ",(0,i.kt)("inlineCode",{parentName:"p"},"ratio1  must always be\u2019\u2018greater\nthan or equal\u2019\u2019 to the inverse of "),"ratio2",(0,i.kt)("inlineCode",{parentName:"p"},", Thus, if, for example\n"),"ratio2 (give_quantity1 + 1) / get_quantity1",(0,i.kt)("inlineCode",{parentName:"p"},"would be high enough\nratio to match Sally\u2019s bet, but if"),"ratio2 =(quantity2 - 1) / quantity2",(0,i.kt)("inlineCode",{parentName:"p"},"it would not. Having been\nmatched, the exchange is always made at"),"ratio1`. Further, when when an\norder is matched, the exchange is always settled as much as it can be."),(0,i.kt)("h4",{id:"a-straightforward-case"},"A straightforward case"),(0,i.kt)("p",null,"Suppose that Alice places order2 before ",(0,i.kt)("inlineCode",{parentName:"p"},"expiration"),"1 which matches\norder1 perfectly: ",(0,i.kt)("inlineCode",{parentName:"p"},"give_quantity2 == get_quantity1"),"\n",(0,i.kt)("inlineCode",{parentName:"p"},"get_quantity2 == give_quantity1"),". Once Alice has made her order, the\nprotocol debits ",(0,i.kt)("inlineCode",{parentName:"p"},"quantity2")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"asset2")," from her address, and, since\nher order satisfies Sally\u2019s, Alice\u2019s order funds are sent to Alice, and\nSally\u2019s order funds are sent to Alice. This completes the trade between\nAlice and Sally."),(0,i.kt)("h4",{id:"matching-an-order-partially-fulfilling-an-order"},"Matching an order: partially fulfilling an order"),(0,i.kt)("p",null,"For the following example, let ",(0,i.kt)("inlineCode",{parentName:"p"},"give_quantity1 = 10")," and\n",(0,i.kt)("inlineCode",{parentName:"p"},"get_quantity1 = 20"),", and that neither ",(0,i.kt)("inlineCode",{parentName:"p"},"give_asset1")," nor ",(0,i.kt)("inlineCode",{parentName:"p"},"get_asset1"),"\nis BTC. Suppose that Alice wants to match Sally\u2019s order, does not want\nall 10 of ",(0,i.kt)("inlineCode",{parentName:"p"},"give_asset"),"; rather, she only wants 8."),(0,i.kt)("p",null,"Since the ",(0,i.kt)("inlineCode",{parentName:"p"},"ratio1 == 10/20 == 1/2"),", Alice must ",(0,i.kt)("inlineCode",{parentName:"p"},"ratio2 >= 2/1"),", to match\nSally\u2019s order. In other words Alice must offer \u2018\u2019at least\u2019\u201816 of\n",(0,i.kt)("inlineCode",{parentName:"p"},"asset_2")," to get 8 of ",(0,i.kt)("inlineCode",{parentName:"p"},"asset_1")," from Sally\u2019s order. Let\u2019s say Alice\nconstructs order2 such that ",(0,i.kt)("inlineCode",{parentName:"p"},"give_quantity2 == 18")," and hence\n",(0,i.kt)("inlineCode",{parentName:"p"},"ratio2 = 18/8 > 2/1"),". The order will be settled at ",(0,i.kt)("inlineCode",{parentName:"p"},"ratio1"),": for every\nunit of ",(0,i.kt)("inlineCode",{parentName:"p"},"give_asset1")," that Sally gives Alice, she will get two units of\n",(0,i.kt)("inlineCode",{parentName:"p"},"get_asset1"),". Moreover, since every trade is settled as much and\n",(0,i.kt)("inlineCode",{parentName:"p"},"give_quantity2 == 18")," Sally will receive\u2019\u201818\u2019\u2019 ",(0,i.kt)("inlineCode",{parentName:"p"},"get_asset1")," in exchange\nfor 9 ",(0,i.kt)("inlineCode",{parentName:"p"},"give_asset1"),"."),(0,i.kt)("h4",{id:"trading-btc-on-the-decentralized-exchange"},"Trading BTC on the decentralized exchange"),(0,i.kt)("p",null,"Suppose Sally makes an order to trade ",(0,i.kt)("inlineCode",{parentName:"p"},"asset")," in exchange for BTC, and\nAlice makes an order to trade BTC in exchange for ",(0,i.kt)("inlineCode",{parentName:"p"},"asset"),". Upon placing\norder1, Sally\u2019s account is immediately debited, as usual, and, once\nAlice has placed ",(0,i.kt)("inlineCode",{parentName:"p"},"order2"),", it is matched with ",(0,i.kt)("inlineCode",{parentName:"p"},"order1"),". However, her BTC is\nnot debited from her account, and the protocol will not send her Sally\u2019s\nXCP until Alice sends her BTC using Counterparty\u2019s ",(0,i.kt)("inlineCode",{parentName:"p"},"btcpay")," function. If\nAlice sends the BTC using ",(0,i.kt)("inlineCode",{parentName:"p"},"btcpay")," in \u2018\u2019fewer than 10 blocks\u2019\u2019, the\nprotocol will send her the XCP and thereby complete the transaction,\notherwise, the trade expires, and the protocol will re-credit Sally\u2019s\naddress with ",(0,i.kt)("inlineCode",{parentName:"p"},"give_asset"),". This feature is enabled on the CLI, and disabled on ",(0,i.kt)("a",{parentName:"p",href:"http://counterwallet.io"},"Counterwallet"),", due to incompatibility with the browser-based security model."))}u.isMDXComponent=!0}}]);