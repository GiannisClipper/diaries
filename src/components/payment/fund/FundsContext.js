import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../../core/helpers/comboReducer';
import { pageReducer } from '../../core/assets/reducers/page';
import { modeOneOfManyReducer } from '../../core/assets/reducers/mode';
import { formOneOfManyReducer } from '../../core/assets/reducers/form';
import { validationOneOfManyReducer } from '../../core/assets/reducers/validation';
import { createOneOfManyReducer } from '../../core/assets/reducers/create';
import { updateOneOfManyReducer } from '../../core/assets/reducers/update';
import { deleteOneOfManyReducer } from '../../core/assets/reducers/delete';
import { retrieveManyReducer } from '../../core/assets/reducers/retrieveMany';

import pluginActions from '../../core/helpers/pluginActions';
import pageActions from '../../core/assets/actions/page';
import modeActions from '../../core/assets/actions/mode';
import formActions from '../../core/assets/actions/form';
import validationActions from '../../core/assets/actions/validation';
import createActions from '../../core/assets/actions/create';
import updateActions from '../../core/assets/actions/update';
import deleteActions from '../../core/assets/actions/delete';
import retrieveManyActions from '../../core/assets/actions/retrieveMany';

import { AppContext } from '../../app/AppContext';

import { fundsSchema } from './assets/schemas';

const reducers = [ 
    pageReducer,
    modeOneOfManyReducer,
    formOneOfManyReducer,
    validationOneOfManyReducer,
    createOneOfManyReducer,
    updateOneOfManyReducer,
    deleteOneOfManyReducer,
    retrieveManyReducer,
];

const unpluggedActions = {
    ...pageActions,
    ...modeActions,
    ...formActions,
    ...validationActions,
    ...createActions,
    ...updateActions,
    ...deleteActions,
    ...retrieveManyActions
};

const FundsContext = createContext();

const FundsContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), fundsSchema() );

    const actions = pluginActions( dispatch, unpluggedActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'FundsContextProvider' ) );

    return (
        <FundsContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </FundsContext.Provider>
    )
}

export default { FundsContext, FundsContextProvider };
export { FundsContext, FundsContextProvider };