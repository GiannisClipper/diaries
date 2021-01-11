import React, { useEffect } from 'react';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';

import Diaries from './Diaries';

function DiariesPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'DiariesPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries active />
            <LinkBench />
            <LinkUsers />
            <LinkSettings />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness>
            <Diaries />
        </AppBox>

        <AppInfo>
            Ημερολόγια
        </AppInfo>
        </>
    );
}

export default DiariesPage;
export { DiariesPage };
