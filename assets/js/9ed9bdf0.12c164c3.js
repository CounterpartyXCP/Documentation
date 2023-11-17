"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[1259],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>f});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=a.createContext({}),d=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},l=function(e){var n=d(e.components);return a.createElement(c.Provider,{value:n},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),u=d(t),m=r,f=u["".concat(c,".").concat(m)]||u[m]||p[m]||i;return t?a.createElement(f,s(s({ref:n},l),{},{components:t})):a.createElement(f,s({ref:n},l))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,s=new Array(i);s[0]=m;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=e,o[u]="string"==typeof e?e:r,s[1]=o;for(var d=2;d<i;d++)s[d]=t[d];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},2399:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var a=t(7462),r=(t(7294),t(3905));const i={title:"How to send Counterparty assets in bulk"},s=void 0,o={unversionedId:"advanced/advanced-usage/sending-bulk",id:"advanced/advanced-usage/sending-bulk",title:"How to send Counterparty assets in bulk",description:"Below is a script for constructing, signing and broadcasting a large",source:"@site/docs/advanced/advanced-usage/sending-bulk.md",sourceDirName:"advanced/advanced-usage",slug:"/advanced/advanced-usage/sending-bulk",permalink:"/Documentation/docs/advanced/advanced-usage/sending-bulk",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/advanced/advanced-usage/sending-bulk.md",tags:[],version:"current",frontMatter:{title:"How to send Counterparty assets in bulk"},sidebar:"advanced",previous:{title:"Command-line (CLI) Guide",permalink:"/Documentation/docs/advanced/cli"},next:{title:"Using multisig with counterparty-server",permalink:"/Documentation/docs/advanced/advanced-usage/multisig"}},c={},d=[{value:"Script",id:"script",level:2},{value:"CSV File",id:"csv-file",level:2},{value:"Instructions",id:"instructions",level:2}],l={toc:d},u="wrapper";function p(e){let{components:n,...t}=e;return(0,r.kt)(u,(0,a.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Below is a script for constructing, signing and broadcasting a large\nnumber of sends efficiently. It assumes that the source addresses are in\na (temporarily) unlocked Bitcoin Core wallet, to which a running\ninstance of counterpartyd is connected."),(0,r.kt)("p",null,"This script takes a single command-line argument of the CSV file from\nwhich to pull the sources, destinations, quantities, assets and fees."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Warning"),": This example is outdated as it used the previous addrindex bitcoin\nbranch, however, same principles apply to current mainline repo."),(0,r.kt)("h2",{id:"script"},"Script"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"import csv\nimport sys\n\nfrom counterpartylib.lib import util\nfrom counterpartylib.lib import config\nfrom counterpartylib.lib.backend import addrindex\n\nconfig.BACKEND_URL = 'http://user:password@localhost:4000'\nconfig.BACKEND_SSL_NO_VERIFY = False\nconfig.TESTNET = False\nconfig.REQUESTS_TIMEOUT = 5\n\ndef counterparty_api(method, params):\n    return util.api(method, params)\n\ndef bitcoin_api(method, params):\n    return addrindex.rpc(method, params)\n\ndef do_send(source, destination, asset, quantity, fee, encoding):\n    validateaddress = bitcoin_api('validateaddress', [source])\n    assert validateaddress['ismine']\n    pubkey = validateaddress['pubkey']\n    unsigned_tx = counterparty_api('create_send', {'source': source, 'destination': destination, 'asset': asset, 'quantity': quantity, 'pubkey': pubkey, 'allow_unconfirmed_inputs': True})\n    signed_tx = bitcoin_api('signrawtransaction', [unsigned_tx])['hex']\n    tx_hash = bitcoin_api('sendrawtransaction', [signed_tx])\n    return tx_hash\n\n\nwith open(sys.argv[1], 'r') as csvfile:\n      reader = csv.reader(csvfile)\n      print('{}|{}|{}'.format('linenum', 'input', 'result'))\n\n      for row in reader:\n            if reader.line_num == 1:                                            \n                  continue                                                        \n\n            source, destination, asset, quantity, fee = row\n            fee, quantity = int(fee), int(quantity)\n\n            try:\n                  tx_hash = do_send(source, destination, asset, quantity, fee, 'opreturn')\n            except Exception as e:\n                  tx_hash = str(e)\n\n            print('{}|{}|{}'.format(reader.line_num, ','.join(row), tx_hash))\n")),(0,r.kt)("h2",{id:"csv-file"},"CSV File"),(0,r.kt)("p",null,"All quantities are specified in satoshis. The format of the CSV file is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"  source,destination,asset,quantity,fee\n  mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,100000000,150\n  mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns,XCP,200000000,100\n")),(0,r.kt)("h2",{id:"instructions"},"Instructions"),(0,r.kt)("p",null,"Use this script on a system with ",(0,r.kt)("inlineCode",{parentName:"p"},"counterparty-lib")," installed and in the ",(0,r.kt)("inlineCode",{parentName:"p"},"PYTHONPATH"),". (If using a Federated Node, this is possible by issuing the command ",(0,r.kt)("inlineCode",{parentName:"p"},"fednode shell counterparty")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"fednode shell counterparty-testnet")," as appropriate, and using the script in that shell.)"),(0,r.kt)("p",null,"If the CSV file with the data is called input.csv, and the script is\ncalled sendmany.py, then call this script with\n",(0,r.kt)("inlineCode",{parentName:"p"},"$ python3 sendmany.py input.csv"),"."))}p.isMDXComponent=!0}}]);