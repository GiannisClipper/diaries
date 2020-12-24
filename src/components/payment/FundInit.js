import React, { useContext, useEffect  } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../libs/CRUD';
import { AppContext } from '../app/AppContext';

function FundInit() {

    const { state, dispatch } = useContext( AppContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'payment/FundInit' ) );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
            namespace={ 'paymentFunds' }
        >
            <RetrieveManyRequest 
                process={ _uiux.payments.funds.process }
                url={ `/.netlify/functions/payment-fund` }
            />
        </CRUDContextProvider>
    );
}

export default FundInit;
export { FundInit };