import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';
import appLexicons from '../app/assets/lexicons';

import lexicons from './assets/lexicons';
import Users from './Users';

function UsersPage() {

    const { language } = useContext( AppContext ).state.settings;
    const appLexicon = appLexicons[ language ] || appLexicons.DEFAULT;
    const lexicon = lexicons[ language ] || lexicons.DEFAULT;

    // useEffect( () => console.log( 'Has rendered. ', 'UsersPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ appLexicon.home } />
            <LinkDiaries title={ appLexicon.diaries } />
            <LinkBench title={ appLexicon.bench } />
            <LinkUsers title={ appLexicon.users } active />
            <LinkSettings title={ appLexicon.settings } />
            <LinkSignout title={ appLexicon.signout } />
        </AppNav>

        <AppBox centeredness>
            <Users lexicon={ lexicon } />
        </AppBox>

        <AppInfo>
            { lexicon.users }
        </AppInfo>
        </>
    );
}

export default UsersPage;
export { UsersPage };
