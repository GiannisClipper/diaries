import React, { createContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { stateReducer } from '../core/assets/reducers/state';
import { benchReducer } from './assets/reducers';

import chargeActions from '../core/helpers/chargeActions';
import stateActionTypes from '../core/assets/actions/state';
import pageActionTypes from '../core/assets/actions/page';

import { benchSchema } from './assets/schemas';

const reducers = [ 
    benchReducer,
    stateReducer,
];

const rawActions = {
    ...stateActionTypes,
    ...pageActionTypes
};

const BenchContext = createContext();

const BenchContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), benchSchema() );

    const actions = chargeActions( { dispatch, rawActions } );

    useEffect( () => console.log( 'Has rendered. ', 'BenchContextProvider' ) );

    return (
        <BenchContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </BenchContext.Provider>
    )
}

export { BenchContext, BenchContextProvider };