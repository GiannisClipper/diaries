import React, { useState } from 'react';
import { UsersContextProvider } from './UsersContext';
import Users from './Users';

function UserApp() {

    // useEffect( () => console.log( 'Has rendered. ', 'UserApp' ) );

    return (
        <UsersContextProvider>
            <Users />
        </UsersContextProvider>
    );
}

export default UserApp;
export { UserApp };
