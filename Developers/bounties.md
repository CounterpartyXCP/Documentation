# Counterparty Bug Bounty Program

**Donation Address: 14Tf35AovvRVURzd623q5i9kry2EW8WzyL**

According to [Linus’ Law](http://en.wikipedia.org/wiki/Linus), “given enough eyeballs, all bugs are shallow”. That’s one of the reasons why Counterparty’s source code is publicly available; but merely making the source code available doesn't accomplish anything if people don’t read it!

For this reason, Counterparty has a series of bug bounties. Similar to the bounties offered by [Mozilla](http://www.mozilla.org/security/bug-bounty.html) and [Google](http://blog.chromium.org/2010/01/encouraging-more-chromium-security.html), Counterparty bug bounties provide an opportunity for people who find bugs to be compensated. Unlike those programs, however, Counterparty’s bug bounties are not limited to security vulnerabilities.

Depending on the type of bug and when it is reported, different bounties will be awarded. Bounties are paid out in a mix of XCP and BTC (the ratio is negotiable), at the 3-day average of each to a fixed US Dollar value. 

## Things that do not qualify under the bug bounty

-   **forums.counterparty.io website** (unless the issue is a serious misconfiguration where user security details are being leaked in a way that they can be proven to be exploited)
-   **Please do not try XSS attacks in the Counterwallet chat box. It is annoying, and it has already been tested extensively**
-   Vulnerabilities which are too broad or not documented properly (i.e. do not include a specific example relevant to a Counterparty-controlled site)
-   Bugs or issues with a third-party site, software, or service that we use, such as support.counterparty.io (freshdesk.com), which is not due to an improper configuration issue specific to us. Please submit any potential issues **to the maintainers of that site or providers of that service**
-   Usability issues
-   Anything requiring social engineering
-   DOS/DDOS attacks
-   Missing HSTS (HttpOnly flags), Secure flag, Browser Cache vulnerabilities
-   CSRF that doesn’t affect the victim
-   Referrer leakage to pages an attacker cannot control
-   Lack of explicit rate-limiting for counterwallet.io passphrase entry
-   The presence of unnecessary files, e.g. for backups, when these files do not expose any sensitive information
-   Anything that is the result of an automated Nessus/PCI scans (too general)
-   DNS issues (e.g. lack of an SPF record)
-   SSL certificate issues (such as lack of Perfect Forward Secrecy on our SSL certificates)
-   Bugs that have received mainstream tech media attention before the date of your disclosure (e.g. Heartbleed, Poodlebleed, etc)

## Bounties for counterpartyd, counterwalletd, and Counterwallet (counterwallet.io)

| Total USD amount (BTC/XCP mix) | Type of bug |
| ----------------------------------------|------------------------------------|
| $1,500 | A flaw in the protocol that allows for theft or loss of funds |
| $1,000 | A bug in the reference client that leads to consensus issues |
| $750 | A bug which causes data corruption or loss |
| $200 | A bug which causes the application to crash |
| $100 | Other non-harmless bugs |
| $50 | Build breakage on a supported platform |
| $20 | 'Harmless' bugs, e.g. cosmetic errors |

Bounties will be paid out for bugs found in the `master` branch of the official GitHub repositories.

## Bounties for the Counterparty forums (forums.counterparty.io)

| Total USD amount (BTC/XCP mix) | Type of bug |
| ----------------------------------------|------------------------------------|
| $20-100  |  Security issue on the website that is not present in the forums software used and that is not a known issue to the author(s) |

Beyond this, bounties do not apply to the Counterparty forums; **in particular, please do not run automated vulnerability scanners against the website — they are annoying and do not produce useful bug reports.**

## How to report a bug

### For security-related issues 

Email [the developers](mailto:dev@counterparty.io) **privately with the details of the issue. Do not post the issue on github or anywhere else until the issue has been resolved.**


### For code issues

We would strongly prefer if you create a pull-request on Github in the proper repository with the necessary fix (along with your Bitcoin address to claim the bounty). For more information, see [this link](https://help.github.com/categories/63/articles). 

### For website issues

Please contact [support](mailto:support@counterparty.io) with the error, along with your Bitcoin address.

## The fine print

-   A bounty will only be awarded to the first person who reports a bug, unless two or more people report the same bug at approximately the same time, in which case the bounty may be split between them.
-   If the same bug appears in multiple locations it will normally only receive a single bounty.
-   Reports of security-related bugs are not eligible for bounties if the bugs are publicly disclosed prior to being fixed.
-   The issue must be described in necessary detail to address it.
-   Only the discoverer of a bug is eligible for the associated bounty.
-   Bounties will be confirmed and awarded within 10 days of their
    reporting. Inquiries on bounty status may be sent to [bounties@counterparty.io]("mailto:bounties@counterparty.io)
-   Bounties will not be awarded if it is illegal to do so.
-   The classification of bugs, values of bounties, and conditions under which bounties are paid are subject to change without notice.
-   The core Counterparty team has sole discretion to determine whether a bug report qualifies for a bounty and for which bounty it qualifies.

## CREDITS 

Credit to the general structure of this program as well as much of the wording goes to [Tarsnap](http://www.tarsnap.com/bugbounty.html).
