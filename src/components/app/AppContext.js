import React, { createContext, useReducer, useEffect } from 'react';

import { appSchema } from './assets/schemas';
import { signinSchema } from '../signin/assets/schemas';
import { settingsSchema } from '../settings/assets/schemas';
import { backupSchema } from '../backup/assets/schemas';

import comboReducer from '../core/helpers/comboReducer';
import { appReducer } from './reducers/app';

import pluginActions from '../core/helpers/pluginActions';
import modeActions from '../core/assets/actions/mode';
import formActions from '../core/assets/actions/form';
import validationActions from '../core/assets/actions/validation';
import signinActions from '../core/assets/actions/signin';
import retrieveActions from '../core/assets/actions/retrieve';
import updateActions from '../core/assets/actions/update';
import lexiconActions from '../core/assets/actions/lexicon';
import errorActions from '../core/assets/actions/error';

import lexicons from './assets/lexicons';

const reducers = [
    appReducer
];

const unpluggedActions = { 
    ...modeActions,
    ...formActions,
    ...validationActions,
    ...signinActions, 
    ...retrieveActions,
    ...updateActions,
    ...lexiconActions,
    ...errorActions
};

const AppContext = createContext();

const AppContextProvider = props => {

    const schema = appSchema();

    const localStorageSignin = localStorage.getItem( 'signin' );
    const localStorageSettings = localStorage.getItem( 'settings' );

    schema.signin = localStorageSignin
        ? { ...signinSchema(), ...JSON.parse( localStorageSignin ) }
        : { ...signinSchema() };

    schema.settings = localStorageSettings
        ? { ...settingsSchema(), ...JSON.parse( localStorageSettings ) }
        : { ...settingsSchema() };

    schema.backup = backupSchema();

    schema._uiux.lexicon = lexicons[ schema.settings.language ] || lexicons.DEFAULT;

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    //window.state = state;  // for debugging purposes

    const actions = pluginActions( dispatch, unpluggedActions );

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };