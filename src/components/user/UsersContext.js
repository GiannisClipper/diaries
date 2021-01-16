import React, { createContext, useContext, useReducer, useEffect } from 'react';

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

import { usersSchema } from './assets/schemas';

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

const UsersContext = createContext();

const UsersContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), usersSchema() );

    const actions = chargeActions( { dispatch, rawActions } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;
    
    useEffect( () => console.log( 'Has rendered. ', 'UsersContextProvider' ) );

    return (
        <UsersContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersContextProvider };