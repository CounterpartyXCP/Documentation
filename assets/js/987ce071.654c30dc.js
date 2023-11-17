"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[1811],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=d(n),m=r,f=c["".concat(s,".").concat(m)]||c[m]||u[m]||o;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:r,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3656:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var a=n(7462),r=(n(7294),n(3905));const o={title:"Counterparty Dependencies on Windows"},i=void 0,l={unversionedId:"advanced/installation/windows",id:"advanced/installation/windows",title:"Counterparty Dependencies on Windows",description:"Note: These instructions are for a 32-bit installation. This will work with",source:"@site/docs/advanced/installation/windows.md",sourceDirName:"advanced/installation",slug:"/advanced/installation/windows",permalink:"/Documentation/docs/advanced/installation/windows",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/advanced/installation/windows.md",tags:[],version:"current",frontMatter:{title:"Counterparty Dependencies on Windows"},sidebar:"advanced",previous:{title:"Bitcoin Core with ``addrindex`` Patch",permalink:"/Documentation/docs/advanced/installation/bitcoin-core"},next:{title:"Exchange Integration",permalink:"/Documentation/docs/advanced/exchange-integration"}},s={},d=[{value:"Usage and notes for Windows",id:"usage-and-notes-for-windows",level:2},{value:"Counterparty \u201cFederated Node\u201d on Windows",id:"counterparty-federated-node-on-windows",level:2}],p={toc:d},c="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note:")," These instructions are for a 32-bit installation. This will work with\nboth 32-bit and 64-bit versions of Windows, and is the recommended approach."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.python.org/downloads/"},"Python 3.5.x")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://sourceforge.net/projects/pywin32/files/pywin32/Build%20220/"},"Python Win32 extensions")," (You must match the version with your Python version and install as an ",(0,r.kt)("strong",{parentName:"li"},"administrator"),", or you will get an error about missing DLL files later.)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/rogerbinns/apsw/releases/download/3.8.8.1-r1/apsw-3.8.8.1-r1.win32-py3.4.exe"},"APSW 3.8.8.1-r1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://s3.amazonaws.com/counterparty-bootstrap/pycrypto-2.6.1.win32-py3.4.exe"},"Pycrypto 2.6.1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://www.microsoft.com/downloads/details.aspx?familyid=9B2DA534-3E03-4391-8A4D-074B9F2BC1BF"},"Microsoft Visual C++ 2008 Redistributable Package (x86)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://slproweb.com/download/Win32OpenSSL_Light-1_1_0.exe"},"OpenSSL 1.1.0")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://git-scm.com/download/win"},"Git"),' (Optional) (Select "',(0,r.kt)("strong",{parentName:"li"},"Use Git from the Windows Command Prompt"),'".) ')),(0,r.kt)("p",null,"In order to install on Windows 10 x64:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Install Python 3.5"),(0,r.kt)("li",{parentName:"ul"},"Install ",(0,r.kt)("a",{parentName:"li",href:"http://landinghub.visualstudio.com/visual-cpp-build-tools"},"Visual C++ Build Tools 2015")," (stick with the default option, Windows 8.1 SDK)"),(0,r.kt)("li",{parentName:"ul"},"Next install an APSW binary for your architecture (although you can probably build APSW from source - see the bottom of ",(0,r.kt)("a",{parentName:"li",href:"https://rogerbinns.github.io/apsw/download.html"},"this page")," for build instructions). Use the same architecture as Python 3.5 that you have installed. "),(0,r.kt)("li",{parentName:"ul"},"Use pip to install counterparty-lib and counterparty-cli.")),(0,r.kt)("h2",{id:"usage-and-notes-for-windows"},"Usage and notes for Windows"),(0,r.kt)("p",null,"If you install as system administrator, Counterparty binaries ",(0,r.kt)("inlineCode",{parentName:"p"},"counterparty-server.exe")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"counterparty-client.exe")," are installed to ",(0,r.kt)("inlineCode",{parentName:"p"},"C:\\Python35\\Scripts"),". This path can be manually added to the system ",(0,r.kt)("inlineCode",{parentName:"p"},"PATH")," variable for ease of use."),(0,r.kt)("p",null,"The default configuration files (for mainnet) can be used with testnet provided the ",(0,r.kt)("inlineCode",{parentName:"p"},"--testnet")," option is employed when starting service and running the CLI. "),(0,r.kt)("p",null,"Alternatively, a different set of custom configuration files that contain ",(0,r.kt)("inlineCode",{parentName:"p"},"testnet=1")," can be provided at runtime in order to use different access credentials for testnet and mainnet:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"    counterparty-server --config-file E:\\testing\\server.testnet.conf start\n    counterparty-client --config-file E:\\testing\\client.testnet.conf wallet\n")),(0,r.kt)("p",null,"Both Python and Counterparty code can be installed by non-admin users:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Python 3.5 will be installed to C:\\Users\\USER\\AppData\\Roaming\\Python\\Python35\\"),(0,r.kt)("li",{parentName:"ul"},"Counterparty executables will be installed to the Scripts subdirectory (example: ",(0,r.kt)("inlineCode",{parentName:"li"},"pip3 install --user counterparty-lib"),"). ")),(0,r.kt)("h2",{id:"counterparty-federated-node-on-windows"},"Counterparty \u201cFederated Node\u201d on Windows"),(0,r.kt)("p",null,'The experimental Counterparty \u201cFederated Node\u201d for Windows based on Docker can be installed by following the official "Federated Node" ',(0,r.kt)("a",{parentName:"p",href:"http://counterparty.io/docs/federated_node/"},"install guide"),". counterparty-server and counterparty-client is sufficient for users who do not require local Counterwallet or Counterblock access."))}u.isMDXComponent=!0}}]);