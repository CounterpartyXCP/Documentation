"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[2160],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=o.createContext({}),c=function(e){var t=o.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return o.createElement(i.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,k=p["".concat(i,".").concat(m)]||p[m]||d[m]||a;return n?o.createElement(k,l(l({ref:t},u),{},{components:n})):o.createElement(k,l({ref:t},u))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:r,l[1]=s;for(var c=2;c<a;c++)l[c]=n[c];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8686:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var o=n(7462),r=(n(7294),n(3905));const a={title:"Writing counterblock Plug-in Modules"},l=void 0,s={unversionedId:"develop/counterblock/modules",id:"develop/counterblock/modules",title:"Writing counterblock Plug-in Modules",description:"`counterblock` is a modular application that allows developers to turn on or off various bits of its out-of-the-box functionality, as well as extending it with new functionality, through its plug-in architecture.",source:"@site/docs/develop/counterblock/modules.md",sourceDirName:"develop/counterblock",slug:"/develop/counterblock/modules",permalink:"/Documentation/docs/develop/counterblock/modules",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/develop/counterblock/modules.md",tags:[],version:"current",frontMatter:{title:"Writing counterblock Plug-in Modules"},sidebar:"develop",previous:{title:"Counterblock API",permalink:"/Documentation/docs/develop/counterblock/api"},next:{title:"Contributing",permalink:"/Documentation/docs/develop/contributing"}},i={},c=[{value:"Built-in Modules",id:"built-in-modules",level:2},{value:"Custom Module Development",id:"custom-module-development",level:2},{value:"Processors: Hooking into runtime functionality",id:"processors-hooking-into-runtime-functionality",level:3},{value:"MessageProcessor",id:"messageprocessor",level:3},{value:"MempoolMessageProcessor",id:"mempoolmessageprocessor",level:3},{value:"BlockProcessor",id:"blockprocessor",level:3},{value:"StartUpProcessor",id:"startupprocessor",level:3},{value:"CaughtUpProcessor",id:"caughtupprocessor",level:3},{value:"RollbackProcessor",id:"rollbackprocessor",level:3},{value:"Other integration points",id:"other-integration-points",level:2},{value:"config.state",id:"configstate",level:3},{value:"Enhancing the API",id:"enhancing-the-api",level:3},{value:"start_task",id:"start_task",level:3},{value:"Module configuration file",id:"module-configuration-file",level:2},{value:"Command-line functions",id:"command-line-functions",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," is a modular application that allows developers to turn on or off various bits of its out-of-the-box functionality, as well as extending it with new functionality, through its plug-in architecture."),(0,r.kt)("p",null,"This document introduces the built-in modules, as well as discussing how you can write your own custom modules for ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," that extend its functionality beyond what is possible out of the box."),(0,r.kt)("h2",{id:"built-in-modules"},"Built-in Modules"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," ships with the following built-in modules:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"assets"),": Implements basic asset functionality, such as extended asset info parsing, basic asset-related APIs, and more."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"betting"),": Implements betting-specific API calls, tasks, and more."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"dex"),": Implements API methods, order book and market info parsing, and more for Counterparty's distributed exchange. (Requires that the ",(0,r.kt)("inlineCode",{parentName:"li"},"assets")," module be loaded for use.)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"transaction_stats"),": Handles the compliation of transaction statistics."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"counterwallet"),": Implements Counterwallet-specific API calls, tasks, and more. (Requires that the ",(0,r.kt)("inlineCode",{parentName:"li"},"assets")," module be loaded for use.)")),(0,r.kt)("p",null,"Any of these above modules may be enabled or disabled, allowing you to tune ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," to your exact needs out of the box."),(0,r.kt)("h2",{id:"custom-module-development"},"Custom Module Development"),(0,r.kt)("p",null,"A ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," module is simply a python module that utilizes a special plug-in API, to provide runtime integration into the ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," base code."),(0,r.kt)("p",null,"For some examples of modules in use, check out the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/CounterpartyXCP/counterblock/tree/master/counterblock/lib/modules"},"modules directory")," of the ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," respository. These built-in modules are written just like any custom module would be, and provide a good launching point to see what is possible."),(0,r.kt)("h3",{id:"processors-hooking-into-runtime-functionality"},"Processors: Hooking into runtime functionality"),(0,r.kt)("p",null,"Most of the API functionality follows a specific Python decorator type syntax, to integrate into things like blockchain message processing, block level processing, startup/initialization processing and more. The general syntax is:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    from lib.processor import <processor_name>\n    \n    @<processor_name>.subscribe(enabled=<bool>, priority=<int>)\n    def my_function(param1, param2):\n        bla = do_foo()\n")),(0,r.kt)("p",null,"Some other notes on processors:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If not specified, the defaults are ",(0,r.kt)("inlineCode",{parentName:"li"},"enabled=true, priority=0"),"."),(0,r.kt)("li",{parentName:"ul"},"When a processor is triggered methods are run in order of priority from highest to lowest."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("em",{parentName:"li"},"Please note that any priority less than ",(0,r.kt)("inlineCode",{parentName:"em"},"0")," or greater than ",(0,r.kt)("inlineCode",{parentName:"em"},"1000")," is reserved for internal ",(0,r.kt)("inlineCode",{parentName:"em"},"counterblock"),"\nfunctionality, and custom plugins should only utilize priority settings under this number."))),(0,r.kt)("h3",{id:"messageprocessor"},"MessageProcessor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"MessageProcessor")," runs once for each message as obtained from the ",(0,r.kt)("inlineCode",{parentName:"p"},"counterpartyd")," message feed, for all activity that has been confirmed on the blockchain (i.e. at least 1 Bitcoin confirmation). ",(0,r.kt)("inlineCode",{parentName:"p"},"msg")," will pass the message in the same format as the ",(0,r.kt)("inlineCode",{parentName:"p"},"get_messages")," counterpartyd api method, msg_data corresponds to ",(0,r.kt)("inlineCode",{parentName:"p"},"json.loads(msg['bindings'])"),". "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    @MessageProcessor.subscribe(enabled=True, priority=90) \n    def custom_received_xcp_alert(msg, msg_data):\n        if msg['category'] != 'sends': return\n        if message['status'] != 'valid': return\n        if not msg_data['destination'] in MY_ADDRESS_LIST: return\n        if not msg_data['asset'] == 'XCP': return \n        print('Received %s XCP at My Address %s from %s' %(\n            (float(msg_data['quantity'])/10**8), msg_data['destination'], msg_data['source']))\n        return\n")),(0,r.kt)("p",null,"Note that with ",(0,r.kt)("inlineCode",{parentName:"p"},"MessageProcessor")," handlers, you can return ",(0,r.kt)("inlineCode",{parentName:"p"},"'ABORT_THIS_MESSAGE_PROCESSING'")," to prevent the running of further MessageProcessors (i.e. of lesser priority than the current one) for the message being currently processed."),(0,r.kt)("h3",{id:"mempoolmessageprocessor"},"MempoolMessageProcessor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"MempoolMessageProcessor")," works similar to ",(0,r.kt)("inlineCode",{parentName:"p"},"MessageProcessor"),", however, for messages out the mempool (i.e.\nthat are not confirmed and included on the blockchain yet). The format of the data supplied to the processor is slightly different though, and looks like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    @MempoolMessageProcessor.subscribe(enabled=True, priority=90) \n    def custom_received_xcp_alert(msg, msg_data):\n        assert msg['_message_index'] == 'mempool'\n        assert msg['tx_hash']\n        assert msg['command']\n        assert msg['category']\n        assert msg_data #the actual message data\n        assert msg['timestamp']\n        assert msg['viewed_in_block']\n        \n        #prevent running of further MempoolMessageProcessor's of lesser priority for the message being processed\n        return 'ABORT_THIS_MESSAGE_PROCESSING'\n")),(0,r.kt)("h3",{id:"blockprocessor"},"BlockProcessor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"BlockProcessor")," run once per new block, after all ",(0,r.kt)("inlineCode",{parentName:"p"},"MessageProcessor")," functions have completed. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    @BlockProcessor.subscribe(priority=0) \n    def alertBlock(): \n        print('Finished processing messages for this block')\n")),(0,r.kt)("h3",{id:"startupprocessor"},"StartUpProcessor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"StartUpProcessor")," runs once on ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," startup. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    @StartUpProcessor.subscribe()\n    def my_db_config(): \n        config.my_db = pymongo.Connection()['my_db'] \n")),(0,r.kt)("h3",{id:"caughtupprocessor"},"CaughtUpProcessor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"CaughtUpProcessor")," runs once when ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," catches up to the latest Counterpartyd block. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    @CaughtUpProcessor.subscribe()\n    def caughtUpAlert(): \n        print('counterblock is now caught up to Counterpartyd!') \n")),(0,r.kt)("h3",{id:"rollbackprocessor"},"RollbackProcessor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"RollbackProcessor")," runs whenever the ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," database is rolled back (either due to a blockchain\nreorg, or an explicit rollback command being specified to ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," via the command line)."),(0,r.kt)("p",null,"Note that if this processor runs and ",(0,r.kt)("inlineCode",{parentName:"p"},"None")," is passed as ",(0,r.kt)("inlineCode",{parentName:"p"},"max_block_index"),", it means that there was a reparse of\nall block data."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    @RollbackProcessor.subscribe()\n    def rollbackAlert(max_block_index): \n        print('counterblock block database rolled back! Anything newer than block index %i removed!' % max_block_index) \n")),(0,r.kt)("h2",{id:"other-integration-points"},"Other integration points"),(0,r.kt)("h3",{id:"configstate"},"config.state"),(0,r.kt)("p",null,"A number of internal state variables that a module may need to access are stored in ",(0,r.kt)("inlineCode",{parentName:"p"},"config.state"),"."),(0,r.kt)("p",null,"For example, if you want to run a process for every new block (but not when counterblock is catching up): "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    @BlockProcessor.subscribe() \n    def my_custom_block_event(): \n        if not (config.state['cpd_latest_block_index'] - config.state['my_latest_block']['block_index']) == 1: \n            return\n        #Do stuff here\n")),(0,r.kt)("h3",{id:"enhancing-the-api"},"Enhancing the API"),(0,r.kt)("p",null,"To add an API method for ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," to provide: "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"    from lib.processor import API\n    \n    #(note that the dispatcher add_method does not take arguments) \n    @API.add_method\n    def my_foo_api_method(): \n        return 'bar'\n")),(0,r.kt)("p",null,"Upon doing the above, ",(0,r.kt)("inlineCode",{parentName:"p"},"my_foo_api_method")," is now a valid API method, and callable from any client that that utilizes your ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," JSON RPC API."),(0,r.kt)("h3",{id:"start_task"},"start_task"),(0,r.kt)("p",null,"To start a task that runs in a seperate lightweight thread (either immediately, or with a delay), use ",(0,r.kt)("inlineCode",{parentName:"p"},"start_task"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'    from lib.processor import start_task\n    \n    def run_my_task():\n        print("Foo bar!!")\n        #start again in 5 minutes\n        start_task(run_my_task, delay=5*60)\n        \n    #start task the first time with no delay\n    start_task(run_my_task)\n')),(0,r.kt)("h2",{id:"module-configuration-file"},"Module configuration file"),(0,r.kt)("p",null,"After creating your module, you will need to tell ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," about it, so that it can load it on startup. To do this, you should edit (or create) a file called ",(0,r.kt)("inlineCode",{parentName:"p"},"modules.conf")," (or ",(0,r.kt)("inlineCode",{parentName:"p"},"modules.testnet.conf")," for testnet), which should be located in the counterblock ",(0,r.kt)("inlineCode",{parentName:"p"},"config-dir")," (",(0,r.kt)("inlineCode",{parentName:"p"},"~xcp/.config/counterblock")," on a federated node)."),(0,r.kt)("p",null,"To load your custom module, specify the module's path under ",(0,r.kt)("inlineCode",{parentName:"p"},"[LoadModule]")," relative to the ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock base-dir"),". i.e.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[LoadModule]\n'lib/vendor' = True\n")),(0,r.kt)("p",null,"The above configuration would look for a ",(0,r.kt)("inlineCode",{parentName:"p"},"vendor.py"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"vendor")," folder (with required ",(0,r.kt)("inlineCode",{parentName:"p"},"__init__.py")," file present), and load the plugin code from there. Note that you should not include any ",(0,r.kt)("inlineCode",{parentName:"p"},".py")," suffix on the filename."),(0,r.kt)("p",null,"To change the default behavior for ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," modules/events, change the corresponding processor config. For instance:"),(0,r.kt)("p",null,"To disable a processor:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"#(must be bool)\n[BlockProcessor]\ngenerate_wallet_stats = False\n")),(0,r.kt)("p",null,"To change a processor's priority:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"#(must be int) \n[MessageProcessor]\nparse_issuance = 5\n")),(0,r.kt)("p",null,"To change priority and enable:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"#(tuple, order does not matter)\n[MessageProcessor]\nparse_issuance = 5, True \nparse_issuance = True, 5\n")),(0,r.kt)("p",null,"Here's an extensive ",(0,r.kt)("inlineCode",{parentName:"p"},"counterblock")," ",(0,r.kt)("inlineCode",{parentName:"p"},"modules.conf")," example config file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[MessageProcessor]\n#Tweak core messaging processing\n# (don't use these unless you know what you're doing)\nhandle_exceptional = True\nhandle_invalid = True\nparse_insert = True\nhandle_reorg = True\nparse_issuance = 10, True\nparse_balance_change = True\nparse_trade_book = True\nparse_broadcast = True\n\n[StartUpProcessor]\n#Enable/disable core functionality (all enabled by\n# default, don't use these unless you know what you're doing)\nstart_cpd_blockfeed = True\ncheck_blockchain_service = True\nexpire_stale_orders = True\nstart_api = True\n\n[LoadModule]\n#Load custom modules\nlib/modules/reparse_timer = True\n")),(0,r.kt)("p",null,"Please note that function names must be exact."),(0,r.kt)("h2",{id:"command-line-functions"},"Command-line functions"),(0,r.kt)("p",null,"Counterblock also provides the ability to load/unload/disable/etc modules via the command line. (Although, please note that we recommend manually editing the appropriate ",(0,r.kt)("inlineCode",{parentName:"p"},"modules")," config file(s), at least for starters.)"),(0,r.kt)("p",null,"To enable a custom module, run the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"counterblock enmod 'lib/vendor'\n")),(0,r.kt)("p",null,"To disable a loaded module:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"counterblock dismod 'lib/vendor' \n")),(0,r.kt)("p",null,"To list loaded modules and processors:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"counterblock listmod\n")))}d.isMDXComponent=!0}}]);