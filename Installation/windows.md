# Counterparty Dependencies on Windows

**Note:** These instructions are for a 32-bit installation. This will work with
both 32-bit and 64-bit versions of Windows, and is the recommended approach.

- [Python 3.4.4](https://www.python.org/ftp/python/3.4.4/python-3.4.4.msi)
- [Python Win32 extensions](http://sourceforge.net/projects/pywin32/files/pywin32/Build%20219/pywin32-219.win32-py3.4.exe/download) (Install as an **administrator**, or you will get an error about missing DLL files later.)
- [APSW 3.8.8.1-r1](https://github.com/rogerbinns/apsw/releases/download/3.8.8.1-r1/apsw-3.8.8.1-r1.win32-py3.4.exe)
- [Pycrypto 2.6.1](https://s3.amazonaws.com/counterparty-bootstrap/pycrypto-2.6.1.win32-py3.4.exe)
- [Microsoft Visual C++ 2008 Redistributable Package (x86)](http://www.microsoft.com/downloads/details.aspx?familyid=9B2DA534-3E03-4391-8A4D-074B9F2BC1BF)
- [OpenSSL 1.0.2h](http://slproweb.com/download/Win32OpenSSL_Light-1_0_2h.exe)
- [Git](http://git-scm.com/download/win) (Optional) (Select "**Use Git from the Windows Command Prompt**".)- 

# Usage and notes for Windows

Counterparty binaries `counterparty-server.exe` and `counterparty-client.exe` are installed to `C:\Python34\Scripts`. This path can be added to the system `PATH` variable.

The default configuration files can be used on testnet provided the `--testnet` option is employed. Alternatively, a different set of custom configuration files that contain `testnet=1` can be provided at runtime like in these examples:

        counterparty-server --config-file E:\testing\server.testnet.conf start
        counterparty-client --config-file E:\testing\client.testnet.conf wallet



