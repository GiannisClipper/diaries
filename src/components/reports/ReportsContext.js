import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { pageReportReducer } from './reducers/page';
import { modeOneOfManyReducer } from '../core/reducers/mode';
import { formOneOfManyReducer } from '../core/reducers/form';
import { validationOneOfManyReducer } from '../core/reducers/validation';
import { retrieveManyReducer } from '../core/reducers/retrieveMany';
import { retrieveOneOfManyReportReducer } from './reducers/retrieve';
import { retrieveOneOfManyReducer } from '../core/reducers/retrieve';

import pluginActions from '../core/helpers/pluginActions';
import pageActions from '../core/assets/actions/page';
import modeActions from '../core/assets/actions/mode';
import formActions from '../core/assets/actions/form';
import validationActions from '../core/assets/actions/validation';
import retrieveManyActions from '../core/assets/actions/retrieveMany';
import retrieveActions from '../core/assets/actions/retrieve';

import { AppContext } from '../app/AppContext';

import { reportsSchema } from './assets/schemas';

const reducers = [ 
    pageReportReducer,
    modeOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    retrieveManyReducer,
    retrieveOneOfManyReportReducer,
    retrieveOneOfManyReducer,
];

const unpluggedActions = {
    ...pageActions,
    ...modeActions,
    ...formActions,
    ...validationActions,
    ...retrieveManyActions,
    ...retrieveActions
};

const ReportsContext = createContext();

const ReportsContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), reportsSchema() );

    const actions = pluginActions( dispatch, unpluggedActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'ReportsContextProvider' ) );

    return (
        <ReportsContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </ReportsContext.Provider>
    )
}

export { ReportsContext, ReportsContextProvider };