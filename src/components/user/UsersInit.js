import React, { useContext, useEffect } from 'react';
import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { userSchema } from '../../storage/schemas';
import { parseUserFromDB } from '../../storage/user/parsers';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { UsersContext } from './UsersContext';

function UsersInit() {

    const { state, dispatch } = useContext( UsersContext );
    const { _uiux } = state;

    const payload = {
        _namespace: 'users',
        _schema: userSchema,
        _parseFromDB: parseUserFromDB,
        _sort: ( x, y ) => x.username > y.username ? 1 : -1,
    };

    //useEffect( () => console.log( 'Has rendered. ', 'UsersInit' ) );

    return (
        <CoreContextProvider
            dispatch={ dispatch }
            actions={ [ actions.retrieveMany ] }
            payload={ payload }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/user` }
            />
        </CoreContextProvider>
    );
}

export default UsersInit;
export { UsersInit };