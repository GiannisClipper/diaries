import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { entriesReducer } from './assets/reducers';
import { menuOneOfManyReducer } from '../core/assets/reducers/menu';
import { formOneOfManyReducer } from '../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../core/assets/reducers/validation';
import { createOneOfManyReducer } from '../core/assets/reducers/create';
import { updateOneOfManyReducer } from '../core/assets/reducers/update';
import { deleteOneOfManyReducer } from '../core/assets/reducers/delete';

import chargeActions from '../core/helpers/chargeActions';
import menuActionTypes from '../core/assets/actions/menu';
import formActionTypes from '../core/assets/actions/form';
import validationActionTypes from '../core/assets/actions/validation';
import createActionTypes from '../core/assets/actions/create';
import updateActionTypes from '../core/assets/actions/update';
import deleteActionTypes from '../core/assets/actions/delete';
import retrieveManyActionTypes from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

const reducers = [ 
    entriesReducer,
    menuOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
];

const rawActions = {
    ...menuActionTypes,
    ...formActionTypes,
    ...validationActionTypes,
    ...createActionTypes,
    ...updateActionTypes,
    ...deleteActionTypes,
    ...retrieveManyActionTypes,
};

const EntriesContext = createContext();

const EntriesContextProvider = props => {

    //const schema = { ...entriesSchema(), ...props.state };
    const schema = props.state;

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    const actions = chargeActions( { dispatch, rawActions } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'EntriesContextProvider' ) );

    return (
        <EntriesContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </EntriesContext.Provider>
    )
}

export { EntriesContext, EntriesContextProvider };