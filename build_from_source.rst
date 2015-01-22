Building & Running from Source
================================

**NOTE:** Please make sure you've followed the instructions in the
`Setting up bitcoind <http://counterparty.io/docs/build-system/set-up-bitcoind/>`__ section before
moving through this section.

This section provides information about how to install and run ``counterpartyd`` from source, using this
``counterpartyd`` build system (as an alternative to setting it up manually).


On Windows
-----------

Prerequisites
^^^^^^^^^^^^^^^

**NOTE:** These instructions cover building counterpartyd as 32-bit. This will work with both 32-bit and 64-bit versions of
Windows, and is the simplier and recommended approach. (We also have documentation on how to build for 64-bit Windows 7
`here <https://wiki.counterparty.co/w/Counterparty_with_64-bit_Python_3.4>`__.)

Minimally required to build ``counterpartyd`` from source is the following:

- Python 3.4.1 -- grab the `32-bit version <http://www.python.org/ftp/python/3.4.1/python-3.4.1.msi>`__
  - Install to the default ``C:\Python34`` location
- Python Win32 extensions -- grab the `32-bit version <http://sourceforge.net/projects/pywin32/files/pywin32/Build%20219/pywin32-219.win32-py3.4.exe/download>`__
  - Ensure you run this setup program **as administrator**, or you will get an error about missing DLL files while installing counterpartyd
- APSW for Windows -- grab the `32-bit version <https://github.com/rogerbinns/apsw/releases/download/3.8.5-r1/apsw-3.8.5-r1.win32-py3.4.exe>`__
- Pycrypto for Windows -- grab the `32-bit version <https://s3.amazonaws.com/counterparty-bootstrap/pycrypto-2.6.1.win32-py3.4.exe>`__
- Visual C++ 2008 Redistributables (if not already installed) -- grab it `here <http://www.microsoft.com/downloads/details.aspx?familyid=9B2DA534-3E03-4391-8A4D-074B9F2BC1BF>`__
- OpenSSL for Windows -- grab the `32-bit version <http://slproweb.com/download/Win32OpenSSL_Light-1_0_1j.exe>`__
- `Git for Windows <http://git-scm.com/download/win>`__
  - Use the default installer options (except, select *"Use Git from the Windows Command Prompt"* on the appropriate screen)

Installing
^^^^^^^^^^^^^^^^^^^^^^

**NOTE:** Our install script (setup.py) requires administrator access to run (so that it can create a counterpartyd.bat file
in your Windows directory). To allow for this, you must launch a command prompt **as administrator**. To do this
under Windows 7, go to Start -> All Programs -> Accessories, then right click on Command Prompt and select "Run as administrator".
More information on this is available from `this link <http://www.bleepingcomputer.com/tutorials/windows-elevated-command-prompt/>`__ (method 1 or 2 works fine).
    
After launching a DOS command window using the instructions in the note above, type the following commands::

    cd C:\
    git clone https://github.com/CounterpartyXCP/counterpartyd_build
    cd counterpartyd_build
    C:\Python34\python.exe setup.py --with-bootstrap-db

Some notes:

* The above steps will check out the build scripts to ``C:\counterpartyd_build``, and run the ``setup.py`` script, which
  will check out the newest version of ``counterpartyd`` itself from git, create a virtual environment with the
  required dependencies, and do other necessary tasks to integrate it into the system.
* If you want to configure ``counterpartyd`` for testnet as well, add the ``--with-testnet`` switch to the ``setup.py`` command as well.
* If you want to generate your own ``counterpartyd`` database from scratch, don't use the ``--with-bootstrap-db`` switch. 
* If you chose to start ``counterpartyd`` at startup automatically, the setup script will also create a shortcut
  to ``counterpartyd`` in your Startup group. 

Upon the successful completion of this script, you can now run ``counterpartyd`` using the steps below.


Running counterpartyd built from Source
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Counterpartyd does not require elevated ("administrator") privileges to be executed and operated.  
After installing, open a command window and run ``counterpartyd`` in the foreground via::

    counterpartyd server

You can then open up another command window and run any of ``counterpartyd’s`` other functions, for example::

    counterpartyd send --source=12WQTnVbzhJRswra4TvGxq1RyhUkmiVXXm \
    --destination=1QGZ4sCpvCgRizL5v4NniaKdZKzxBtVN3q --asset=XCP --quantity=5

For more examples, see `this link <https://github.com/CounterpartyXCP/counterpartyd#examples>`__.

To run the ``counterpartyd`` testsuite (not yet completed for Windows)::

    counterpartyd tests 


Updating to the newest source
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As the code is enhanced and improved on Github, you can refresh your local copy of the repositories like so (assuming Python 3.4)::

    cd C:\counterpartyd_build
    C:\Python34\python.exe setup.py update

If, upon running counterpartyd, you get a missing dependency or some other error, you can always rerun
``setup.py``, which will regenerate your dependencies listing to the libraries and versions as listed in
`pip-requirements.txt <https://github.com/CounterpartyXCP/counterpartyd/blob/master/pip-requirements.txt>`__::

    cd C:\counterpartyd_build
    C:\Python34\python.exe setup.py

In case of a problem, refer to the list of requirements in ``pip-requirements.txt`` above and update system as
necessary. Then rerun the build script again.


On Linux
-----------

Prerequisites
^^^^^^^^^^^^^^^^^^^^^^

Currently, Ubuntu Linux (Server or Desktop) **12.04 LTS**, **13.10**, and **14.04** are supported.

Support for other distributions is a future task.


Installing
^^^^^^^^^^^^^^^^^^^^^^

**As the user you want to run** ``counterpartyd`` **as**, launch a terminal window, and type the following::

    sudo apt-get -y update
    sudo apt-get -y install git-core python3
    git clone https://github.com/CounterpartyXCP/counterpartyd_build ~/counterpartyd_build
    cd ~/counterpartyd_build
    sudo python3 setup.py --with-bootstrap-db

Some notes:

* The ``setup.py`` script will install necessary dependencies, check out the newest version of ``counterpartyd``
  itself from git, create the python environment for ``counterpartyd``, and install an upstart script that
  will automatically start ``counterpartyd`` on startup.
* If you want to configure ``counterpartyd`` for testnet as well, add the ``--with-testnet`` switch to the ``setup.py`` command as well.
* If you want to generate your own ``counterpartyd`` database from scratch, don't use the ``--with-bootstrap-db`` switch. 
* If you chose to start ``counterpartyd`` at startup automatically, the setup script will also create a shortcut
  to ``counterpartyd`` in your Startup group. 


Creating a default config
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the instructions listed under the **Config and Logging** section in the `Additional Topics <http://counterparty.io/docs/build-system/additional/>`__ section.


Running counterpartyd built from Source
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After installing and creating the necessary basic config, run ``counterpartyd`` in the foreground to make sure
everything works fine::

    counterpartyd server
    
(The above assumes ``/usr/local/bin`` is in your PATH, which is where the ``counterpartyd`` symlink (which just
points to the ``run.py`` script) is placed. If not, run ``/usr/local/bin/counterpartyd`` instead.)

Once you're sure it launches and runs fine, you can press CTRL-C to exit it and - if you configured ``counterpartyd`` 
to start automatically on system startup - then run ``counterpartyd`` as a background process via this command:

    sudo sv start counterpartyd

You can then open up another command window and run any of ``counterpartyd’s`` other functions, for example::

    counterpartyd send --source=12WQTnVbzhJRswra4TvGxq1RyhUkmiVXXm \
    --destination=1QGZ4sCpvCgRizL5v4NniaKdZKzxBtVN3q --asset=XCP --quantity=5

For more examples, see `this link <https://github.com/CounterpartyXCP/counterpartyd#examples>`__.

To run the ``counterpartyd`` testsuite::

    counterpartyd tests


Updating to the newest source
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As the code is enhanced and improved on Github, you can refresh your local copy of the repositories like so::

    cd ~/counterpartyd_build
    sudo python3 setup.py update

Counterparty for Windows must also be updated from a console window started with elevated privileges.

If, upon running counterpartyd, you get a missing dependency or some other error, you can always rerun
``setup.py``, which will regenerate your dependencies listing to the libraries and versions as listed in
`pip-requirements.txt <https://github.com/CounterpartyXCP/counterpartyd/blob/master/pip-requirements.txt>`__::

    cd ~/counterpartyd_build
    sudo python3 setup.py

The same approach applies to Windows - this operation requires elevation.
