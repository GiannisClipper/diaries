import React, { createContext, useReducer, useEffect } from 'react';

import { appSchema, signinSchema, settingsSchema, backupSchema } from '../../storage/schemas';
import { parseSigninToDB, parseSigninFromDB } from '../../storage/sign/parsers';
import { parseSettingsToDB, parseSettingsFromDB } from '../../storage/settings/parsers';

import { appReducer } from '../../storage/app/reducers';

import validationActionTypes from '../../storage/core/actions/validation';
import signActionTypes from '../../storage/core/actions/sign';
import updateActionTypes from '../../storage/core/actions/create';
import errorActionTypes from '../../storage/core/actions/error';

import createActions from '../../helpers/createActions';
const AppContext = createContext();

const customization = {
    signin: {
        namespace: 'signin',
        schema: signinSchema,
        parseToDB: parseSigninToDB,
        parseFromDB: parseSigninFromDB,
    },

    signout: {
        namespace: 'signout',
    },

    settings: {
        namespace: 'settings',
        schema: settingsSchema,
        parseToDB: parseSettingsToDB,
        parseFromDB: parseSettingsFromDB,
    }
}

const actionTypes = { 
    ...validationActionTypes,
    ...signActionTypes, 
    ...updateActionTypes,
    ...errorActionTypes
};

const AppContextProvider = props => {

    const schema = appSchema();
    schema.signin = { ...signinSchema(), ...JSON.parse( localStorage.getItem( 'signin' ) || '{}' ) };
    schema.settings = { ...settingsSchema(), ...JSON.parse( localStorage.getItem( 'settings' ) || '{}' ) };
    schema.backup = backupSchema();

    const [ state, dispatch ] = useReducer( appReducer, schema );

    window.state = state;

    const actions = createActions( { dispatch, actionTypes, customization } );

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { state, dispatch, actions, customization } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };