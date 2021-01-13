import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { entrySchema } from '../../storage/schemas';
import { dateToYYYYMMDD } from '../../helpers/dates';
import { parsePaymentToDB, parsePaymentFromDB } from '../../storage/payment/parsers';
import { parseNoteToDB, parseNoteFromDB } from '../../storage/note/parsers';

import comboReducer from '../../helpers/comboReducer';
import { dateReducer } from '../../storage/date/reducers';
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

import createActions from '../../helpers/createActions';
import { AppContext } from '../app/AppContext';
import { BenchContext } from '../bench/BenchContext';

const reducers = [ 
    dateReducer,
    menuOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
];

const customization = {
    namespace: 'entries',
    schema: entrySchema(),

    parseToDB: data => data.type === 'payment'
        ? parsePaymentToDB( data )
        : parseNoteToDB( data ),

    parseFromDB: data => data.type === 'payment'
        ? parsePaymentFromDB( data )
        : parseNoteFromDB( data ),

    sort: null,
};

const actionTypes = {
    ...menuActionTypes,
    ...formActionTypes,
    ...validationActionTypes,
    ...createActionTypes,
    ...updateActionTypes,
    ...deleteActionTypes,
};

const DateContext = createContext();

const DateContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), props.state );

    const { diary_id } = useContext( BenchContext ).state;

    customization.schema = () => ( { ...entrySchema(), diary_id, date: dateToYYYYMMDD( props.state.date ) } );

    const actions = createActions( { dispatch, actionTypes, customization } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    //useEffect( () => console.log( 'Has rendered. ', 'DateContextProvider' ) );

    return (
        <DateContext.Provider value={{ state, dispatch, actions, customization }}>
            { props.children }
        </DateContext.Provider>
    )
}

export { DateContext, DateContextProvider };