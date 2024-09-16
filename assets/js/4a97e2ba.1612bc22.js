"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[568],{7184:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var n=r(4848),o=r(8453);const s={title:"Getting Started"},c=void 0,a={id:"basics/getting-started",title:"Getting Started",description:"Install Counterparty Core",source:"@site/docs/basics/getting-started.md",sourceDirName:"basics",slug:"/basics/getting-started",permalink:"/docs/basics/getting-started",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/getting-started.md",tags:[],version:"current",frontMatter:{title:"Getting Started"},sidebar:"basics",previous:{title:"What is Counterparty?",permalink:"/docs/basics/what-is-counterparty"},next:{title:"Manual Installation",permalink:"/docs/basics/manual-installation"}},i={},d=[{value:"Install Counterparty Core",id:"install-counterparty-core",level:2},{value:"Upgrade Counterparty Core",id:"upgrade-counterparty-core",level:2}];function l(e){const t={a:"a",code:"code",em:"em",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"install-counterparty-core",children:"Install Counterparty Core"}),"\n",(0,n.jsxs)(t.p,{children:["The simplest way to get your Counterparty node up and running is to use ",(0,n.jsx)(t.strong,{children:"Docker Compose"}),", which may be installed as described ",(0,n.jsx)(t.a,{href:"https://docs.docker.com/compose/install/",children:"here"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsxs)(t.em,{children:["Note: It is required that you use Docker Compose V2, and it is suggested that you install the plugin as opposed to the standalone ",(0,n.jsx)(t.code,{children:"docker-compose"})," executable"]}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Clone the repo:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"git clone git@github.com:CounterpartyXCP/counterparty-core.git\ncd counterparty-core\n"})}),"\n",(0,n.jsxs)(t.p,{children:["Next, create the directory that will be used to store Counterparty data.\n",(0,n.jsx)(t.strong,{children:"To run a node you must have at least 1.5TB free."})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"mkdir ~/.local/share/counterparty-docker-data\n"})}),"\n",(0,n.jsx)(t.p,{children:"Now we can start the program."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"docker compose --profile mainnet up -d\n"})}),"\n",(0,n.jsxs)(t.p,{children:["Use ",(0,n.jsx)(t.code,{children:"docker compose logs"})," to view output from services. For example:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"docker compose --profile mainnet logs --tail=10 -f bitcoind\ndocker compose --profile mainnet logs --tail=10 -f addrindexrs\ndocker compose --profile mainnet logs --tail=10 -f counterparty-core\n"})}),"\n",(0,n.jsxs)(t.p,{children:["You can use the ",(0,n.jsx)(t.code,{children:"testnet"})," profile to run a ",(0,n.jsx)(t.code,{children:"testnet"})," node:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"docker compose --profile testnet up -d\n"})}),"\n",(0,n.jsx)(t.p,{children:"NOTES:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["By default, this Docker Compose script makes use of the ",(0,n.jsx)(t.code,{children:"bootstrap"})," functionality, because Docker makes it hard to use ",(0,n.jsx)(t.code,{children:"kickstart"}),". (See below.)"]}),"\n",(0,n.jsxs)(t.li,{children:["When working with a low-memory system, you can tell AddrIndexRs to use JSON-RPC to communicate with Bitcoin Core using the environment variable ",(0,n.jsx)(t.code,{children:"ADDRINDEXRS_JSONRPC_IMPORT"}),": ",(0,n.jsx)(t.code,{children:"ADDRINDEXRS_JSONRPC_IMPORT=true docker compose up -d"})]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"upgrade-counterparty-core",children:"Upgrade Counterparty Core"}),"\n",(0,n.jsxs)(t.p,{children:["Download the latest version of ",(0,n.jsx)(t.code,{children:"counterparty-core"})," and restart ",(0,n.jsx)(t.code,{children:"counterparty-server"})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"cd counterparty-core\ngit pull\ndocker compose stop counterparty-core\ndocker compose --profile mainnet up -d\n"})}),"\n",(0,n.jsxs)(t.p,{children:["NOTE:\nIf you were using a custom version of ",(0,n.jsx)(t.code,{children:"docker-compose.yml"})," that uses the ",(0,n.jsx)(t.code,{children:"latest"})," or ",(0,n.jsx)(t.code,{children:"develop"})," tag, it is recommended to delete the old image before restarting the server:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"docker compose stop counterparty-core\ndocker rmi counterparty/counterparty:latest\ndocker compose --profile mainnet up -d\n"})})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,t,r)=>{r.d(t,{R:()=>c,x:()=>a});var n=r(6540);const o={},s=n.createContext(o);function c(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);