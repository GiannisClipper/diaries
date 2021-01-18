import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../../core/helpers/comboReducer';
import { pageReducer } from '../../core/assets/reducers/page';
import { formOneOfManyReducer } from '../../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../../core/assets/reducers/validation';
import { createOneOfManyReducer } from '../../core/assets/reducers/create';
import { updateOneOfManyReducer } from '../../core/assets/reducers/update';
import { deleteOneOfManyReducer } from '../../core/assets/reducers/delete';
import { retrieveManyReducer } from '../../core/assets/reducers/retrieveMany';

import chargeActions from '../../core/helpers/chargeActions';
import pageTypes from '../../core/assets/actions/page';
import formTypes from '../../core/assets/actions/form';
import validationTypes from '../../core/assets/actions/validation';
import createTypes from '../../core/assets/actions/create';
import updateTypes from '../../core/assets/actions/update';
import deleteTypes from '../../core/assets/actions/delete';
import retrieveManyTypes from '../../core/assets/actions/retrieveMany';

import { AppContext } from '../../app/AppContext';

import { genresSchema } from './assets/schemas';

const reducers = [ 
    pageReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
    retrieveManyReducer,
];

const rawActions = {
    ...pageTypes,
    ...formTypes,
    ...validationTypes,
    ...createTypes,
    ...updateTypes,
    ...deleteTypes,
    ...retrieveManyTypes
};

const GenresContext = createContext();

const GenresContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), genresSchema() );

    const actions = chargeActions( dispatch, rawActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'GenresContextProvider' ) );

    return (
        <GenresContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </GenresContext.Provider>
    )
}

export { GenresContext, GenresContextProvider };