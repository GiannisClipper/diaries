import React, { useState } from 'react';
import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';
import Users from './Users';

function UserPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'UserPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkUsers />
            <LinkSettings />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness>
            <Users />
        </AppBox>
        </>
    );
}

export default UserPage;
export { UserPage };
