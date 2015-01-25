#How to install specific release of Counterparty software using counterparty_build

Since early 2015 the main Counterparty repositories such as
``counterpartyd``, ``counterpartyd_build``, ``counterblockd`` and
``Counterwallet`` have version-tagged releases (e.g. 1.0.0).

One may wonder if it’s possible, and how, to pick releases when
installing or updating together a Federated Node.

This can be a complicated topic, but in a nutshell: \* If you want a
specific release, use ``git clone`` to get it (you’d use the same
location used by ``counterparty_build``, and then run the setup script
as usual. \* Things to remember: \* Officially supported releases is
limited to a handful of possible options. For example the current
version of Counterwallet does not support a prehistoric version of
``counterpartyd``, but it may support the current and previous two
releases depending on technical circumstances. \* Another scenario that
probably won’t be tested and supported by ``counterparty_build`` is
upgrades that generally go against best practices, such as rebuilding a
``develop`` system using an older release or branch. See the latest
``counterpartyd_build`` documentation for details, but generally
speaking it’s best to pick one branch (such as ``master``) and stick
with it using the rebuild and update approach offered by
``counterpartyd_build`` scripts.
