import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { diariesSchema, diarySchema } from '../../storage/schemas';
import { parseDiaryToDB, parseDiaryFromDB } from '../../storage/diary/parsers';

import comboReducer from '../../helpers/comboReducer';
import { stateReducer } from '../../storage/core/reducers/state';
import { formOneOfManyReducer } from '../../storage/core/reducers/form';
import { validationOneOfManyReducer } from '../../storage/core/reducers/validation';
import { createOneOfManyReducer } from '../../storage/core/reducers/create';
import { updateOneOfManyReducer } from '../../storage/core/reducers/update';
import { deleteOneOfManyReducer } from '../../storage/core/reducers/delete';
import { retrieveManyReducer } from '../../storage/core/reducers/retrieve';

import stateActionTypes from '../../storage/core/actions/state';
import formActionTypes from '../../storage/core/actions/form';
import validationActionTypes from '../../storage/core/actions/validation';
import createActionTypes from '../../storage/core/actions/create';
import updateActionTypes from '../../storage/core/actions/update';
import deleteActionTypes from '../../storage/core/actions/delete';
import retrieveManyActionTypes from '../../storage/core/actions/retrieveMany';

import createActions from '../../helpers/createActions';
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

const assets = {
    namespace: 'diaries',
    schema: diarySchema,
    parseToDB: parseDiaryToDB,
    parseFromDB: parseDiaryFromDB,
    sort: null,
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

const DiariesContext = createContext();

const DiariesContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), diariesSchema() );

    const { user_id } = useContext( AppContext ).state.signin;

    assets.schema = () => ( { ...diarySchema(), user_id } );

    const actions = createActions( { dispatch, actionTypes, assets } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    useEffect( () => console.log( 'Has rendered. ', 'DiariesContextProvider' ) );

    return (
        <DiariesContext.Provider value={ { state, dispatch, actions, assets } }>
            { props.children }
        </DiariesContext.Provider>
    )
}

export { DiariesContext, DiariesContextProvider };