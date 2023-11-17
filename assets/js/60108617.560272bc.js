"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[3597],{3905:(t,e,a)=>{a.d(e,{Zo:()=>h,kt:()=>p});var n=a(7294);function o(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){o(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function s(t,e){if(null==t)return{};var a,n,o=function(t,e){if(null==t)return{};var a,n,o={},r=Object.keys(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||(o[a]=t[a]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(o[a]=t[a])}return o}var c=n.createContext({}),l=function(t){var e=n.useContext(c),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},h=function(t){var e=l(t.components);return n.createElement(c.Provider,{value:e},t.children)},u="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var a=t.components,o=t.mdxType,r=t.originalType,c=t.parentName,h=s(t,["components","mdxType","originalType","parentName"]),u=l(a),m=o,p=u["".concat(c,".").concat(m)]||u[m]||d[m]||r;return a?n.createElement(p,i(i({ref:e},h),{},{components:a})):n.createElement(p,i({ref:e},h))}));function p(t,e){var a=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var r=a.length,i=new Array(r);i[0]=m;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=t,s[u]="string"==typeof t?t:o,i[1]=s;for(var l=2;l<r;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5377:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var n=a(7462),o=(a(7294),a(3905));const r={title:"On Smart contracts"},i=void 0,s={unversionedId:"basics/faq/smart-contracts",id:"basics/faq/smart-contracts",title:"On Smart contracts",description:"WARNING: this page is kept for historical purposes and does not represent the current state of counterparty. A new proposal is being built for a specific Counterparty VM.",source:"@site/docs/basics/faq/smart-contracts.md",sourceDirName:"basics/faq",slug:"/basics/faq/smart-contracts",permalink:"/Documentation/docs/basics/faq/smart-contracts",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/faq/smart-contracts.md",tags:[],version:"current",frontMatter:{title:"On Smart contracts"},sidebar:"basics",previous:{title:"Frequently Asked Questions",permalink:"/Documentation/docs/basics/faq/general"},next:{title:"On Lighning Network",permalink:"/Documentation/docs/basics/faq/lightning-network"}},c={},l=[{value:"What is a smart contract?",id:"what-is-a-smart-contract",level:3},{value:"What is the EVM?",id:"what-is-the-evm",level:3},{value:"Can Ethereum smart contracts run on Counterparty?",id:"can-ethereum-smart-contracts-run-on-counterparty",level:3},{value:"What languages can I use to write a smart contract?",id:"what-languages-can-i-use-to-write-a-smart-contract",level:3},{value:"How does it work at a high level?",id:"how-does-it-work-at-a-high-level",level:3},{value:"When will it be released on Bitcoin mainnet?",id:"when-will-it-be-released-on-bitcoin-mainnet",level:3},{value:"Can I use a counterparty asset in a smart contract?",id:"can-i-use-a-counterparty-asset-in-a-smart-contract",level:3},{value:"Can smart contracts work with Bitcoin?",id:"can-smart-contracts-work-with-bitcoin",level:3},{value:"What is used as Gas?",id:"what-is-used-as-gas",level:3},{value:"Won&#39;t that cause deflation of the XCP supply?",id:"wont-that-cause-deflation-of-the-xcp-supply",level:3},{value:"How does Bitcoin\u2019s 10 minute block time affect the EVM?",id:"how-does-bitcoins-10-minute-block-time-affect-the-evm",level:3},{value:"Can payment channels be used with the EVM?",id:"can-payment-channels-be-used-with-the-evm",level:3},{value:"How is this different than Rootstock?",id:"how-is-this-different-than-rootstock",level:3},{value:"Why would an Ethereum developer develop on Counterparty?",id:"why-would-an-ethereum-developer-develop-on-counterparty",level:3},{value:"I heard about The DAO hack. What was the problem?",id:"i-heard-about-the-dao-hack-what-was-the-problem",level:3},{value:"Are my Counterparty assets at risk of any issue with a smart contract?",id:"are-my-counterparty-assets-at-risk-of-any-issue-with-a-smart-contract",level:3},{value:"What are the differences between the current EVM and the one announced in 2014?",id:"what-are-the-differences-between-the-current-evm-and-the-one-announced-in-2014",level:3},{value:"How will the Counterparty team deal with bugs in specific smart contracts?",id:"how-will-the-counterparty-team-deal-with-bugs-in-specific-smart-contracts",level:3},{value:"Can you walk me through the process to create a smart contract on Counterparty?",id:"can-you-walk-me-through-the-process-to-create-a-smart-contract-on-counterparty",level:3},{value:"How do Smart Contracts \u201cform a consensus\u201d on Counterparty?",id:"how-do-smart-contracts-form-a-consensus-on-counterparty",level:3},{value:"What is a simple smart contract that I, as a non programmer, can create with some simple copy pasting?",id:"what-is-a-simple-smart-contract-that-i-as-a-non-programmer-can-create-with-some-simple-copy-pasting",level:3}],h={toc:l},u="wrapper";function d(t){let{components:e,...a}=t;return(0,o.kt)(u,(0,n.Z)({},h,a,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"WARNING: this page is kept for historical purposes and does not represent the current state of counterparty. A new proposal is being built for a specific Counterparty VM.")),(0,o.kt)("p",null,"[TOC]"),(0,o.kt)("h3",{id:"what-is-a-smart-contract"},"What is a smart contract?"),(0,o.kt)("p",null,"At the level of crypto-currencies, a smart contract is a computer program that is stored on a blockchain and specifies contractual terms, along with possessing the means to enforce those terms."),(0,o.kt)("p",null,"For more information, please see the following:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://bitsonblocks.net/2016/02/01/a-gentle-introduction-to-smart-contracts/"},"A gentle introduction to smart contracts")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Smart_contract"},"Smart contracts Wikipedia page")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"http://szabo.best.vwh.net/smart_contracts_idea.html"},"Nick Szabo\u2019s writings on smart contracts"))),(0,o.kt)("h3",{id:"what-is-the-evm"},"What is the EVM?"),(0,o.kt)("p",null,"From the ",(0,o.kt)("a",{parentName:"p",href:"http://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html"},"Solidity Introduction to Smart Contracts"),":"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u201cThe Ethereum Virtual Machine or EVM is the runtime environment for smart contracts in Ethereum. It is not only sandboxed but actually completely isolated, which means that code running inside the EVM has no access to network, filesystem or other processes. Smart contracts even have limited access to other smart contracts.\u201d")),(0,o.kt)("p",null,"The EVM is not a virtual machine like VMWare, instead it is a protected sandbox for smart contract execution."),(0,o.kt)("h3",{id:"can-ethereum-smart-contracts-run-on-counterparty"},"Can Ethereum smart contracts run on Counterparty?"),(0,o.kt)("p",null,"Yes. Counterparty supports the same smart contract functionality that Ethereum does. There are a few minor tweaks (e.g. hardcoded addresses needing to change) but any Solidity or Serpent smart contract from Ethereum should be able to work on Counterparty with very little or no modification."),(0,o.kt)("h3",{id:"what-languages-can-i-use-to-write-a-smart-contract"},"What languages can I use to write a smart contract?"),(0,o.kt)("p",null,"We support both Solidity and Serpent."),(0,o.kt)("h3",{id:"how-does-it-work-at-a-high-level"},"How does it work at a high level?"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"You write the smart contract code (using Solidity or Serpent) and compile it to a more compact form (bytecode)"),(0,o.kt)("li",{parentName:"ul"},"Counterparty will create and broadcast a ",(0,o.kt)("inlineCode",{parentName:"li"},"publish"),' transaction to embed this contract code into the Bitcoin blockchain. This is done in a way that is spendable and doesn\'t "pollute" the blockchain'),(0,o.kt)("li",{parentName:"ul"},'Once published, the smart contract "lives" at an address, which looks like a regular Bitcoin address, but starts with a ',(0,o.kt)("inlineCode",{parentName:"li"},"C")),(0,o.kt)("li",{parentName:"ul"},"You can then use Counterparty to create and broadcast an ",(0,o.kt)("inlineCode",{parentName:"li"},"execute")," transaction to call a specific function or method in the smart contract code"),(0,o.kt)("li",{parentName:"ul"},"Once an execution transaction is broadcast and confirmed by a Bitcoin miner, every running Counterparty node will receive this request, and execute that method. As the smart contract code executes, it modifies the contract state, which is stored in the Counterparty database. Since each Counterparty node has the same contract code (guaranteed by Bitcoin) as well as the same EVM code, and the code is all ",(0,o.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Deterministic_algorithm"},"deterministic"),", these state changes are the same for every node"),(0,o.kt)("li",{parentName:"ul"},"Others can also send Counterparty assets to the smart contract, which will store them and can use them in future ",(0,o.kt)("inlineCode",{parentName:"li"},"execute")," calls. This is useful for things like funding contracts, for instance"),(0,o.kt)("li",{parentName:"ul"},"Essentially, we see that the publishing of smart contracts and the command to kick off the execution of a specific function or method in a contract are made as actual transactions on the Bitcoin blockchain. Thus, these two operations are limited by Bitcoin's ~10 minute blocktimes. However, once an execution of smart contract code is kicked off, it generally runs as fast as the node can process it")),(0,o.kt)("h3",{id:"when-will-it-be-released-on-bitcoin-mainnet"},"When will it be released on Bitcoin mainnet?"),(0,o.kt)("p",null,'Basically, "When It Is Ready" (TM). A lot of it depends on how good of a job the community can do testing the EVM code on testnet. Nonetheless, we have an agressive timeschedule (within the guidance of prudent safety measures), and an interest to release as soon as we deem it ready. Realistically, we expect sometime in Autumn of this year (2016) for the mainnet release.'),(0,o.kt)("h3",{id:"can-i-use-a-counterparty-asset-in-a-smart-contract"},"Can I use a counterparty asset in a smart contract?"),(0,o.kt)("p",null,"Yes, smart contracts may hold and control any Counterparty asset, such as XCP, SJCX, CAKE, and more."),(0,o.kt)("h3",{id:"can-smart-contracts-work-with-bitcoin"},"Can smart contracts work with Bitcoin?"),(0,o.kt)("p",null,"While Counterparty smart contracts can interact with any Counterparty asset, they cannot control or send Bitcoin. Using ",(0,o.kt)("a",{parentName:"p",href:"http://btcrelay.org/"},"BTC Relay"),", they can peer into the Bitcoin blockchain and perform actions based on if a Bitcoin transaction exists and is valid."),(0,o.kt)("h3",{id:"what-is-used-as-gas"},"What is used as Gas?"),(0,o.kt)("p",null,"XCP is \u201cburned\u201d (destroyed) when smart contracts are executed, to essentially pay the network for their execution."),(0,o.kt)("h3",{id:"wont-that-cause-deflation-of-the-xcp-supply"},"Won't that cause deflation of the XCP supply?"),(0,o.kt)("p",null,"Yes, as unlike ETH, the supply of XCP is fixed. However, this should not endanger the network itself: for a given smart contract execution, the amount of XCP consumed will slowly decrease as the supply in existence shrinks. This will ensure that the amount of XCP never goes to zero."),(0,o.kt)("h3",{id:"how-does-bitcoins-10-minute-block-time-affect-the-evm"},"How does Bitcoin\u2019s 10 minute block time affect the EVM?"),(0,o.kt)("p",null,'After a contract is written, it is "published" to the blockchain, which embeds its data in the blockchain, ensuring that all Counterparty nodes have the same contract code to execute. Once published, a method/function on a contract may then be executed.'),(0,o.kt)("p",null,'Both the publishing operation, as well as any execution operations, are published as a Counterparty transaction (inside a Bitcoin transaction) and thus subject to the block time. However, once a contract executes, it will move from line of code to line of code as quickly as the host computer allows, and individual "steps" within a contract are not subject to block times. Nor is a contract executing another contract (via ',(0,o.kt)("inlineCode",{parentName:"p"},"CALL"),") subject to the block times, and the called contract method (as well as any methods that it calls, and so on) execute immediately."),(0,o.kt)("p",null,"Thus, the block time limit is overall rather minor, and only affects the initial publishing and the initial execution of a contract method."),(0,o.kt)("h3",{id:"can-payment-channels-be-used-with-the-evm"},"Can payment channels be used with the EVM?"),(0,o.kt)("p",null,'Not currently. With the EVM, when a contract\u2019s "state" (i.e. storage data) is modified via an execution operation, all nodes on the Counterparty network must perform the operation at the same time. This is because all contract state must be identical and shared across all nodes.'),(0,o.kt)("p",null,'Payment channels, on the other hand, are essentially a private negotiation between two parties, who, once they agree, will finalize their agreement on the blockchain. This is done via utilizing Bitcoin\u2019s internal scripting language in a certain clever way (i.e. intentional non-broadcast double-spends). The EVM, on the other hand, relies on all nodes updating their state as a contract runs (i.e. no "private negotiations") and does not utilize Bitcoin script directly. Instead, all EVM operations are embedded inside Counterparty protocol data.'),(0,o.kt)("p",null,'So while, technically, the parties could "negotiate" an EVM publish or execute operation, it would not yet be broadcast, and thus, not have any impact on the EVM\u2019s global contract state.'),(0,o.kt)("p",null,'This all being said, there are certain use cases where payment channels could possibly be used for EVM interactions: Two parties may be able to negotiate an execution statement for a contract that only they interact with, and has no interactions or "side effects" to or from other contracts. In this case, they would essentially "pre-run" the contract execution, independently verifying the resulting state changes, and trading modifications of the original execution statement via payment channel mechanics. Once they were both happy with the results, they would commit the finial execution statement to the blockchain, where it would be actually executed, by the network as a whole.'),(0,o.kt)("p",null,"The last bit is rather interesting and is a possible direction for future research and development."),(0,o.kt)("h3",{id:"how-is-this-different-than-rootstock"},"How is this different than Rootstock?"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The Counterparty EVM will operate on Bitcoin mainnet, while Rootstock runs on a sidechain."),(0,o.kt)("li",{parentName:"ul"},"Counterparty uses proven technology (i.e. embedded consensus) that has been in use for > 2.5 years on mainnet. Sidechains are very new and expirimental."),(0,o.kt)("li",{parentName:"ul"},"Rootstock utilizes merged mining and federated pegs in their model. Both of these have a variety of possible issues with them."),(0,o.kt)("li",{parentName:"ul"},"Counterparty is a non-profit effort, Rootstock is commercial (and indeed the commercial entity will be taxing a percentage of gas used to operate the network)."),(0,o.kt)("li",{parentName:"ul"},"On the positive side for Rootstock, their use of a sidechain (if successful) could lead to considerably higher transaction throughput than Bitcoin mainnet. However, if sidechains successfully work out, there\u2019s no reason Counterparty can\u2019t adopt them as well, using the same embedded consensus approach as on mainnet, with much faster block times.")),(0,o.kt)("h3",{id:"why-would-an-ethereum-developer-develop-on-counterparty"},"Why would an Ethereum developer develop on Counterparty?"),(0,o.kt)("p",null,'We don\'t see this as an "either-or" type decision. With very little effort, Ethereum developers can port existing smart contracts to Counterparty, and extend their reach to not just the Ethereum community, but the Bitcoin community as well.'),(0,o.kt)("h3",{id:"i-heard-about-the-dao-hack-what-was-the-problem"},"I heard about The DAO hack. What was the problem?"),(0,o.kt)("p",null,"The problem was not with a bug in the EVM, but a problem in how \u201cThe DAO\u201d smart contract (which was holding > $100 million at the time worth of ETH tokens) was written. Basically, the DAO was written to allow \u201csplitting\u201d, where one or several holders in a DAO can separate off into their own DAO fund if they don\u2019t like the proposals that their current DAO is voting on (more info ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/slockit/DAO/wiki/How-to-split-the-DAO"},"here"),"). This splitting functionality was poorly designed and implemented and had numerous issues in the code. \u201cThe attacker\u201d took advantage of these issues to award himself more ETH than he was entitled to, therefore draining the DAO of funds."),(0,o.kt)("p",null,"So to reiterate, the vulnerability that occurred is due to these bugs in the DAO smart contract, not a security bug in the EVM itself. (Although the Solidity language design can and most likely will be improved to make such smart contract coding mistakes less possible in the future.)"),(0,o.kt)("h3",{id:"are-my-counterparty-assets-at-risk-of-any-issue-with-a-smart-contract"},"Are my Counterparty assets at risk of any issue with a smart contract?"),(0,o.kt)("p",null,"Not if you don\u2019t send those funds to the smart contract (which allows it to control the funds via its code)."),(0,o.kt)("p",null,"Unlike with Ethereum, where smart contracts are a fundamental and required component of most any action beyond sending Ether, our system is designed so that our core feature-set is completely independent of any smart contract functionality. This means that anyone can use Counterparty\u2019s well-tested asset creation, transfer and decentralized trading features without having to interact with or otherwise touch smart contracts."),(0,o.kt)("h3",{id:"what-are-the-differences-between-the-current-evm-and-the-one-announced-in-2014"},"What are the differences between the current EVM and the one announced in 2014?"),(0,o.kt)("p",null,"In comparison to the ",(0,o.kt)("a",{parentName:"p",href:"http://counterparty.io/news/counterparty-recreates-ethereums-smart-contract-platform-on-bitcoin/"},"Proof-of-Concept EVM port")," carried out in late 2014, the current port:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Is with the newest version of the EVM software that is successfully running on Ethereum today and, we believe mature enough for use on Counterparty/Bitcoin mainnet (with appropriate precautions)"),(0,o.kt)("li",{parentName:"ul"},"Adds the ability for smart contracts to interact with Counterparty assets"),(0,o.kt)("li",{parentName:"ul"},"Includes the EVM Safeguard feature (see below)")),(0,o.kt)("h3",{id:"how-will-the-counterparty-team-deal-with-bugs-in-specific-smart-contracts"},"How will the Counterparty team deal with bugs in specific smart contracts?"),(0,o.kt)("p",null,"On Counterparty, authors of smart contracts will be responsible for bugs in their contracts. In contrast to Ethereum, the Counterparty Foundation Board, with development team guidance, has passed a \u201cnon-rollback\u201d amendment to the Bylaws. This policy forbids the Counterparty development team from publishing code to fork and/or roll-back the network as a response to bugs in specific smart contracts. (Where the fault is due to a bug in the underlying EVM -- and not any specific smart contract that runs on it -- the development team will of course write and publish bug fixes.) This action reiterates how Counterparty has been run for over two and a half years, and is in the same spirit of Bitcoin itself: completely decentralized, community-driven, and non-profit."),(0,o.kt)("h3",{id:"can-you-walk-me-through-the-process-to-create-a-smart-contract-on-counterparty"},"Can you walk me through the process to create a smart contract on Counterparty?"),(0,o.kt)("p",null,"We have a \u201cgetting started guide\u201d coming soon."),(0,o.kt)("h3",{id:"how-do-smart-contracts-form-a-consensus-on-counterparty"},"How do Smart Contracts \u201cform a consensus\u201d on Counterparty?"),(0,o.kt)("p",null,"Smart contracts don\u2019t form consensus. Every network participant just executes each contract in the same way (like a \u2018send\u2019 transaction). The consensus is formed with the blockchain determining which contracts exist and the order they are found in. As each network node has the same smart contract code, as well as the same protocol (\u201cconsensus sensitive\u201d) code, that operates on them, the output from the execution of each smart contract call will be the same (as all code that executes is ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Deterministic_algorithm"},"deterministic")," in nature)."),(0,o.kt)("h3",{id:"what-is-a-simple-smart-contract-that-i-as-a-non-programmer-can-create-with-some-simple-copy-pasting"},"What is a simple smart contract that I, as a non programmer, can create with some simple copy pasting?"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'Ethereum has a "hello world" type tutorial ',(0,o.kt)("a",{parentName:"li",href:"https://www.ethereum.org/greeter"},"here"),"."),(0,o.kt)("li",{parentName:"ul"},"Here are ",(0,o.kt)("a",{parentName:"li",href:"https://medium.com/@AroundTheBlock_/a-current-list-of-use-cases-for-ethereum-b8caa5807553#.8a9vmfk12"},"some")," ",(0,o.kt)("a",{parentName:"li",href:"http://cryptorials.io/a-beginners-guide-to-smart-contracts/"},"guides")," that discuss different use cases for smart contracts.")))}d.isMDXComponent=!0}}]);