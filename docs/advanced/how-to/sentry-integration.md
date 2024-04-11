---
title: Sentry Integration
---

Counterparty Core allows for easy integration with [Sentry](http://sentry.io) for error reporting and performance monitoring. This feature is **opt-in** for each node operator. To enable the integration, simply export the [( Data Source Name )](https://docs.sentry.io/product/sentry-basics/concepts/dsn-explainer/) from your Sentry project as an environment variable before starting your node:

```bash
export SENTRY_DSN=<YOUR_SENTRY_DSN>
```

You can find additional configuration options [here](https://docs.sentry.io/platforms/python/configuration/) (e.g. `SENTRY_ENVIRONMENT` and `SENTRY_RELEASE`).
