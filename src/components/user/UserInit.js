import React, { useContext, useEffect } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../libs/CRUD';
import { AppContext } from '../app/AppContext';

function UserInit() {

    const { state, dispatch } = useContext( AppContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'UserInit' ) );

    return (
        <CRUDContextProvider
            dispatch={ dispatch }
            namespace={ 'users' }
        >
            <RetrieveManyRequest 
                process={ _uiux.users.process }
                url={ `/.netlify/functions/user` }
            />
        </CRUDContextProvider>
    );
}

export default UserInit;
export { UserInit };