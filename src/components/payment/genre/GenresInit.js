import React, { useContext, useEffect  } from 'react';
import { RetrieveManyRequest } from '../../core/CoreRequests';
import { BenchContext } from '../../bench/BenchContext';
import { GenresContext } from './GenresContext';
import { paymentGenresSchema } from '../../../storage/schemas';

function GenresInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, actions, assets } = useContext( GenresContext );
    const { schema } = assets;

    if ( state.diary_id !== diary_id ) {
        actions.updateState( { data: {
            ...paymentGenresSchema(),
            diary_id,
            genres: [ schema() ],
        } } );
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