import React, { useContext, useEffect  } from 'react';
import { CoreContextProvider } from '../../core/CoreContext';
import actions from '../../../storage/core/actions';
import { RetrieveManyRequest } from '../../core/CoreRequests';
import { FundsContext } from './FundsContext';

function FundInit() {

    const { state, dispatch } = useContext( FundsContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'payment/FundInit' ) );

    return (
        <CoreContextProvider
            actions={ [ actions.retrieveMany ] }
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/payment-fund` }
            />
        </CoreContextProvider>
    );
}

export default FundInit;
export { FundInit };