import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { menuOneOfManyEntryReducer } from './reducers/menu';
import { retrieveManyEntryReducer } from './reducers/retrieveMany';
import { createOneOfManyEntryReducer } from './reducers/create';
import { updateOneOfManyEntryReducer } from './reducers/update';
import { deleteOneOfManyEntryReducer } from './reducers/delete';

import { menuOneOfManyReducer } from '../core/reducers/menu';
import { copyPasteReducer } from '../core/reducers/copyPaste';
import { modeOneOfManyReducer } from '../core/reducers/mode';
import { formOneOfManyReducer } from '../core/reducers/form';
import { validationOneOfManyReducer } from '../core/reducers/validation';
import { createOneOfManyReducer } from '../core/reducers/create';
import { updateOneOfManyReducer } from '../core/reducers/update';
import { deleteOneOfManyReducer } from '../core/reducers/delete';

import pluginActions from '../core/helpers/pluginActions';
import menuActions from '../core/assets/actions/menu';
import modeActions from '../core/assets/actions/mode';
import copyPasteActions from '../core/assets/actions/copyPaste';
import formActions from '../core/assets/actions/form';
import validationActions from '../core/assets/actions/validation';
import createActions from '../core/assets/actions/create';
import updateActions from '../core/assets/actions/update';
import deleteActions from '../core/assets/actions/delete';
import retrieveManyActions from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

const reducers = [ 
    menuOneOfManyEntryReducer,
    menuOneOfManyReducer,
    copyPasteReducer,
    modeOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyEntryReducer,
    createOneOfManyReducer,
    retrieveManyEntryReducer,
    updateOneOfManyEntryReducer,
    updateOneOfManyReducer,
    deleteOneOfManyEntryReducer,
    deleteOneOfManyReducer,
];

const unpluggedActions = {
    ...menuActions,
    ...modeActions,
    ...copyPasteActions,
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