import React, { useContext, useEffect } from 'react';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { UsersContext } from './UsersContext';
import { usersSchema } from '../../storage/schemas';

function UsersInit() {

    const { state, actions, customization } = useContext( UsersContext );
    const { _uiux } = state;
    const { schema } = customization;

    if ( Object.keys( _uiux.process ).length === 0 ) {
        actions.updateState( { data: {
                ...usersSchema(),
                users: [ schema() ],
        } } );
        actions.retrieveManyRequestBefore();
    }

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