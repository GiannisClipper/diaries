import React, { createContext, useReducer, useEffect } from 'react';
import { initState } from '../storage/schemas';
import { datesReducer, entriesReducer } from '../storage/datesReducer';
import genresReducer from '../storage/payments/genresReducer';
import fundsReducer from '../storage/payments/fundsReducer';

const STATEReducer = ( state, action ) => {

    let { data, uiux } = state;

    switch ( action.namespace ) {
    
        case 'dates': {
            return datesReducer( state, action );

        } case 'entries': {
            data = entriesReducer( data, action );
            return { data, uiux };
    
        } case 'payments.genres': {
            return genresReducer( state, action );

        } case 'payments.funds': {
            return fundsReducer( state, action );

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