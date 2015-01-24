
On Windows
-----------

Prerequisites
^^^^^^^^^^^^^^^

**NOTE:** These instructions cover building counterpartyd as 32-bit. This will work with both 32-bit and 64-bit versions of
Windows, and is the simplier and recommended approach. (We also have instructions on how to build for 64-bit Windows 7
`here <https://github.com/CounterpartyXCP/Wiki/wiki/Counterpartyd-with-64-bit-version-of-Python>`__.)

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

