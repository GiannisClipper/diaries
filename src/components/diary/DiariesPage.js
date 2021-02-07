import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';

import Diaries from './Diaries';

function DiariesPage() {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'DiariesPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ lexicon.home } />
            <LinkDiaries title={ lexicon.diary.diaries } active />
            <LinkBench title={ lexicon.bench.bench } />
            <LinkUsers title={ lexicon.user.users } />
            <LinkSettings title={ lexicon.settings.settings } />
            <LinkSignout title={ lexicon.signin.signout } />
        </AppNav>

        <AppBox centeredness>
            <Diaries lexicon={ lexicon } />
        </AppBox>

        <AppInfo>
            { lexicon.diary.diaries }
        </AppInfo>
        </>
    );
}

export default DiariesPage;
export { DiariesPage };
