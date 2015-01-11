Release Procedure
-----------------

**@adamkrellenstein:**

- Quality Assurance 
- Update ``CHANGELOG.md`` 
- Update ``lib.config.py``: ``VERSION_*`` 
- Update ``protocol_changes.json`` (if necessary) 
- Update test suite (as necessary) 
- Run test suite 
- Update documentation (as appropriate).
- Tag and Sign Release 
- Merge branch into both ``master`` and ``develop``. 
- Rebase ``gh-pages`` to ``master`` 
- Write `Release Notes`_

**@ivanazuber:**: 

- Post to `Official Forums`_, Skype, `Gitter`_ 
- Post to social media 
- SMS and mailing list notifications

API
---

There will be no incompatible API pushes that do not either have: \* A
well known set cut over date in the future \* Or, a deprecation process
where the old API is supported for an amount of time

Branches
--------

-  The **master** branch contains the production-ready code. It is
   updated for version releases and hotfixes only.
-  The **develop** branch hosts the most recent version of the code,
   with all finished features integrated together. ``develop`` should
   always be in consensus with ``master``, and it should not break
   often.
-  ‘**Feature**’ branches

.. _Release Notes: https://github.com/CounterpartyXCP/counterpartyd/releases
.. _Official Forums: https://forums.counterparty.io/discussion/445/new-version-announcements-counterparty-and-counterpartyd
.. _Gitter: https://gitter.im/CounterpartyXCP
