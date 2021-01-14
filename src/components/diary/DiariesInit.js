import React, { useContext, useEffect } from 'react';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { AppContext } from '../app/AppContext';
import { DiariesContext } from './DiariesContext';
import { diariesSchema } from '../../storage/schemas';

function DiariesInit() {

    const { user_id } = useContext( AppContext ).state.signin;

    const { state, actions, assets } = useContext( DiariesContext );
    const { schema } = assets;

    if ( state.user_id !== user_id ) {

        actions.updateState( { data: {
                ...diariesSchema(),
                user_id,
                diaries: [ schema() ],
        } } );

        actions.retrieveManyRequestBefore();
    }

    // useEffect( () => console.log( 'Has rendered. ', 'DiariesInit' ) );

    return (
        <RetrieveManyRequest
            Context={ DiariesContext }
            url={ `/.netlify/functions/diary?user_id=${ user_id }` }
        />
    );
}

export default DiariesInit;
export { DiariesInit };