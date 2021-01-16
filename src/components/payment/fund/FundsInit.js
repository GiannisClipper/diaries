import React, { useContext, useEffect  } from 'react';

import { RetrieveManyRequest } from '../../core/CoreRequests';

import { FundsContext } from './FundsContext';
import assets from './assets/assets';
import { fundsSchema } from './assets/schemas';

function FundsInit( { diary_id } ) {

    const { state, actions } = useContext( FundsContext );
    const { schema } = assets;
    assets.schema = () => ( { ...schema(), diary_id } );

    if ( diary_id !== state.diary_id ) {

        actions.updateState( { data: {
            ...fundsSchema(),
            diary_id,
            funds: [ assets.schema() ],
        } } );

        actions.retrieveManyRequestBefore( { assets, index: 0 } );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'payment/FundsInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <RetrieveManyRequest 
                Context={ FundsContext }
                assets={ assets }
                url={ `/.netlify/functions/payment-fund?diary_id=${ diary_id }` }
            />
        );
    }
}

export default FundsInit;
export { FundsInit };