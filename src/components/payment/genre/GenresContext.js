import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { paymentGenresSchema, paymentGenreSchema } from '../../../storage/schemas';
import { parseGenreToDB, parseGenreFromDB } from '../../../storage/payment/genre/parsers';

import comboReducer from '../../../helpers/comboReducer';
import { stateReducer } from '../../../storage/core/reducers/state';
import { formOneOfManyReducer } from '../../../storage/core/reducers/form';
import { validationOneOfManyReducer } from '../../../storage/core/reducers/validation';
import { createOneOfManyReducer } from '../../../storage/core/reducers/create';
import { updateOneOfManyReducer } from '../../../storage/core/reducers/update';
import { deleteOneOfManyReducer } from '../../../storage/core/reducers/delete';
import { retrieveManyReducer } from '../../../storage/core/reducers/retrieve';

import stateActionTypes from '../../../storage/core/actions/state';
import formActionTypes from '../../../storage/core/actions/form';
import validationActionTypes from '../../../storage/core/actions/validation';
import createActionTypes from '../../../storage/core/actions/create';
import updateActionTypes from '../../../storage/core/actions/update';
import deleteActionTypes from '../../../storage/core/actions/delete';
import retrieveManyActionTypes from '../../../storage/core/actions/retrieveMany';

import createActions from '../../../helpers/createActions';
import { AppContext } from '../../app/AppContext';
import { BenchContext } from '../../bench/BenchContext';

const reducers = [ 
    stateReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
    retrieveManyReducer,
];

const assets = {
    namespace: 'genres',
    schema: paymentGenreSchema,
    parseToDB: parseGenreToDB,
    parseFromDB: parseGenreFromDB,
    sort: ( x, y ) => x.code > y.code ? 1 : -1,
};

const actionTypes = {
    ...stateActionTypes,
    ...formActionTypes,
    ...validationActionTypes,
    ...createActionTypes,
    ...updateActionTypes,
    ...deleteActionTypes,
    ...retrieveManyActionTypes
};

const GenresContext = createContext();

const GenresContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), paymentGenresSchema() );

    const { diary_id } = useContext( BenchContext ).state;

    assets.schema = () => ( { ...paymentGenreSchema(), diary_id } );

    const actions = createActions( { dispatch, actionTypes, assets } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    //useEffect( () => console.log( 'Has rendered. ', 'GenresContextProvider' ) );

    return (
        <GenresContext.Provider value={ { state, dispatch, actions, assets } }>
            { props.children }
        </GenresContext.Provider>
    )
}

export { GenresContext, GenresContextProvider };