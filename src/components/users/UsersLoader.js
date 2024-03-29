import { useEffect } from 'react';

import { retrieveManyRequestFeature } from '../core/features/requests';

import { urls } from '../app/assets/urls';

import { usersSchema } from './assets/schemas';

function UsersLoader( { state, actions, assets } ) {

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
            url: urls.users
        } );

    } );

    // useEffect( () => console.log( 'Has rendered. ', 'UsersLoader' ) );

    return null;
}

export default UsersLoader;
export { UsersLoader };