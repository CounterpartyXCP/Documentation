/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Counterparty',
  tagline: 'NFTs and tokens over Bitcoin',
  url: 'https://counterpartyxcp.github.io',
  baseUrl: '/Documentation/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CounterpartyXCP', // Usually your GitHub org/user name.
  projectName: 'Documentation', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Counterparty',
      logo: {
        alt: 'Counterparty',
        src: 'img/xcp.png',
      },
      items: [
        {
          to: 'docs/basics/what-is-counterparty/a-bitcoin-protocol',
          activeBasePath: 'docs/basics',
          label: 'Basics',
          position: 'left',
        },
        {
          to: 'docs/wallets/counterwallet',
          activeBasePath: 'docs/wallets',
          label: 'Wallets',
          position: 'left',
        },
        {
          to: 'docs/advanced/architecture',
          activeBasePath: 'docs/advanced',
          label: 'Advanced',
          position: 'left',
        },
        {
          to: 'docs/develop/api/overview',
          activeBasePath: 'docs/develop',
          label: 'Develop',
          position: 'left',
        },
        {
          href: 'https://github.com/CounterpartyXCP/Documentation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/basics/what-is-counterparty/a-bitcoin-protocol',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/wsjKtPGrMF',
            },
            {
              label: 'Forum',
              href: 'https://counterpartytalk.org/',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/counterparty_xcp/',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/Counterparty_XCP',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/CounterpartyXCP',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/CounterpartyXCP/Documentation',
            },
            {
              label: 'Bylaws',
              href: 'docs/foundation-bylaws/bylaws',
            }
          ],
        },
      ],
      copyright: `CC © 2014 - ${new Date().getFullYear()} Counterparty, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
