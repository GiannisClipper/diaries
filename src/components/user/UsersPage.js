import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';

import Users from './Users';

function UsersPage() {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'UsersPage' ) );

    return (
        <>
        <AppNav active="users" / >

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
