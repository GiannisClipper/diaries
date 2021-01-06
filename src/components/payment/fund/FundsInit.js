import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider } from '../../core/CoreContext';
import actions from '../../../storage/core/actions';
import { paymentFundSchema } from '../../../storage/schemas';
import { parseFundFromDB } from '../../../storage/payment/fund/parsers';
import { RetrieveManyRequest } from '../../core/CoreRequests';

import { BenchContext } from '../../bench/BenchContext';
import { FundsContext } from './FundsContext';

function FundsInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, dispatch } = useContext( FundsContext );
    const { _uiux } = state;

    const payload = {
        _namespace: 'funds',
        _schema: paymentFundSchema,
        _parseFromDB: parseFundFromDB,
        _sort: ( x, y ) => x.code > y.code ? 1 : -1,
    };

    //useEffect( () => console.log( 'Has rendered. ', 'payment/FundsInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <CoreContextProvider
                actions={ [ actions.retrieveMany ] }
                dispatch={ dispatch }
                payload={ payload }
            >
                <RetrieveManyRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/payment-fund?diary_id=${diary_id}` }
                />
            </CoreContextProvider>
        );
    }
}

export default FundsInit;
export { FundsInit };