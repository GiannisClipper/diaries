import React, { createContext, useReducer, useEffect } from 'react';
import { initState } from '../storage/schemas';
import { datesReducer, entriesReducer } from '../storage/datesReducer';
import paymentsReducer from '../storage/paymentsReducer';

const STATEReducer = ( state, action ) => {

    let { data, uiux } = state;

    switch ( action.namespace ) {
    
        case 'dates': {
            data = datesReducer( data, action );
            return { data, uiux };

        } case 'entries': {
            data = entriesReducer( data, action );
            return { data, uiux };
    
        } case 'payments': {
            data = paymentsReducer( data, action );
            return { data, uiux };

        } default: {
            throw new Error();
        }
    }
}

const STATEContext = createContext();

const STATEContextProvider = props => {

    const [ state, dispatch ] = useReducer( STATEReducer, initState );

    useEffect( () => {
        console.log( 'Has rendered. ', 'STATEContext.Provider' );
    } );

    return (
        <STATEContext.Provider value={{ state, dispatch }}>
            {props.children}
        </STATEContext.Provider>
    )
}

export { STATEContext, STATEContextProvider };