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
import menuActions from '../core/assets/actions/menu';
import modeActions from '../core/assets/actions/mode';
import pasteActions from '../core/assets/actions/paste';
import formActions from '../core/assets/actions/form';
import validationActions from '../core/assets/actions/validation';
import createActions from '../core/assets/actions/create';
import updateActions from '../core/assets/actions/update';
import deleteActions from '../core/assets/actions/delete';
import retrieveManyActions from '../core/assets/actions/retrieveMany';

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

const unpluggedActions = {
    ...menuActions,
    ...modeActions,
    ...pasteActions,
    ...formActions,
    ...validationActions,
    ...createActions,
    ...updateActions,
    ...deleteActions,
    ...retrieveManyActions,
};

const EntriesContext = createContext();

const EntriesContextProvider = props => {

    //const schema = { ...entriesSchema(), ...props.state };
    const schema = props.state;

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    const actions = pluginActions( dispatch, unpluggedActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'EntriesContextProvider' ) );

    return (
        <EntriesContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </EntriesContext.Provider>
    )
}

export { EntriesContext, EntriesContextProvider };