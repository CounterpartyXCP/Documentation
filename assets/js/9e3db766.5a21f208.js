"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[645],{6081:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var t=l(4848),s=l(8453);const r={title:"Manual Installation"},a=void 0,i={id:"basics/manual-installation",title:"Manual Installation",description:"Counterparty Core can be installed on most platforms but, for now, manual installation is being tested and is only officially supported on Ubuntu 22.04 and MacOS.",source:"@site/docs/basics/manual-installation.md",sourceDirName:"basics",slug:"/basics/manual-installation",permalink:"/docs/basics/manual-installation",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/basics/manual-installation.md",tags:[],version:"current",frontMatter:{title:"Manual Installation"},sidebar:"basics",previous:{title:"Getting Started",permalink:"/docs/basics/getting-started"},next:{title:"Basic Usage",permalink:"/docs/basics/usage"}},o={},c=[{value:"Install dependencies",id:"install-dependencies",level:2},{value:"Install Bitcoin Core",id:"install-bitcoin-core",level:3},{value:"Install Rust",id:"install-rust",level:3},{value:"Install Addrindexrs",id:"install-addrindexrs",level:3},{value:"Install Python &gt;= 3.10 and Maturin",id:"install-python--310-and-maturin",level:3},{value:"Install LevelDB",id:"install-leveldb",level:3},{value:"Install Counterparty Core",id:"install-counterparty-core",level:2},{value:"Upgrade Counterparty Core",id:"upgrade-counterparty-core",level:2},{value:"Notes",id:"notes",level:3},{value:"Update from 10.0.0 to 10.1.0 or from 10.1.0 to 10.1.1",id:"update-from-1000-to-1010-or-from-1010-to-1011",level:4}];function d(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Counterparty Core can be installed on most platforms but, for now, manual installation is being tested and is only officially supported on Ubuntu 22.04 and MacOS."}),"\n",(0,t.jsx)(n.p,{children:"Dependencies:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Bitcoin Core"}),"\n",(0,t.jsx)(n.li,{children:"AddrIndexRS"}),"\n",(0,t.jsx)(n.li,{children:"Python >= 3.10"}),"\n",(0,t.jsx)(n.li,{children:"Rust"}),"\n",(0,t.jsx)(n.li,{children:"Maturin"}),"\n",(0,t.jsx)(n.li,{children:"LevelDB"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"install-dependencies",children:"Install dependencies"}),"\n",(0,t.jsx)(n.h3,{id:"install-bitcoin-core",children:"Install Bitcoin Core"}),"\n",(0,t.jsxs)(n.p,{children:["Download the latest ",(0,t.jsx)(n.a,{href:"https://github.com/bitcoin/bitcoin/releases",children:"Bitcoin Core"})," and create\na ",(0,t.jsx)(n.code,{children:"bitcoin.conf"})," file (by default located in ",(0,t.jsx)(n.code,{children:"~.bitcoin/"}),") with the following options:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"rpcuser=rpc\nrpcpassword=rpc\nserver=1\naddresstype=legacy\ntxindex=1\nprune=0\nmempoolfullrbf=1\nrpcworkqueue=100\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Adding the following lines, and opening up port ",(0,t.jsx)(n.code,{children:"8333"})," to incoming traffic, may improve your sync speed:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"listen=1\ndbcache=4000\n"})}),"\n",(0,t.jsx)(n.h3,{id:"install-rust",children:"Install Rust"}),"\n",(0,t.jsxs)(n.p,{children:["The recommended way to install Rust is to use ",(0,t.jsx)(n.code,{children:"rustup"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh\nsource \"$HOME/.cargo/env\"\n"})}),"\n",(0,t.jsxs)(n.p,{children:["See ",(0,t.jsx)(n.a,{href:"https://www.rust-lang.org/tools/install",children:"https://www.rust-lang.org/tools/install"})," for more information."]}),"\n",(0,t.jsx)(n.h3,{id:"install-addrindexrs",children:"Install Addrindexrs"}),"\n",(0,t.jsxs)(n.p,{children:["Download and install the latest ",(0,t.jsx)(n.a,{href:"https://github.com/CounterpartyXCP/addrindexrs",children:"AddrIndexRS"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/CounterpartyXCP/addrindexrs.git\ncd addrindexrs\ncargo install --path=.\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Start ",(0,t.jsx)(n.code,{children:"addrindexrs"})," with:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"addrindexrs --cookie=rpc:rpc -vvv\n"})}),"\n",(0,t.jsxs)(n.p,{children:["When working with a remote full node or low-memory system, you can tell ",(0,t.jsx)(n.code,{children:"addrindexrs"})," to use JSON-RPC to communicate with ",(0,t.jsx)(n.code,{children:"bitcoind"})," using the flag ",(0,t.jsx)(n.code,{children:"--jsonrpc-import"}),".\nYou can also limit the resources available for ",(0,t.jsx)(n.code,{children:"addrindexrs"})," with:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"ulimit -n 8192\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Use ",(0,t.jsx)(n.code,{children:"addrindexrs -h"})," for more options."]}),"\n",(0,t.jsx)(n.h3,{id:"install-python--310-and-maturin",children:"Install Python >= 3.10 and Maturin"}),"\n",(0,t.jsx)(n.p,{children:"On Ubuntu 22.04 and similar:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"apt-get install -y python3 python3-dev python3-pip\npip3 install maturin\n"})}),"\n",(0,t.jsx)(n.p,{children:"On MacOS:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brew install python\npip3 install maturin\n"})}),"\n",(0,t.jsxs)(n.p,{children:["See ",(0,t.jsx)(n.a,{href:"https://brew.sh/",children:"https://brew.sh/"})," to install Homewrew."]}),"\n",(0,t.jsx)(n.h3,{id:"install-leveldb",children:"Install LevelDB"}),"\n",(0,t.jsx)(n.p,{children:"On Ubuntu 22.04 and similar:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"apt-get install -y libleveldb-dev\n"})}),"\n",(0,t.jsx)(n.p,{children:"On MacOS:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brew install leveldb\n"})}),"\n",(0,t.jsx)(n.h2,{id:"install-counterparty-core",children:"Install Counterparty Core"}),"\n",(0,t.jsxs)(n.p,{children:["Download the latest version ",(0,t.jsx)(n.code,{children:"counterparty-core"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/CounterpartyXCP/counterparty-core.git\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Install the ",(0,t.jsx)(n.code,{children:"counterparty-rs"})," library:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd counterparty-core/counterparty-rs\npip3 install .\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Install the ",(0,t.jsx)(n.code,{children:"counterparty-core"})," library:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd counterparty-core/counterparty-core\npip3 install .\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Install the ",(0,t.jsx)(n.code,{children:"counterparty-wallet"})," library:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd counterparty-core/counterparty-wallet\npip3 install .\n"})}),"\n",(0,t.jsxs)(n.p,{children:["On most platforms you need to update your $PATH variable so that ",(0,t.jsx)(n.code,{children:"counterparty-server"})," and ",(0,t.jsx)(n.code,{children:"counterparty-wallet"})," are accessible. For example:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"export PATH=$PATH:/home/username/.local/bin/\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Look at the ",(0,t.jsx)(n.code,{children:"counterparty-core"})," and ",(0,t.jsx)(n.code,{children:"counterparty-wallet"})," installation logs to find out the path of the binaries on your system."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"Note for MacOS users"})}),"\n",(0,t.jsx)(n.p,{children:"Use this command if you get an error while installing one of the packages:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'CFLAGS="-I/opt/homebrew/include -L/opt/homebrew/lib"\n'})}),"\n",(0,t.jsx)(n.h2,{id:"upgrade-counterparty-core",children:"Upgrade Counterparty Core"}),"\n",(0,t.jsx)(n.p,{children:"To update, simply follow the same procedure as for installation."}),"\n",(0,t.jsx)(n.h3,{id:"notes",children:"Notes"}),"\n",(0,t.jsx)(n.h4,{id:"update-from-1000-to-1010-or-from-1010-to-1011",children:"Update from 10.0.0 to 10.1.0 or from 10.1.0 to 10.1.1"}),"\n",(0,t.jsx)(n.p,{children:"given the change of names of certain packages you must start by uninstalling the previous version:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"pip uninstall counterparty-lib counterparty-cli counterparty-core\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,l)=>{l.d(n,{R:()=>a,x:()=>i});var t=l(6540);const s={},r=t.createContext(s);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);