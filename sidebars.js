module.exports = {
    basics: [
  'basics/what-is-counterparty',
  'basics/what-is-xcp',
  'basics/what-is-the-history-of-counterparty',
  'basics/what-is-a-counterparty-block-explorer',
  'basics/why-bitcoin',
  'basics/what-is-a-counterparty-asset',
  'basics/what-is-enhanced-asset-information',
  'basics/what-is-the-xcp-dex',
  'basics/what-is-a-counterparty-dispenser',
  'basics/what-is-an-atomic-swap',
  'basics/what-is-a-counterparty-fairmint',
  'basics/what-is-a-counterparty-liquidity-pool',
  'basics/faq',
    ],
    advanced: [
      'advanced/protocol',
      {
        type: 'category',
        label: 'Running a Counterparty Node',
        items: [
          'advanced/getting-started',
          'advanced/manual-installation',
          'advanced/usage',
          'advanced/counterparty-client',
        ],
      },
      {
        type: 'category',
        label: 'Assets (Tokens/NFTs)',
        items: [
          'advanced/assets/counterparty-assets',
          'advanced/assets/enhanced-asset',
          'advanced/assets/enhanced-feed',
        ],
      },
      {
        type: 'category',
        label: 'Node API',
        items: [
          'advanced/api-v2/node-api',
          'advanced/api-v2/v1-to-v2',
          {
                type: 'category',
                collapsible: true,
                collapsed: true,
                label: 'API v1 (Deprecated)',
                items: [
            'advanced/api-v1/api-v1-overview',
            'advanced/api-v1/api-v1-spec',
            'advanced/api-v1/api-v1-changelog'
                ],
          },
        ],
      },
      {
        type: 'category',
        label: 'How-To',
        items: [
          'advanced/how-to/sentry-integration',
          'advanced/how-to/atomic-swap',
          'advanced/how-to/regtest-node',
          'advanced/how-to/gunicorn-server',
        ],
      },
      {
        type: 'category',
        label: 'Specifications',
        items: [
          'advanced/specifications/enable-dispense-tx',
          'advanced/specifications/dispenser-must-be-created-by-source',
          'advanced/specifications/fairminter',
          'advanced/specifications/lockable-issuance-descriptions',
          'advanced/specifications/free-subassets',
          'advanced/specifications/allow-subassets-on-numerics',
          'advanced/specifications/utxo-support',
          'advanced/specifications/gas-system',
          'advanced/specifications/amm-pools',
          'advanced/specifications/bitcoin-data-storage-report',
          'advanced/specifications/taproot-envelope',
          'advanced/specifications/transactions-format',
          'advanced/specifications/counterparty-data-encoding',
        ],
      },
      'advanced/exchange-integration'
    ],
  };
