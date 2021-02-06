import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';
import appLexicons from '../app/assets/lexicons';

import lexicons from './assets/lexicons';
import Diaries from './Diaries';

function DiariesPage() {

    const { language } = useContext( AppContext ).state.settings;
    const appLexicon = appLexicons[ language ] || appLexicons.DEFAULT;
    const lexicon = lexicons[ language ] || lexicons.DEFAULT;

    // useEffect( () => console.log( 'Has rendered. ', 'DiariesPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ appLexicon.home } />
            <LinkDiaries title={ appLexicon.diaries } active />
            <LinkBench title={ appLexicon.bench } />
            <LinkUsers title={ appLexicon.users } />
            <LinkSettings title={ appLexicon.settings } />
            <LinkSignout title={ appLexicon.signout } />
        </AppNav>

        <AppBox centeredness>
            <Diaries lexicon={ lexicon } />
        </AppBox>

        <AppInfo>
            { lexicon.diaries }
        </AppInfo>
        </>
    );
}

export default DiariesPage;
export { DiariesPage };
