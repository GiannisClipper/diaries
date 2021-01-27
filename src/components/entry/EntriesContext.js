import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { entriesReducer } from './assets/reducers';
import { menuOneOfManyReducer } from '../core/assets/reducers/menu';
import { pasteReducer } from '../core/assets/reducers/paste';
import { modeOneOfManyReducer } from '../core/assets/reducers/mode';
import { formOneOfManyReducer } from '../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../core/assets/reducers/validation';
import { createOneOfManyReducer } from '../core/assets/reducers/create';
import { updateOneOfManyReducer } from '../core/assets/reducers/update';
import { deleteOneOfManyReducer } from '../core/assets/reducers/delete';

import pluginActions from '../core/helpers/pluginActions';
import menuTypes from '../core/assets/actions/menu';
import modeTypes from '../core/assets/actions/mode';
import pasteTypes from '../core/assets/actions/paste';
import formTypes from '../core/assets/actions/form';
import validationTypes from '../core/assets/actions/validation';
import createTypes from '../core/assets/actions/create';
import updateTypes from '../core/assets/actions/update';
import deleteTypes from '../core/assets/actions/delete';
import retrieveManyTypes from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

const reducers = [ 
    entriesReducer,
    menuOneOfManyReducer,
    pasteReducer,
    modeOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
];

const rawActions = {
    ...menuTypes,
    ...modeTypes,
    ...pasteTypes,
    ...formTypes,
    ...validationTypes,
    ...createTypes,
    ...updateTypes,
    ...deleteTypes,
    ...retrieveManyTypes,
};

const EntriesContext = createContext();

const EntriesContextProvider = props => {

    //const schema = { ...entriesSchema(), ...props.state };
    const schema = props.state;

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    const actions = pluginActions( dispatch, rawActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'EntriesContextProvider' ) );

    return (
        <EntriesContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </EntriesContext.Provider>
    )
}

export { EntriesContext, EntriesContextProvider };