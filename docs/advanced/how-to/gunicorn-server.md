# Use Gunicorn WSGI server

By default, `counterpart-server` uses the WSGI Waitress server. This server is production quality, uses only one processor and is multi-threaded.

For servers with heavy traffic it is possible to use Gunicorn with the flag `--wsgi-server=gunicorn`. Gunicorn uses a different processors for each worker but can be problematic on some platforms (see https://docs.python.org/3/library/os.html#os.fork).