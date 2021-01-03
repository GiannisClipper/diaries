import React, { createContext, useReducer, useEffect } from 'react';
import { paymentFundsSchema } from '../../../storage/schemas';
import comboReducer from '../../../helpers/comboReducer';
import { oneOfManyFormReducer, oneOfManyValidationReducer, oneOfManyRequestReducer } from '../../../storage/core/oneOfManyReducers';
import { manyRequestReducer } from '../../../storage/core/manyReducers';

const FundsContext = createContext();

const FundsContextProvider = props => {

    const reducers = [ 
        oneOfManyFormReducer,
        oneOfManyValidationReducer,
        oneOfManyRequestReducer,
        manyRequestReducer,
    ];

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), paymentFundsSchema() );

    //useEffect( () => console.log( 'Has rendered. ', 'FundsContextProvider' ) );

    return (
        <FundsContext.Provider value={ { state, dispatch } }>
            { props.children }
        </FundsContext.Provider>
    )
}

export { FundsContext, FundsContextProvider };