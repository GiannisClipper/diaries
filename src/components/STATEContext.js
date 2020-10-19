import React, { createContext, useReducer, useEffect } from 'react';
import { initState } from '../storage/schemas';
import authReducer from '../storage/authReducer';
import usersReducer from '../storage/usersReducer';
import { datesReducer, entriesReducer } from '../storage/datesReducer';
import genresReducer from '../storage/payments/genresReducer';
import fundsReducer from '../storage/payments/fundsReducer';

const STATEReducer = ( state, action ) => {

    switch ( action.namespace ) {
    
        case 'auth': {
            return authReducer( state, action );

        } case 'users': {
            return usersReducer( state, action );

        } case 'dates': {
            return datesReducer( state, action );

        } case 'entries': {
            return entriesReducer( state, action );
    
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