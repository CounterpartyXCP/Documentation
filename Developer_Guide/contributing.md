How to Submit a Bug Report
==========================

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
    -   [How to collect client-side debug info for Counterwallet
        problems?][]
    -   [Diagnostic options in Counterwallet settings][]


Developers
==========

Countewallet
------------

-   Please see the pointers for end users (above).
-   Since it’s easy to check JavaScript Debug Console, it’s usually a
    good idea to check that out first

counterpartyd
-------------


   - Please do not submit bugs for unsupported environments (or at least not without needed details). For unsupported environments it is best to use the chat or forums
   
   - Collect and submit relevant information
   
   - Counterparty, Python, and OS version: normally it’s enough to submit just the `counterpartyd` version information, but sometimes - if installation or other issues are encountered, Python and OS version information may be useful as well

    > -   Counterpartyd version (`counterpartyd -V`)
    > -   Python: (How to get it: `counterpartyd -V` and (Ubuntu)
    >     `python3 -V`). On Windows it’s the same - you want the right
    >     Python version (Python 3) so use the full path to query it.
    > -   OS details (On Linux: `uname -a` and (Ubuntu)
    >     `cat /etc/issue.net`))

-   Whether you are using `develop` or `master` branch
-   Describe the issue and submit the logs
    -   Counterwallet-related problems: what happened, how to duplicate
        the issue, especially whether it was observed in another Web
        browser.
    -   `counterpartyd`-related problems: provide the exact command that
        caused unexpected or wrong behavior, including transaction or
        address information because that allows the developers to see
        how it was processed by Counterparty. The locations of various
        logs can be found in product documentation (submit just the
        relevant part, usually the last few lines). In case of API
        errors, copy the error.
    -   Test Suite

        > The test suite is invoked with \$ py.test in the
        > counterpartylib directory of the counterparty-lib repository.

-   All Counterparty projects are hosted on Github and can be found at
    https://github.com/CounterpartyXCP.
    -   Counterwallet issues should go to the `Counterwallet` repo
    -   `counterpartyd` issues should be submitted to the
        `counterpartyd` repo
    -   Installation and upgrade issues should go to the
        `counterpartyd_build` repo
-   If you think you’ve identified a **security issue**, check out the
    bounties page\_ and contact the Counterparty developers directly.
-   Bounties

    > -   The Counterparty Project Bounties
    >
    > The Counterparty Projects offers bounties for various things, but
    > especially for security issues related to Counterparty software.
    > You can find more about those bounties here:
    > http://counterparty.io/bounties/.
    >
    > -   Community Bounties
    >
    > From time to time community members create development bounties,
    > too.
    >
    > If you want to pay someone to develop a feature or fix a bug for
    > you:
    >
    > > -   Ask in the chat or on the forums. If payment is in crypto,
    > >     you can try to find a trusted community member to serve as
    > >     1-of-3 multisig senders.
    > > -   Create a bounty directly under particular issue, or create a
    > >     bounty on
    > >     http://bountysource.com/teams/counterparty/issues.
    > >     Counterparty repos are integrated with Bountysource.
    > > -   You can also use other sites and announce your bounties in
    > >     the chat or on the forums

[https://github.com/CounterpartyXCP]: https://github.com/CounterpartyXCP
[the Countewallet issues]: https://github.com/CounterpartyXCP/counterwallet/issues
[How to collect client-side debug info for Counterwallet problems?]: http://support.counterparty.io/solution/articles/5000013731-how-to-collect-client-side-debug-information-for-counterwallet-
[Diagnostic options in Counterwallet settings]: http://support.counterparty.io/solution/articles/5000051310-what-do-various-strings-in-the-diagnostic-part-of-counterwallet-advanced-options-mean-
