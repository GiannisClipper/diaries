import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { entriesSchema, entrySchema } from '../../storage/schemas';
import { dateToYYYYMMDD } from '../../helpers/dates';
import { parsePaymentToDB, parsePaymentFromDB } from '../../storage/payment/parsers';
import { parseNoteToDB, parseNoteFromDB } from '../../storage/note/parsers';

import comboReducer from '../../helpers/comboReducer';
import { entriesReducer } from '../../storage/entry/reducers';
import { menuOneOfManyReducer } from '../../storage/core/reducers/menu';
import { formOneOfManyReducer } from '../../storage/core/reducers/form';
import { validationOneOfManyReducer } from '../../storage/core/reducers/validation';
import { createOneOfManyReducer } from '../../storage/core/reducers/create';
import { updateOneOfManyReducer } from '../../storage/core/reducers/update';
import { deleteOneOfManyReducer } from '../../storage/core/reducers/delete';

import menuActionTypes from '../../storage/core/actions/menu';
import formActionTypes from '../../storage/core/actions/form';
import validationActionTypes from '../../storage/core/actions/validation';
import createActionTypes from '../../storage/core/actions/create';
import updateActionTypes from '../../storage/core/actions/update';
import deleteActionTypes from '../../storage/core/actions/delete';
import retrieveManyActionTypes from '../../storage/core/actions/retrieveMany';

import createActions from '../../helpers/createActions';
import { AppContext } from '../app/AppContext';
import { BenchContext } from '../bench/BenchContext';

const reducers = [ 
    entriesReducer,
    menuOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
];

const assets = {
    namespace: 'entries',
    schema: entrySchema(),

    parseToDB: data => data.type === 'payment'
        ? parsePaymentToDB( data )
        : parseNoteToDB( data ),

    parseFromDB: data => data.type === 'payment'
        ? parsePaymentFromDB( data )
        : parseNoteFromDB( data ),

    sort: ( a, b ) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0,
};

const actionTypes = {
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

    const { diary_id } = useContext( BenchContext ).state;

    assets.schema = () => ( { ...entrySchema(), diary_id, date: dateToYYYYMMDD( props.state.date ) } );

    const actions = createActions( { dispatch, actionTypes, assets } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    //useEffect( () => console.log( 'Has rendered. ', 'EntriesContextProvider' ) );

    return (
        <EntriesContext.Provider value={{ state, dispatch, actions, assets }}>
            { props.children }
        </EntriesContext.Provider>
    )
}

export { EntriesContext, EntriesContextProvider };