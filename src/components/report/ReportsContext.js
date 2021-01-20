import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { modeOneOfManyReducer } from '../core/assets/reducers/mode';
import { formOneOfManyReducer } from '../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../core/assets/reducers/validation';
import { retrieveManyReducer } from '../core/assets/reducers/retrieveMany';
import { reportsReducer } from './assets/reducers';

import chargeActions from '../core/helpers/chargeActions';
import pageTypes from '../core/assets/actions/page';
import modeTypes from '../core/assets/actions/mode';
import formTypes from '../core/assets/actions/form';
import validationTypes from '../core/assets/actions/validation';
import retrieveManyTypes from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

import { reportsSchema } from './assets/schemas';

const reducers = [ 
    reportsReducer,
    modeOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    retrieveManyReducer,
];

const rawActions = {
    ...pageTypes,
    ...modeTypes,
    ...formTypes,
    ...validationTypes,
    ...retrieveManyTypes
};

const ReportsContext = createContext();

const ReportsContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), reportsSchema() );

    const actions = chargeActions( dispatch, rawActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    useEffect( () => console.log( 'Has rendered. ', 'ReportsContextProvider' ) );

    return (
        <ReportsContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </ReportsContext.Provider>
    )
}

export { ReportsContext, ReportsContextProvider };