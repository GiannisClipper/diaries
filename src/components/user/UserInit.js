import React, { useContext, useEffect } from 'react';
import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { UsersContext } from './UsersContext';

function UserInit() {

    const { state, dispatch } = useContext( UsersContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'UserInit' ) );

    return (
        <CoreContextProvider
            actions={ [ actions.retrieveMany ] }
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/user` }
            />
        </CoreContextProvider>
    );
}

export default UserInit;
export { UserInit };