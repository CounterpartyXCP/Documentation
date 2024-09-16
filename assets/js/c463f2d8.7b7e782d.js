"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[559],{7603:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var n=s(4848),a=s(8453);const o={},i="Gas System",r={id:"advanced/specifications/gas-system",title:"Gas System",description:"When Counterparty was first created, the XCP fees for various transactions were hard-coded to low, constant values (e.g. 0.5 XCP for issuing a named asset). This system was chosen for its simplicity, but it creates significant friction when onboarding users to the Counterparty ecosystem (esp. since it is so hard to acquire XCP) and yet the fees are so low that they have little economic significance for market participants. A proper XCP fee system should be proportional to network traffic and transaction complexity without creating any unnecessary barriers to entry for users of the network. This protocol change will institute just such a system for the new UTXO Support feature by dynamically calculating the fees required to send assets from an address to a UTXO and from a UTXO to an address based on network congestion for this type of transaction.",source:"@site/docs/advanced/specifications/gas-system.md",sourceDirName:"advanced/specifications",slug:"/advanced/specifications/gas-system",permalink:"/docs/advanced/specifications/gas-system",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/advanced/specifications/gas-system.md",tags:[],version:"current",frontMatter:{},sidebar:"advanced",previous:{title:"UTXO Support",permalink:"/docs/advanced/specifications/utxo-support"},next:{title:"Bug Bounties",permalink:"/docs/advanced/bounties"}},c={},d=[];function l(e){const t={a:"a",code:"code",h1:"h1",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"gas-system",children:"Gas System"}),"\n",(0,n.jsx)(t.h1,{id:"motivation",children:"Motivation"}),"\n",(0,n.jsxs)(t.p,{children:["When Counterparty was first created, the XCP fees for various transactions were hard-coded to low, constant values (e.g. 0.5 XCP for issuing a named asset). This system was chosen for its simplicity, but it creates significant friction when onboarding users to the Counterparty ecosystem (esp. since it is so hard to acquire XCP) and yet the fees are so low that they have little economic significance for market participants. A proper XCP fee system should be proportional to network traffic and transaction complexity without creating any unnecessary barriers to entry for users of the network. This protocol change will institute just such a system for the new ",(0,n.jsx)(t.a,{href:"https://www.notion.so/UTXO-Support-7f70fdd934f94e6086716ed33d189e2f?pvs=21",children:"UTXO Support"})," feature by dynamically calculating the fees required to send assets from an address to a UTXO and from a UTXO to an address based on network congestion for this type of transaction."]}),"\n",(0,n.jsx)(t.h1,{id:"design",children:"Design"}),"\n",(0,n.jsx)(t.p,{children:"Fees are calculated based on the number of such transactions in the last difficulty period (2016 blocks) based on the average number of transactions per block in that period."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def calculate_fee(x, a, b, base_fee, k):\n    """\n    Calculate the fee based on the number of transactions per block,\n    ensuring continuity at the transition point.\n    \n    Parameters:\n    x (float): Number of transactions per period\n    a (float): Lower threshold (fee is zero below this)\n    b (float): Upper threshold (transition point to exponential growth)\n    base_fee (float): Base fee amount\n    k (float): Sigmoid steepness factor\n    \n    Returns:\n    float: Calculated fee\n    """\n    def sigmoid(t):\n        return 1 / (1 + math.exp(-k * (t - 0.5)))\n    \n    if x <= a:\n        return 0\n    elif x <= b:\n        return base_fee * sigmoid((x - a) / (b - a))\n    else:\n        # Calculate sigmoid value and derivative at x = b\n        sigmoid_at_b = sigmoid(1)\n        sigmoid_derivative_at_b = k * sigmoid_at_b * (1 - sigmoid_at_b)\n        \n        # Calculate parameters for the exponential part\n        m = sigmoid_derivative_at_b * (b - a) / base_fee\n        c = math.log(m)\n        \n        # Exponential function that matches sigmoid at x = b\n        return base_fee * sigmoid_at_b * math.exp(c * ((x - b) / (b - a)))\n'})}),"\n",(0,n.jsxs)(t.p,{children:["The different parameters (",(0,n.jsx)(t.code,{children:"a"}),", ",(0,n.jsx)(t.code,{children:"b"}),", ",(0,n.jsx)(t.code,{children:"k"}),", ",(0,n.jsx)(t.code,{children:"base_fee"}),") will be stored in ",(0,n.jsx)(t.code,{children:"protocol_changes.json"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Here is what the price evolution looks like as a function of the number of transactions using this function (a sigmoid to an exponential). (Parameters are not final.)"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"sigmoid.png",src:s(10).A+"",width:"719",height:"425"})}),"\n",(0,n.jsx)(t.h1,{id:"api-changes",children:"API Changes"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["New Routes","\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Get Estimated XCP Fees: ",(0,n.jsx)(t.code,{children:"/v2/addresses/<address>/send/compose/estimatexcpfees"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.h1,{id:"database-changes",children:"Database Changes"}),"\n",(0,n.jsxs)(t.p,{children:["To facilitate the calculation of fees, a new table ",(0,n.jsx)(t.code,{children:"transaction_count"})," will be added. For each valid transaction a counter stored in this table will be incremented. This table will contain the following fields:"]}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"transaction_type"})," (for now ",(0,n.jsx)(t.code,{children:"send_from_address_to_utxo"})," or ",(0,n.jsx)(t.code,{children:"send_from_utxo_to_address"}),")"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"difficulty_period"})," (transaction block index modulo 2016)"]}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.strong,{children:"count"})}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},10:(e,t,s)=>{s.d(t,{A:()=>n});const n=s.p+"assets/images/sigmoid-db828c73543dd1ab63b96593146d76a6.png"},8453:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>r});var n=s(6540);const a={},o=n.createContext(a);function i(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);