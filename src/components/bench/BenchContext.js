import React, { createContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { pageReducer } from '../core/assets/reducers/page';
import { benchReducer } from './assets/reducers';

import chargeActions from '../core/helpers/chargeActions';
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

    const actions = chargeActions( dispatch, rawActions );

    useEffect( () => console.log( 'Has rendered. ', 'BenchContextProvider' ) );

    return (
        <BenchContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </BenchContext.Provider>
    )
}

export { BenchContext, BenchContextProvider };