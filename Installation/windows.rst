Prerequisites
^^^^^^^^^^^^^^^

**NOTE:** These instructions cover building counterpartyd as 32-bit. This will
work with both 32-bit and 64-bit versions of Windows, and is the simplier and
recommended approach

Minimally required to build ``counterpartyd`` from source is the following:

- Python 3.4.1 -- grab the `32-bit version <http://www.python.org/ftp/python/3.4.1/python-3.4.1.msi>`__
  - Install to the default ``C:\Python34`` location
- Python Win32 extensions -- grab the `32-bit version <http://sourceforge.net/projects/pywin32/files/pywin32/Build%20219/pywin32-219.win32-py3.4.exe/download>`__
  - Ensure you run this setup program **as administrator**, or you will get an error about missing DLL files while installing counterpartyd
- APSW for Windows -- grab the `32-bit version <https://github.com/rogerbinns/apsw/releases/download/3.8.5-r1/apsw-3.8.5-r1.win32-py3.4.exe>`__
- Pycrypto for Windows -- grab the `32-bit version <https://s3.amazonaws.com/counterparty-bootstrap/pycrypto-2.6.1.win32-py3.4.exe>`__
- Visual C++ 2008 Redistributables (if not already installed) -- grab it `here <http://www.microsoft.com/downloads/details.aspx?familyid=9B2DA534-3E03-4391-8A4D-074B9F2BC1BF>`__
- OpenSSL for Windows -- grab the `32-bit version <http://slproweb.com/download/Win32OpenSSL_Light-1_0_1L.exe>`__
- `Git for Windows <http://git-scm.com/download/win>`__
  - Use the default installer options (except, select *"Use Git from the Windows Command Prompt"* on the appropriate screen)


Install Visual Studio 2010 Express and Its SP1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

https://www.microsoft.com/visualstudio/eng/downloads#d-2010-express

Install MS SDK for Windows v7.1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When installing, under ``Windows Native Code Development``, check
``Windows C++ Compilers`` `here <http://www.microsoft.com/en-us/download/details.aspx?displaylang=en&id=8279>`_

Also install KB 2519277 (`Microsoft Visual C++ 2010 Service Pack 1
Compiler Update for the Windows SDK 7.1 <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=689655b4-c55d-4f9b-9665-2c547e637b70>`_)
