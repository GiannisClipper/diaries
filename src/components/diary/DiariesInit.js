import React, { useEffect } from 'react';

import { RetrieveManyRequest } from '../core/CoreRequests';

import { DiariesContext } from './DiariesContext';
import { diariesSchema } from './assets/schemas';

function DiariesInit( { actions, assets, state } ) {

    const user_id = assets.schema().user_id;

    if ( user_id !== state.user_id ) {

        actions.updateState( { data: {
                ...diariesSchema(),
                user_id,
                diaries: [ assets.schema() ],
        } } );

        actions.retrieveManyRequestBefore( { assets, index: 0 } );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'DiariesInit' ) );

    return (
        <RetrieveManyRequest
            Context={ DiariesContext }
            assets={ assets }
            url={ `/.netlify/functions/diary?user_id=${ user_id }` }
        />
    );
}

export default DiariesInit;
export { DiariesInit };