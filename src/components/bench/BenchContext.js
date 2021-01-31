import React, { createContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { pageReducer } from '../core/assets/reducers/page';
import { benchReducer } from './assets/reducers';

import pluginActions from '../core/helpers/pluginActions';
import pageActions from '../core/assets/actions/page';

import { benchSchema } from './assets/schemas';

const reducers = [ 
    benchReducer,
    pageReducer,
];

const unpluggedActions = {
    ...pageActions
};

const BenchContext = createContext();

const BenchContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), benchSchema() );

    window.bench_state = state;  // for debugging purposes

    const actions = pluginActions( dispatch, unpluggedActions );

    useEffect( () => console.log( 'Has rendered. ', 'BenchContextProvider' ) );

    return (
        <BenchContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </BenchContext.Provider>
    )
}

export { BenchContext, BenchContextProvider };