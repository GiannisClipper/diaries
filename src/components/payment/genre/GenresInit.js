import React, { useContext, useEffect  } from 'react';

import { RetrieveManyRequest } from '../../core/CoreRequests';

import { BenchContext } from '../../bench/BenchContext';
import { GenresContext } from './GenresContext';

function GenresInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, actions, customization } = useContext( GenresContext );
    const { schema } = customization;

    if ( state.diary_id !== diary_id ) {
        actions.updateState( { data: { ...schema, diary_id } } );
        actions.retrieveManyRequestBefore();
    }

    //useEffect( () => console.log( 'Has rendered. ', 'payment/GenresInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <RetrieveManyRequest 
                Context={ GenresContext }
                url={ `/.netlify/functions/payment-genre?diary_id=${diary_id}` }
            />
        );
    }
}

export default GenresInit;
export { GenresInit };