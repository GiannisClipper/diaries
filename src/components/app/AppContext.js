import React, { createContext, useReducer, useEffect } from 'react';

import { appSchema } from './assets/schemas';
import { signinSchema } from '../signin/assets/schemas';
import { settingsSchema } from '../settings/assets/schemas';
import { backupSchema } from '../backup/assets/schemas';

import comboReducer from '../core/helpers/comboReducer';
import { appReducer } from './assets/reducers';

import chargeActions from '../core/helpers/chargeActions';
import formActionTypes from '../core/assets/actions/form';
import validationActionTypes from '../core/assets/actions/validation';
import signActionTypes from '../core/assets/actions/signin';
import updateActionTypes from '../core/assets/actions/update';
import errorActionTypes from '../core/assets/actions/error';

const reducers = [
    appReducer
];

const rawActions = { 
    ...formActionTypes,
    ...validationActionTypes,
    ...signActionTypes, 
    ...updateActionTypes,
    ...errorActionTypes
};

const AppContext = createContext();

const AppContextProvider = props => {

    const schema = appSchema();
    schema.signin = { ...signinSchema(), ...JSON.parse( localStorage.getItem( 'signin' ) || '{}' ) };
    schema.settings = { ...settingsSchema(), ...JSON.parse( localStorage.getItem( 'settings' ) || '{}' ) };
    schema.backup = backupSchema();

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    window.state = state;  // for debugging purposes

    const actions = chargeActions( { dispatch, rawActions } );

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };