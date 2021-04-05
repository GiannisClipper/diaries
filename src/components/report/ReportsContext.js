import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { retrieveManyReducer } from '../core/assets/reducers/retrieveMany';
import { modeOneOfManyReducer } from '../core/assets/reducers/mode';
import { formOneOfManyReducer } from '../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../core/assets/reducers/validation';
import { retrieveOneOfManyReducer } from '../core/assets/reducers/retrieve';
import { reportsReducer } from './assets/reducers';

import pluginActions from '../core/helpers/pluginActions';
import pageActions from '../core/assets/actions/page';
import modeActions from '../core/assets/actions/mode';
import formActions from '../core/assets/actions/form';
import validationActions from '../core/assets/actions/validation';
import retrieveActions from '../core/assets/actions/retrieve';
import retrieveManyActions from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

import { reportsSchema } from './assets/schemas';

const reducers = [ 
    retrieveManyReducer,
    reportsReducer,
    modeOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    retrieveOneOfManyReducer,
];

const unpluggedActions = {
    ...pageActions,
    ...modeActions,
    ...formActions,
    ...validationActions,
    ...retrieveActions,
    ...retrieveManyActions
};

const ReportsContext = createContext();

const ReportsContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), reportsSchema() );

    const actions = pluginActions( dispatch, unpluggedActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    useEffect( () => console.log( 'Has rendered. ', 'ReportsContextProvider' ) );

    return (
        <ReportsContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </ReportsContext.Provider>
    )
}

export { ReportsContext, ReportsContextProvider };