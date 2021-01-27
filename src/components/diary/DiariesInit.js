import { useEffect } from 'react';

import { retrieveManyRequestFeature } from '../core/features/requests';

import { diariesSchema } from './assets/schemas';

function DiariesInit( { state, actions, assets } ) {

    const { _uiux } = state;
    const { schema } = assets;
    const user_id = schema().user_id;

    if ( 
        ! _uiux.page.isOpen ||
        user_id !== state.user_id
    ) {

        actions.openPage( { 
            data: {
                ...diariesSchema(),
                user_id,
                diaries: [ schema() ],
            } 
        } );

        actions.retrieveManyRequestBefore( { assets, index: 0 } );
    }

    // request feature

    useEffect( () => {

        retrieveManyRequestFeature( { 
            _uiux,
            actions,
            assets,
            url: `/.netlify/functions/diary?user_id=${ user_id }`
        } );

    } );

    // useEffect( () => console.log( 'Has rendered. ', 'DiariesInit' ) );

    return null;
}

export default DiariesInit;
export { DiariesInit };