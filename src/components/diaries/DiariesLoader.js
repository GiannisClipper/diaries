import { useEffect } from 'react';

import { retrieveManyRequestFeature } from '../core/features/requests';

import { urls } from '../app/assets/urls';

import { diariesSchema } from './assets/schemas';

function DiariesLoader( { state, actions, assets } ) {

    const { _uiux } = state;
    const { schema } = assets;
    const { user_id , token } = schema();

    if ( ! _uiux.page.isOpen || user_id + token !== state.user_id + state.token ) {

        actions.openPage( { 
            data: {
                ...diariesSchema(),
                user_id,
                token,
                diaries: [ schema() ],
            } 
        } );

        actions.retrieveManyRequestBefore( { assets, index: 0 } );
    }


    useEffect( () => {

        retrieveManyRequestFeature( { 
            _uiux,
            actions,
            assets,
            url: `${ urls.diaries }?user_id=${ user_id }`
        } );

    } );

    // useEffect( () => console.log( 'Has rendered. ', 'DiariesLoader' ) );

    return null;
}

export default DiariesLoader;
export { DiariesLoader };