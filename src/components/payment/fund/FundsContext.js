import React, { createContext, useReducer, useEffect } from 'react';
import { paymentFundsSchema } from '../../../storage/schemas';
import { fundsReducer } from '../../../storage/payment/fund/reducers';

const FundsContext = createContext();

const FundsContextProvider = props => {

    const [ state, dispatch ] = useReducer( fundsReducer, paymentFundsSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'FundsContextProvider' ) );

    return (
        <FundsContext.Provider value={ { state, dispatch } }>
            { props.children }
        </FundsContext.Provider>
    )
}

export { FundsContext, FundsContextProvider };