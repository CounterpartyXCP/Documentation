Upgrades
========

Upgrading counterpartyd
-----------------------

Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes the underlying package requirements may change for
``counterpartyd``. If you build and installed it from scratch, you may
manually update these requirements by executing something like:

::

        pip3 install --upgrade -r pip-requirements.txt

Upgrading a Federated Node
--------------------------

To update the system with new code releases, you simply need to rerun the **setup_federated_node** script, like so:

::

        cd ~xcp/counterpartyd_build
        sudo ./setup_federated_node.py

As prompted, you should be able to choose just to update (“U”), instead of to rebuild. However, you would choose the rebuild option if there were updates to the **counterpartyd_build** system files for the federated node itself (such as the **nginx** configuration, or the init scripts) that you wanted/needed to apply. Otherwise, update should be fine.
