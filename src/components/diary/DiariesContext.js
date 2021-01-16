import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { diariesSchema } from './assets/schemas';

import comboReducer from '../core/helpers/comboReducer';
import { stateReducer } from '../core/assets/reducers/state';
import { formOneOfManyReducer } from '../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../core/assets/reducers/validation';
import { createOneOfManyReducer } from '../core/assets/reducers/create';
import { updateOneOfManyReducer } from '../core/assets/reducers/update';
import { deleteOneOfManyReducer } from '../core/assets/reducers/delete';
import { retrieveManyReducer } from '../core/assets/reducers/retrieve';

import chargeActions from '../core/helpers/chargeActions';
import stateActionTypes from '../core/assets/actions/state';
import formActionTypes from '../core/assets/actions/form';
import validationActionTypes from '../core/assets/actions/validation';
import createActionTypes from '../core/assets/actions/create';
import updateActionTypes from '../core/assets/actions/update';
import deleteActionTypes from '../core/assets/actions/delete';
import retrieveManyActionTypes from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

const reducers = [ 
    stateReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
    retrieveManyReducer,
];

const rawActions = {
    ...stateActionTypes,
    ...formActionTypes,
    ...validationActionTypes,
    ...createActionTypes,
    ...updateActionTypes,
    ...deleteActionTypes,
    ...retrieveManyActionTypes
};

const DiariesContext = createContext();

const DiariesContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), diariesSchema() );

    const actions = chargeActions( { dispatch, rawActions } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    useEffect( () => console.log( 'Has rendered. ', 'DiariesContextProvider' ) );

    return (
        <DiariesContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </DiariesContext.Provider>
    )
}

export { DiariesContext, DiariesContextProvider };