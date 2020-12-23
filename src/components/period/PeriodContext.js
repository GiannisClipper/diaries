import React, { createContext, useReducer, useEffect } from 'react';

const periodReducer = ( state, action ) => {

    switch ( action.type ) {

        default: {
            throw new Error();
        }
    }
}

const PeriodContext = createContext();

const PeriodContextProvider = props => {

    const [ state, dispatch ] = useReducer( periodReducer, props.state );

    useEffect( () => console.log( 'Has rendered. ', 'PeriodContextProvider' ) );

    return (
        <PeriodContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PeriodContext.Provider>
    )
}

export { PeriodContext, PeriodContextProvider };