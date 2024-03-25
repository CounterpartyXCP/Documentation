import React from 'react';

import { RedirectedURL, HOME_PAGE } from '../redirections';

export default function Home() {
    const content = "0;url=" + HOME_PAGE;
    return (
        <meta http-equiv="refresh" content={content} />
    )
}