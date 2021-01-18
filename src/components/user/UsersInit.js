import React, { useEffect } from 'react';

import { RetrieveManyRequest } from '../core/CoreRequests';

import { UsersContext } from './UsersContext';
import { usersSchema } from './assets/schemas';

function UsersInit( { state, actions, assets } ) {

    const { _uiux } = state;
    const { schema } = assets;

    if ( ! _uiux.page.isOpen ) {

        actions.openPage( { data: {
                ...usersSchema(),
                users: [ schema() ],
        } } );

        actions.retrieveManyRequestBefore( { assets, index: 0 } );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'UsersInit' ) );

    return (
        <RetrieveManyRequest
            Context={ UsersContext }
            assets={ assets }
            url={ `/.netlify/functions/user` }
        />
    );
}

export default UsersInit;
export { UsersInit };