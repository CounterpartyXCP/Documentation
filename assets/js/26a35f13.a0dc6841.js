"use strict";(self.webpackChunkxcpdoc=self.webpackChunkxcpdoc||[]).push([[2744],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),u=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(r),h=n,m=c["".concat(s,".").concat(h)]||c[h]||d[h]||o;return r?a.createElement(m,i(i({ref:t},p),{},{components:r})):a.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:n,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},5195:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=r(7462),n=(r(7294),r(3905));const o={title:"Bug Bounties"},i=void 0,l={unversionedId:"develop/bounties",id:"develop/bounties",title:"Bug Bounties",description:"According to\xa0Linus\u2019 Law, \u201cgiven enough eyeballs, all bugs are shallow\u201d. That\u2019s one of the reasons why Counterparty\u2019s source code is publicly available; but merely making the source code available doesn't accomplish anything if people don\u2019t read it!",source:"@site/docs/develop/bounties.md",sourceDirName:"develop",slug:"/develop/bounties",permalink:"/Documentation/docs/develop/bounties",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/develop/bounties.md",tags:[],version:"current",frontMatter:{title:"Bug Bounties"},sidebar:"develop",previous:{title:"Contributing",permalink:"/Documentation/docs/develop/contributing"}},s={},u=[{value:"Things that do not qualify under the bug bounty",id:"things-that-do-not-qualify-under-the-bug-bounty",level:2},{value:"Bounties for counterparty-lib",id:"bounties-for-counterparty-lib",level:2},{value:"Bounties for the Counterparty forums\xa0(counterpartytalk.org)",id:"bounties-for-the-counterparty-forumscounterpartytalkorg",level:2},{value:"How to report a bug",id:"how-to-report-a-bug",level:2},{value:"For security-related issues",id:"for-security-related-issues",level:3},{value:"For code issues",id:"for-code-issues",level:3},{value:"For website issues",id:"for-website-issues",level:3},{value:"The fine print",id:"the-fine-print",level:2},{value:"CREDITS",id:"credits",level:2}],p={toc:u},c="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"According to\xa0",(0,n.kt)("a",{parentName:"p",href:"http://en.wikipedia.org/wiki/Linus"},"Linus\u2019 Law"),", \u201cgiven enough eyeballs, all bugs are shallow\u201d. That\u2019s one of the reasons why Counterparty\u2019s source code is publicly available; but merely making the source code available doesn't accomplish anything if people don\u2019t read it!"),(0,n.kt)("p",null,"For this reason, Counterparty has a series of\xa0bug bounties. Similar to the bounties offered by\xa0",(0,n.kt)("a",{parentName:"p",href:"http://www.mozilla.org/security/bug-bounty.html"},"Mozilla"),"\xa0and\xa0",(0,n.kt)("a",{parentName:"p",href:"http://blog.chromium.org/2010/01/encouraging-more-chromium-security.html"},"Google"),", Counterparty bug bounties provide an opportunity for people who find bugs to be compensated. Unlike those programs, however, Counterparty\u2019s bug bounties are not limited to security vulnerabilities."),(0,n.kt)("p",null,"Depending on the type of bug and when it is reported, different bounties will be awarded. Bounties are paid out in a mix of XCP and BTC (the ratio is negotiable), at the 3-day average of each to a fixed US Dollar value. "),(0,n.kt)("h2",{id:"things-that-do-not-qualify-under-the-bug-bounty"},"Things that do not qualify under the bug bounty"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"counterpartytalk.org website")," (unless the issue is a serious misconfiguration where user security details are being leaked in a way that they can be proven to be exploited)"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Counterwallet or counterblock")," (unless the issue allows for theft of funds, in that case the $1,500 bounty defined below would apply)"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Please do not try XSS attacks in the Counterwallet chat box. It is annoying, and it has already been tested extensively")),(0,n.kt)("li",{parentName:"ul"},"Vulnerabilities which are too broad or not documented properly (i.e. do not include a specific example relevant to a Counterparty-controlled site)"),(0,n.kt)("li",{parentName:"ul"},"Bugs or issues with a third-party site, software, or service that we use, such as support.counterparty.io (freshdesk.com), which is not due to an improper configuration issue specific to us. Please submit any potential issues ",(0,n.kt)("strong",{parentName:"li"},"to the maintainers of that site or providers of that service")),(0,n.kt)("li",{parentName:"ul"},"Usability issues"),(0,n.kt)("li",{parentName:"ul"},"Anything requiring social engineering"),(0,n.kt)("li",{parentName:"ul"},"DOS/DDOS attacks"),(0,n.kt)("li",{parentName:"ul"},"Missing HSTS (HttpOnly flags), Secure flag, Browser Cache vulnerabilities"),(0,n.kt)("li",{parentName:"ul"},"CSRF that doesn\u2019t affect the victim"),(0,n.kt)("li",{parentName:"ul"},"Referrer leakage to pages an attacker cannot control"),(0,n.kt)("li",{parentName:"ul"},"Lack of explicit rate-limiting for counterwallet.io passphrase entry"),(0,n.kt)("li",{parentName:"ul"},"The presence of unnecessary files, e.g. for backups, when these files do not expose any sensitive information"),(0,n.kt)("li",{parentName:"ul"},"Anything that is the result of an automated Nessus/PCI scans (too general)"),(0,n.kt)("li",{parentName:"ul"},"DNS issues (e.g. lack of an SPF record)"),(0,n.kt)("li",{parentName:"ul"},"SSL certificate issues (such as lack of Perfect Forward Secrecy on our SSL certificates)"),(0,n.kt)("li",{parentName:"ul"},"Bugs that have received mainstream tech media attention before the date of your disclosure (e.g. Heartbleed, Poodlebleed, etc)")),(0,n.kt)("h2",{id:"bounties-for-counterparty-lib"},"Bounties for counterparty-lib"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Total USD amount (BTC/XCP mix)"),(0,n.kt)("th",{parentName:"tr",align:null},"Type of bug"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$1,500"),(0,n.kt)("td",{parentName:"tr",align:null},"A flaw in the protocol that allows for theft or loss of funds")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$1,000"),(0,n.kt)("td",{parentName:"tr",align:null},"A bug in the reference client that leads to consensus issues")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$750"),(0,n.kt)("td",{parentName:"tr",align:null},"A bug which causes data corruption or loss")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$200"),(0,n.kt)("td",{parentName:"tr",align:null},"A bug which causes the application to crash")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$100"),(0,n.kt)("td",{parentName:"tr",align:null},"Other non-harmless bugs")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$50"),(0,n.kt)("td",{parentName:"tr",align:null},"Build breakage on a supported platform")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$20"),(0,n.kt)("td",{parentName:"tr",align:null},"'Harmless' bugs, e.g. cosmetic errors")))),(0,n.kt)("p",null,"Bounties will be paid out for bugs found in the ",(0,n.kt)("inlineCode",{parentName:"p"},"master")," branch of the official GitHub repositories."),(0,n.kt)("h2",{id:"bounties-for-the-counterparty-forumscounterpartytalkorg"},"Bounties for the Counterparty forums\xa0(counterpartytalk.org)"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Total USD amount (BTC/XCP mix)"),(0,n.kt)("th",{parentName:"tr",align:null},"Type of bug"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"$20-100"),(0,n.kt)("td",{parentName:"tr",align:null},"Security issue on the website that is not present in the forums software used and that is not a known issue to the author(s)")))),(0,n.kt)("p",null,"Beyond this, bounties do not apply to the Counterparty forums; ",(0,n.kt)("strong",{parentName:"p"},"in particular,\xa0please do not run automated vulnerability scanners against the website\xa0\u2014 they are annoying and do not produce useful bug reports.")),(0,n.kt)("h2",{id:"how-to-report-a-bug"},"How to report a bug"),(0,n.kt)("h3",{id:"for-security-related-issues"},"For security-related issues"),(0,n.kt)("p",null,"Email ",(0,n.kt)("a",{parentName:"p",href:"mailto:dev@counterparty.io"},"the developers")," ",(0,n.kt)("strong",{parentName:"p"},"privately with the details of the issue. Do not post the issue on github or anywhere else until the issue has been resolved.")),(0,n.kt)("h3",{id:"for-code-issues"},"For code issues"),(0,n.kt)("p",null,"We would strongly prefer if you create a pull-request on Github in the proper repository with the necessary fix (along with your Bitcoin address to claim the bounty). For more information, see ",(0,n.kt)("a",{parentName:"p",href:"https://help.github.com/categories/63/articles"},"this link"),".\xa0"),(0,n.kt)("h3",{id:"for-website-issues"},"For website issues"),(0,n.kt)("p",null,"Please contact ",(0,n.kt)("a",{parentName:"p",href:"mailto:support@counterparty.io"},"support")," with the error, along with your Bitcoin address."),(0,n.kt)("h2",{id:"the-fine-print"},"The fine print"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"A bounty will only be awarded to the first person who reports a bug, unless two or more people report the same bug at approximately the same time, in which case the bounty may be split between them."),(0,n.kt)("li",{parentName:"ul"},"If the same bug appears in multiple locations it will normally only receive a single bounty."),(0,n.kt)("li",{parentName:"ul"},"Reports of security-related bugs are not eligible for bounties if the bugs are publicly disclosed prior to being fixed."),(0,n.kt)("li",{parentName:"ul"},"The issue must be described in necessary detail to address it."),(0,n.kt)("li",{parentName:"ul"},"Only the discoverer of a bug is eligible for the associated bounty."),(0,n.kt)("li",{parentName:"ul"},"Bounties will be confirmed and awarded within 10 days of their\nreporting. Inquiries on bounty status may be sent to ",(0,n.kt)("a",{parentName:"li",href:"mailto:bounties@counterparty.io"},"bounties@counterparty.io")),(0,n.kt)("li",{parentName:"ul"},"Bounties will not be awarded if it is illegal to do so."),(0,n.kt)("li",{parentName:"ul"},"The classification of bugs, values of bounties, and conditions under which bounties are paid are subject to change without notice."),(0,n.kt)("li",{parentName:"ul"},"The core Counterparty team has sole discretion to determine whether a bug report qualifies for a bounty and for which bounty it qualifies.")),(0,n.kt)("h2",{id:"credits"},"CREDITS"),(0,n.kt)("p",null,"Credit to the general structure of this program as well as much of the wording goes to ",(0,n.kt)("a",{parentName:"p",href:"http://www.tarsnap.com/bugbounty.html"},"Tarsnap"),"."))}d.isMDXComponent=!0}}]);