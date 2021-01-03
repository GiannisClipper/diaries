import React, { useState } from 'react';
import { UsersContextProvider } from './UsersContext';
import { AppBox, AppNav, LinkHome, LinkDiaries, LinkUsers, LinkSettings, LinkSignout } from '../app/AppPage';
import Users from './Users';

function UserPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'UserPage' ) );

    return (
        <UsersContextProvider>
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
        </UsersContextProvider>
    );
}

export default UserPage;
export { UserPage };
