---
title: Enabling Sentry 
---

To enable error reporting with [Sentry](http://sentry.io), create a new project and 
export the associated [( Data Source Name )](https://docs.sentry.io/product/sentry-basics/concepts/dsn-explainer/) 
as an environment variable before starting your node:

```bash

export SENTRY_DSN=<YOUR_SENTRY_DSN>

```

You can find additional configuration options [here](https://docs.sentry.io/platforms/python/configuration/) ( e.g. `SENTRY_ENVIRONMENT` and `SENTRY_RELEASE`).

**Note: Error logging is an opt-in feature and is up to the node operator's discretion**




