import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { reportsSchema } from './assets/schemas';

import comboReducer from '../core/helpers/comboReducer';
import { stateReducer } from '../core/assets/reducers/state';
import { formOneOfManyReducer } from '../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../core/assets/reducers/validation';
import { retrieveManyReducer } from '../core/assets/reducers/retrieve';
import { reportsReducer } from './assets/reducers';

import chargeActions from '../core/helpers/chargeActions';
import stateActionTypes from '../core/assets/actions/state';
import formActionTypes from '../core/assets/actions/form';
import validationActionTypes from '../core/assets/actions/validation';
import retrieveManyActionTypes from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

const reducers = [ 
    reportsReducer,
    stateReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    retrieveManyReducer,
];

const rawActions = {
    ...stateActionTypes,
    ...formActionTypes,
    ...validationActionTypes,
    ...retrieveManyActionTypes
};

const ReportsContext = createContext();

const ReportsContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), reportsSchema() );

    const actions = chargeActions( { dispatch, rawActions } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    useEffect( () => console.log( 'Has rendered. ', 'ReportsContextProvider' ) );

    return (
        <ReportsContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </ReportsContext.Provider>
    )
}

export { ReportsContext, ReportsContextProvider };