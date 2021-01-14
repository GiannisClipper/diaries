import React, { useContext, useEffect  } from 'react';
import { RetrieveManyRequest } from '../../core/CoreRequests';
import { BenchContext } from '../../bench/BenchContext';
import { FundsContext } from './FundsContext';
import { paymentFundsSchema } from '../../../storage/schemas';

function FundsInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, actions, assets } = useContext( FundsContext );
    const { schema } = assets;

    if ( state.diary_id !== diary_id ) {
        actions.updateState( { data: {
            ...paymentFundsSchema(),
            diary_id,
            funds: [ schema() ],
        } } );
        actions.retrieveManyRequestBefore();
    }

    if ( state.diary_id !== diary_id ) {
        actions.updateState( { data: { ...schema, diary_id } } );
        actions.retrieveManyRequestBefore();
    }

    //useEffect( () => console.log( 'Has rendered. ', 'payment/FundsInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <RetrieveManyRequest 
                Context={ FundsContext }
                url={ `/.netlify/functions/payment-fund?diary_id=${diary_id}` }
            />
        );
    }
}

export default FundsInit;
export { FundsInit };