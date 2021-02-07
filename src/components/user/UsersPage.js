import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';

import Users from './Users';

function UsersPage() {

    const { lexicon } = useContext( AppContext ).state.settings;

    // useEffect( () => console.log( 'Has rendered. ', 'UsersPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ lexicon.home } />
            <LinkDiaries title={ lexicon.diary.diaries } />
            <LinkBench title={ lexicon.bench.bench } />
            <LinkUsers title={ lexicon.user.users } active />
            <LinkSettings title={ lexicon.settings.settings } />
            <LinkSignout title={ lexicon.signin.signout } />
        </AppNav>

        <AppBox centeredness>
            <Users lexicon={ lexicon } />
        </AppBox>

        <AppInfo>
            { lexicon.user.users }
        </AppInfo>
        </>
    );
}

export default UsersPage;
export { UsersPage };
