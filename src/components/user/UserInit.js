import React, { useContext, useEffect } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../libs/CRUD';
import { UsersContext } from './UsersContext';

function UserInit() {

    const { state, dispatch } = useContext( UsersContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'UserInit' ) );

    return (
        <CRUDContextProvider
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/user` }
            />
        </CRUDContextProvider>
    );
}

export default UserInit;
export { UserInit };