  module.exports = {
    basics: [
      'basics/what-is-counterparty',
      'basics/what-is-xcp',
      'basics/faq',
      {
        type: 'category',
        label: 'Running a Counterparty Node',
        items: [
          'basics/getting-started',
          'basics/manual-installation',
          'basics/usage',
        ],
      },
      {
        type: 'category',
        label: 'Assets (Tokens/NFTs)',
        items: [
          'basics/assets/counterparty-assets',
          'basics/assets/enhanced-asset',
          'basics/assets/enhanced-feed',
        ],
      },
    ],
    advanced: [
      'advanced/protocol',
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
          'advanced/specifications/bitcoin-data-storage-report',
          'advanced/specifications/taproot-envelope',
        ],
      },
      'advanced/bounties',
      'advanced/exchange-integration'
    ],
  };
