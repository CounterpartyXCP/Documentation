---
title: Contributing
---

End Users
---------

You can seek community help on the chat (fastest), forums or submit a
bug report (instructions can be found below).

### Counterwallet-related Support Pointers

-   Before you open a new issue, do a search or two to check whether a
    similar problem is described somewhere on the Web. You can also
    search [the Countewallet issues][] to see if the issue is open or
    has already been closed (an issue can be solved in there, but the
    code may still be in testing, so search closed issues, too)
-   If you suspect the problem is browser-related (e.g. disappearing or
    malformed text), confirm the problem in another browser or in the
    Incognito/Private mode (using the same browser). Stale cache is
    sometimes reason for weird browser behavior.
-   In case of issues with transactions that require tracking, paste
    your address in text (not image!) format
-   Related KB/FAQs:
    -   [How to collect client-side debug info for Counterwallet problems?](http://support.counterparty.io/solution/articles/5000013731-how-to-collect-client-side-debug-information-for-counterwallet-)
    -   [Diagnostic options in Counterwallet settings][]


Developers
------------------

-   All Counterparty projects are hosted on Github and can be found at
    [https://github.com/CounterpartyXCP](https://github.com/CounterpartyXCP).
    -   Counterwallet issues should go to the `Counterwallet` repo
    -   `counterpartyd` issues should be submitted to the
        `counterpartyd` repo
-   If you think you’ve identified a **security issue**, check out the
    [bounties page](https://counterparty.io/docs/bounties) and contact the Counterparty developers directly.


### Counterwallet

-   Please see the pointers for end users (above).
-   Since it’s easy to check JavaScript Debug Console, it’s usually a
    good idea to check that out first
-   Describe the issue and submit the logs
    -   Counterwallet-related problems: what happened, how to duplicate
        the issue, especially whether it was observed in another Web
        browser.


### counterparty-cli

- See https://github.com/CounterpartyXCP/counterparty-cli/blob/develop/CONTRIBUTING.md

### counterparty-lib

- See https://github.com/CounterpartyXCP/counterparty-lib/blob/master/CONTRIBUTING.md


## Bounties

### The Counterparty Project Bounties
    
The Counterparty Projects offers bounties for various things, but
especially for security issues related to Counterparty software.
You can find more about those bounties here:
[http://counterparty.io/bounties/](http://counterparty.io/bounties/).
     
## Community Bounties
    
From time to time community members create development bounties,
too.

If you want to pay someone to develop a feature or fix a bug for
you:

 - Ask in the chat or on the forums. If payment is in crypto, you can try to find a trusted community member to serve as 1-of-3 multisig senders.
- Create a bounty directly under particular issue, or create a bounty on [http://bountysource.com/teams/counterparty/issues](http://bountysource.com/teams/counterparty/issues). Counterparty repos are integrated with Bountysource.
- You can also use other sites and announce your bounties in the chat or on the forums

[https://github.com/CounterpartyXCP]: https://github.com/CounterpartyXCP
[the Countewallet issues]: https://github.com/CounterpartyXCP/counterwallet/issues
[Diagnostic options in Counterwallet settings]: http://support.counterparty.io/solution/articles/5000051310-what-do-various-strings-in-the-diagnostic-part-of-counterwallet-advanced-options-mean-