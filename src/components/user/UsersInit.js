import React, { useEffect } from 'react';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { UsersContext } from './UsersContext';

function UsersInit() {

    //useEffect( () => console.log( 'Has rendered. ', 'UsersInit' ) );

    return (
        <RetrieveManyRequest
            Context={ UsersContext }
            url={ `/.netlify/functions/user` }
        />
    );
}

export default UsersInit;
export { UsersInit };