import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { usersSchema, userSchema } from '../../storage/schemas';
import { parseUserToDB, parseUserFromDB } from '../../storage/user/parsers';

import comboReducer from '../../helpers/comboReducer';
import { formOneOfManyReducer } from '../../storage/core/reducers/form';
import { validationOneOfManyReducer } from '../../storage/core/reducers/validation';
import { createOneOfManyReducer } from '../../storage/core/reducers/create';
import { updateOneOfManyReducer } from '../../storage/core/reducers/update';
import { deleteOneOfManyReducer } from '../../storage/core/reducers/delete';
import { retrieveManyReducer } from '../../storage/core/reducers/retrieve';

import formActionTypes from '../../storage/core/actions/form';
import validationActionTypes from '../../storage/core/actions/validation';
import createActionTypes from '../../storage/core/actions/create';
import updateActionTypes from '../../storage/core/actions/update';
import deleteActionTypes from '../../storage/core/actions/delete';
import retrieveManyActionTypes from '../../storage/core/actions/retrieveMany';

import createActions from '../../helpers/createActions';
import { AppContext } from '../app/AppContext';

const reducers = [ 
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
    retrieveManyReducer,
];

const customization = {
    namespace: 'users',
    schema: userSchema,
    parseToDB: parseUserToDB,
    parseFromDB: parseUserFromDB,
    sort: ( x, y ) => x.username > y.username ? 1 : -1,
}

const actionTypes = {
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

    const actions = createActions( { dispatch, actionTypes, customization } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;
    
    useEffect( () => console.log( 'Has rendered. ', 'UsersContextProvider' ) );

    return (
        <UsersContext.Provider value={ { state, dispatch, actions, customization } }>
            { props.children }
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersContextProvider };