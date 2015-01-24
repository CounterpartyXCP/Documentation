Release Notes
=============

- `counterpartyd Release Documentation`_ 
- `counterblockd Release Documentation`_
- `counterpartyd_build Release Documentation`_
- `Counterwallet Release Documentation`_


.. _counterpartyd Release Documentation: https://github.com/CounterpartyXCP/counterpartyd/releases
.. _counterblockd Release Documentation: https://github.com/CounterpartyXCP/counterblockd/releases
.. _counterpartyd_build Release Documentation: https://github.com/CounterpartyXCP/counterpartyd_build/releases
.. _Counterwallet Release Documentation: https://github.com/CounterpartyXCP/counterwallet/releases


Release Procedure
==========================

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
- Upload package to PyPi

**@ivanazuber:**: 

- Post to `Official Forums`_, Skype, `Gitter`_ 
- Post to social media 
- SMS and mailing list notifications

API
~~~~~~~~~~~~~~~~~~~~~~~~~~~

There will be no incompatible API pushes that do not either have: \* A
well known set cut over date in the future \* Or, a deprecation process
where the old API is supported for an amount of time

Branches
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  The **master** branch contains the production-ready code. It is
   updated for version releases and hotfixes only.
-  The **develop** branch hosts the most recent version of the code,
   with all finished features integrated together. ``develop`` should
   always be in consensus with ``master``, and it should not break
   often.
-  **Feature** branches


Upgrades
================

Upgrading counterpartyd
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes the underlying package requirements may change for
``counterpartyd``. If you build and installed it from scratch, you may
manually update these requirements by executing something like:

::

    pip3 install --upgrade -r pip-requirements.txt


Upgrading a Federated Node
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To update the system with new code releases, you simply need to rerun the **setup_federated_node** script, like so:


::
    
    cd ~xcp/counterpartyd_build
    sudo ./setup_federated_node.py

As prompted, you should be able to choose just to update (“U”), instead of to rebuild. However, you would choose the rebuild option if there were updates to the **counterpartyd_build** system files for the federated node itself (such as the **nginx** configuration, or the init scripts) that you wanted/needed to apply. Otherwise, update should be fine.

.. _Release Notes: https://github.com/CounterpartyXCP/counterpartyd/releases
.. _Official Forums: https://forums.counterparty.io/discussion/445/new-version-announcements-counterparty-and-counterpartyd
.. _Gitter: https://gitter.im/CounterpartyXCP
