import { useEffect } from 'react';

import { retrieveManyRequestFeature } from '../core/features/requests';

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

    // request feature

    useEffect( () => {

        retrieveManyRequestFeature( { 
            _uiux,
            actions,
            assets,
            url: `/.netlify/functions/user`
        } );

    } );

    // useEffect( () => console.log( 'Has rendered. ', 'UsersInit' ) );

    return null;
}

export default UsersInit;
export { UsersInit };