import React, { createContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { pageReducer } from '../core/assets/reducers/page';
import { benchReducer } from './assets/reducers';

import pluginActions from '../core/helpers/pluginActions';
import pageTypes from '../core/assets/actions/page';

import { benchSchema } from './assets/schemas';

const reducers = [ 
    benchReducer,
    pageReducer,
];

const rawActions = {
    ...pageTypes
};

const BenchContext = createContext();

const BenchContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), benchSchema() );

    const actions = pluginActions( dispatch, rawActions );

    useEffect( () => console.log( 'Has rendered. ', 'BenchContextProvider' ) );

    return (
        <BenchContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </BenchContext.Provider>
    )
}

export { BenchContext, BenchContextProvider };