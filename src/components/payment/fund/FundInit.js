import React, { useContext, useEffect  } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../../libs/CRUD';
import { FundsContext } from './FundsContext';

function FundInit() {

    const { state, dispatch } = useContext( FundsContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'payment/FundInit' ) );

    return (
        <CRUDContextProvider
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/payment-fund` }
            />
        </CRUDContextProvider>
    );
}

export default FundInit;
export { FundInit };