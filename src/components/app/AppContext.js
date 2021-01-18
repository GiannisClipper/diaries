import React, { createContext, useReducer, useEffect } from 'react';

import { appSchema } from './assets/schemas';
import { signinSchema } from '../signin/assets/schemas';
import { settingsSchema } from '../settings/assets/schemas';
import { backupSchema } from '../backup/assets/schemas';

import comboReducer from '../core/helpers/comboReducer';
import { appReducer } from './assets/reducers';

import chargeActions from '../core/helpers/chargeActions';
import formTypes from '../core/assets/actions/form';
import validationTypes from '../core/assets/actions/validation';
import signinTypes from '../core/assets/actions/signin';
import retrieveTypes from '../core/assets/actions/retrieve';
import updateTypes from '../core/assets/actions/update';
import errorTypes from '../core/assets/actions/error';

const reducers = [
    appReducer
];

const rawActions = { 
    ...formTypes,
    ...validationTypes,
    ...signinTypes, 
    ...retrieveTypes,
    ...updateTypes,
    ...errorTypes
};

const AppContext = createContext();

const AppContextProvider = props => {

    const schema = appSchema();
    schema.signin = { ...signinSchema(), ...JSON.parse( localStorage.getItem( 'signin' ) || '{}' ) };
    schema.settings = { ...settingsSchema(), ...JSON.parse( localStorage.getItem( 'settings' ) || '{}' ) };
    schema.backup = backupSchema();

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    window.state = state;  // for debugging purposes

    const actions = chargeActions( dispatch, rawActions );

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };