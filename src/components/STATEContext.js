import React, { createContext, useReducer, useEffect } from 'react';
import { initState } from '../storage/schemas';
import authReducer from '../storage/authReducer';
import settingsReducer from '../storage/settingsReducer';
import usersReducer from '../storage/usersReducer';
import datesReducer from '../storage/datesReducer';
import entriesReducer from '../storage/entriesReducer';
import genresReducer from '../storage/payments/genresReducer';
import fundsReducer from '../storage/payments/fundsReducer';

const STATEReducer = ( state, action ) => {

    switch ( action.namespace ) {
    
        case 'auth': {
            return authReducer( state, action );

        } case 'settings': {
            return settingsReducer( state, action );

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

    const [ state, dispatch ] = useReducer( STATEReducer, initState() );

    window.state = state;

    useEffect( () => {
        console.log( 'Has rendered. ', 'STATEContextProvider' );
    } );

    return (
        <STATEContext.Provider value={{ state, dispatch }}>
            {props.children}
        </STATEContext.Provider>
    )
}

export { STATEContext, STATEContextProvider };