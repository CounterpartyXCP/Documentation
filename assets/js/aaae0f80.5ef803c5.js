"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[186],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=d(n),m=o,k=c["".concat(s,".").concat(m)]||c[m]||u[m]||r;return n?a.createElement(k,i(i({ref:t},p),{},{components:n})):a.createElement(k,i({ref:t},p))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var d=2;d<r;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8162:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var a=n(7462),o=(n(7294),n(3905));const r={title:"Installation"},i=void 0,l={unversionedId:"advanced/federated-node/installation",id:"advanced/federated-node/installation",title:"Installation",description:"On Linux and OS X, install as a non-root sudo-er from home directory.",source:"@site/docs/advanced/federated-node/installation.md",sourceDirName:"advanced/federated-node",slug:"/advanced/federated-node/installation",permalink:"/docs/advanced/federated-node/installation",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/advanced/federated-node/installation.md",tags:[],version:"current",frontMatter:{title:"Installation"},sidebar:"advanced",previous:{title:"Pre-installation",permalink:"/docs/advanced/federated-node/pre-installation"},next:{title:"Node Administration",permalink:"/docs/advanced/federated-node/administration"}},s={},d=[{value:"Post-installation tasks",id:"post-installation-tasks",level:2}],p={toc:d},c="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"On Linux and OS X, install as a non-root sudo-er from home directory."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Clone and check out the code")),(0,o.kt)("p",null,"On all OS, clone federatednode repo and enter cloned directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git clone https://github.com/CounterpartyXCP/federatednode.git\ncd federatednode\n")),(0,o.kt)("p",null,"On Linux and OS X:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo ln -sf `pwd`/fednode.py /usr/local/bin/fednode\n")),(0,o.kt)("p",null,"On Windows (if using Docker Quickstart Terminal, a.k.a MINGW64):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'mkdir ~/bin\necho "python.exe \\"`pwd`\\\\fednode.py\\" \\$*" > ~/bin/fednode\nchmod +x ~/bin/fednode\n')),(0,o.kt)("p",null,"On Windows (if using Windows Command prompt):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"> C:\\Windows\\fednode.bat echo python.exe %CD%\\fednode.py \\%*\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Build and link the containers")),(0,o.kt)("p",null,"Run the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"fednode install <CONFIG> <BRANCH>\n")),(0,o.kt)("p",null,"Where ",(0,o.kt)("inlineCode",{parentName:"p"},"<CONFIG>")," is one of the following:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"base"))," if you want to run ",(0,o.kt)("inlineCode",{parentName:"li"},"counterparty-server")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"bitcoind")," only"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"counterblock"))," if you want to run everything in ",(0,o.kt)("inlineCode",{parentName:"li"},"base"),", with the addition of ",(0,o.kt)("inlineCode",{parentName:"li"},"counterblock")," and its dependencies (",(0,o.kt)("inlineCode",{parentName:"li"},"mongodb")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"redis"),")"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"full"))," if you would like to run a ",(0,o.kt)("em",{parentName:"li"},"full federated node configuration"),", which is all services on the ",(0,o.kt)("a",{parentName:"li",href:"#services"},"list above"))),(0,o.kt)("p",null,"And where ",(0,o.kt)("inlineCode",{parentName:"p"},"<BRANCH>")," is one of the following:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"master"))," (stable and recommended)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"develop"))," (cutting edge, likely with bugs)")),(0,o.kt)("p",null,"For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"# install a base configuration for the master branch\nfednode install base master\n\n# install a full configuration for the develop branch\nfednode install full develop\n")),(0,o.kt)("p",null,"In some cases (slow host, limited bandwidth), you may experience a failure to install due to download timeouts which happen because of network unstability. In that case consider changing Docker's ",(0,o.kt)("inlineCode",{parentName:"p"},"max-concurrent-downloads")," value to 1 or 2 from default 3. To do that create a custom ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/docker/daemon.json")," daemon options file and restart Docker service."),(0,o.kt)("p",null,"As mentioned earlier, the install script may stop if ports used by Federated Node services are used by other applications. While it is not recommended to run Federated Node alongside production services, small changes can make the evaluation of Federated Node easier. For example you may change ports used by existing applications (or disable said applications) or run Federated Node inside of a virtual machine."),(0,o.kt)("p",null,"For example, the original mongodb can be reconfigured to listen on port 28018 and counterblock's mongodb can use the default port 27017. The Federated Node install script makes it possible to specify the interface used by its mongodb container (example below), but it currently does not have the ability to do this for other services or get around port conflicts."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"fednode install --mongodb-interface 127.0.0.2 counterblock master\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Wait for initial sync")),(0,o.kt)("p",null,"After installation, the services will be automatically started. To check the status, issue:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"fednode ps\n")),(0,o.kt)("p",null,"If you have existing instances of Bitcoin Core (either mainnet or testnet), at this point you could stop all services listed in ",(0,o.kt)("inlineCode",{parentName:"p"},"fednode ps")," output, change configuration files (of counterparty and counterblock, for example) and point them to your existing Bitcoin Core. Configuration files can be found in various service directories located under federatednode/config."),(0,o.kt)("p",null,"Once the containers are installed and running, keep in mind that it will take some time for ",(0,o.kt)("inlineCode",{parentName:"p"},"bitcoind")," to download the blockchain data. Once this is done, ",(0,o.kt)("inlineCode",{parentName:"p"},"counterparty-server")," will fully start and sync, followed by ",(0,o.kt)("inlineCode",{parentName:"p"},"counterblock")," (if in use). At that point, the server will be usable."),(0,o.kt)("p",null,"You may check the sync status by tailing the appropriate service logs, e.g. for Bitcoin Core and Counterparty server on mainnet:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"fednode tail bitcoin\nfednode tail counterparty\n")),(0,o.kt)("a",{name:"accessing"}),"**Access the system**",(0,o.kt)("p",null,"Once running, the system listens on the following ports:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"counterparty-server"),": 4000/tcp (mainnet), 14000/tcp (testnet)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"counterblock"),": 4001/tcp (mainnet), 14001/tcp (testnet)")),(0,o.kt)("p",null,"For ",(0,o.kt)("inlineCode",{parentName:"p"},"counterparty-server"),", use RPC username ",(0,o.kt)("inlineCode",{parentName:"p"},"rpc")," and default password ",(0,o.kt)("inlineCode",{parentName:"p"},"rpc"),"."),(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"counterwallet")," is installed, access to the following URLs will be possible:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"http://<host>/")," \u2014 directs to ",(0,o.kt)("inlineCode",{parentName:"li"},"https")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"https://<host>/")," - main production URL (uses minified JS/CSS)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"https://<host>/src/")," - development URL (uses un-minified JS/CSS)")),(0,o.kt)("h2",{id:"post-installation-tasks"},"Post-installation tasks"),(0,o.kt)("p",null,"Ensure that your firewall software is enabled. If you want to provide access from external systems, you can allow through some or all of the ",(0,o.kt)("a",{parentName:"p",href:"#accessing"},"appropriate ports"),". In addition, if you are running a node in a production scenario, it is recommended that you properly secure it."),(0,o.kt)("p",null,"You may also want to tighten ownership and permissions on all conf files in federatednode/config subdirectories, but keep in mind that you should be the only user with access to the operating system that runs Federated Node containers: Federated Node is not designed for shared OS environments."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Ubuntu Linux")),(0,o.kt)("p",null,"Ubuntu Linux users can optionally run a little script that will issue a number of commands to assist with securing their systems:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd extras/host_security\nsudo ./run.py\n")),(0,o.kt)("p",null,"Note that this script will make several modifications to your host system as it runs. Please review what it does ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/CounterpartyXCP/federatednode/blob/master/extras/host_security/run.py"},"here")," before using it."),(0,o.kt)("p",null,"If you expect to run a busy Federated Node that requires counterblock, you can consider making the following performance tweaks for mongodb and redis. Please do not make these changes to the host if you're not comfortable with them because they impact not only Docker but the entire OS."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Disable huge memory pages (for redis and mongodb): on Ubuntu 16.04 add ",(0,o.kt)("inlineCode",{parentName:"li"},'echo "never" > /sys/kernel/mm/transparent_hugepage/enabled')," to /etc/rc.local and run ",(0,o.kt)("inlineCode",{parentName:"li"},"sudo systemctl enable rc-local.service"),". Reboot and check with ",(0,o.kt)("inlineCode",{parentName:"li"},"cat /sys/kernel/mm/transparent_hugepage/enabled")," (expected setting: ",(0,o.kt)("inlineCode",{parentName:"li"},"[never]"),")."),(0,o.kt)("li",{parentName:"ul"},"Edit /etc/sysctl.conf (for redis): add ",(0,o.kt)("inlineCode",{parentName:"li"},"net.core.somaxconn = 511")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"vm.overcommit_memory = 1")," and run ",(0,o.kt)("inlineCode",{parentName:"li"},"sudo sysctl -p"),".")))}u.isMDXComponent=!0}}]);