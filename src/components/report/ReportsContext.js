import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { reportsSchema, reportSchema } from '../../storage/schemas';
import { parseReportToDB } from '../../storage/report/parsers';

import comboReducer from '../../helpers/comboReducer';
import { stateReducer } from '../../storage/core/reducers/state';
import { formOneOfManyReducer } from '../../storage/core/reducers/form';
import { validationOneOfManyReducer } from '../../storage/core/reducers/validation';
import { retrieveManyReducer } from '../../storage/core/reducers/retrieve';
import { reportsReducer } from '../../storage/report/reducers';

import stateActionTypes from '../../storage/core/actions/state';
import formActionTypes from '../../storage/core/actions/form';
import validationActionTypes from '../../storage/core/actions/validation';
import retrieveManyActionTypes from '../../storage/core/actions/retrieveMany';

import createActions from '../../helpers/createActions';
import { AppContext } from '../app/AppContext';

const reducers = [ 
    reportsReducer,
    stateReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    retrieveManyReducer,
];

const assets = {
    namespace: 'reports',
    schema: reportSchema,
    parseToDB: parseReportToDB,
};

const actionTypes = {
    ...stateActionTypes,
    ...formActionTypes,
    ...validationActionTypes,
    ...retrieveManyActionTypes
};

const ReportsContext = createContext();

const ReportsContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), reportsSchema() );

    const actions = createActions( { dispatch, actionTypes, assets } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    useEffect( () => console.log( 'Has rendered. ', 'ReportsContextProvider' ) );

    return (
        <ReportsContext.Provider value={ { state, dispatch, actions, assets } }>
            { props.children }
        </ReportsContext.Provider>
    )
}

export { ReportsContext, ReportsContextProvider };