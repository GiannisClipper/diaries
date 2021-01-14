import React, { createContext, useReducer, useEffect } from 'react';

import { benchSchema } from '../../storage/schemas';

import comboReducer from '../../helpers/comboReducer';
import { stateReducer } from '../../storage/core/reducers/state';
import { benchReducer } from '../../storage/bench/reducers';

import stateActionTypes from '../../storage/core/actions/state';

import createActions from '../../helpers/createActions';

const reducers = [ 
    benchReducer,
    stateReducer,
];

const assets = {};

const actionTypes = {
    ...stateActionTypes
};

const BenchContext = createContext();

const BenchContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), benchSchema() );

    const actions = createActions( { dispatch, actionTypes, assets } );

    useEffect( () => console.log( 'Has rendered. ', 'BenchContextProvider' ) );

    return (
        <BenchContext.Provider value={ { state, dispatch, actions, assets } }>
            { props.children }
        </BenchContext.Provider>
    )
}

export { BenchContext, BenchContextProvider };