import React, { createContext, useReducer, useEffect } from 'react';
import { benchSchema } from '../../storage/schemas';
import { benchReducer } from '../../storage/bench/reducers';

const BenchContext = createContext();

const BenchContextProvider = props => {

    const [ state, dispatch ] = useReducer( benchReducer, benchSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'BenchContextProvider' ) );

    return (
        <BenchContext.Provider value={{ state, dispatch }}>
            { props.children }
        </BenchContext.Provider>
    )
}

export { BenchContext, BenchContextProvider };