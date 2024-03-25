import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const HOME_PAGE = '/docs/basics/what-is-counterparty';
const WALLETS_URL = 'https://www.counterparty.io/wallets';
const SUPPORT_URL = 'https://www.counterparty.io/support';
const README_URL = 'https://github.com/CounterpartyXCP/counterparty-core/blob/master/README.md'

const REDIRECTIONS = {
    '/' : HOME_PAGE,
    '/docs/basics/faq/smart-contracts/': HOME_PAGE,
    '/docs/basics/faq/lightning-network/': HOME_PAGE,
    '/docs/basics/support/': SUPPORT_URL,
    '/docs/wallets/counterwallet': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/getting-started': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/create-addresses': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/dex-trade': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/multisig': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/show-qrcode': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/get-token-info': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/create-token': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/change-token-settings': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/pay-distribution': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/broadcast': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/voting': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/buy-sell': WALLETS_URL,
    '/docs/wallets/counterwallet-tutorials/create-armory-addresses': WALLETS_URL,
    '/docs/wallets/counterwallet-notes': WALLETS_URL,
    '/docs/advanced/federated-node/getting-started/': README_URL,
    '/docs/advanced/federated-node/pre-installation/': README_URL,
    '/docs/advanced/federated-node/installation/': README_URL,
    '/docs/advanced/federated-node/administration/': README_URL,
    '/docs/advanced/federated-node/counterwallet/': README_URL,
    '/docs/advanced/installation/bitcoin-core/': README_URL,
    '/docs/advanced/installation/windows/': README_URL,
    '/docs/develop/counterblock/api/': README_URL,
    '/docs/develop/counterblock/modules/': README_URL,
} 

export function RedirectedURL(props) {

    return (
        <BrowserOnly>
        {() => {
            const url = window.location.pathname;
            if (url in REDIRECTIONS) {
                const content = "0;url=" + REDIRECTIONS[url];
                return <meta http-equiv="refresh" content={content} />;
            }
            return props.children;
        }}
        </BrowserOnly>
    );
}
