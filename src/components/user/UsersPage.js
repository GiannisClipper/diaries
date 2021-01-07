import React, { useState } from 'react';
import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';
import Users from './Users';

function UsersPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'UsersPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkBench />
            <LinkUsers active />
            <LinkSettings />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness>
            <Users />
        </AppBox>
        </>
    );
}

export default UsersPage;
export { UsersPage };
