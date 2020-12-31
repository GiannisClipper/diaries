import React, { createContext, useReducer, useEffect } from 'react';
import { datesReducer } from '../../storage/date/reducers';

const DatesContext = createContext();

const DatesContextProvider = props => {

    const [ state, dispatch ] = useReducer( datesReducer, props.state );

    // useEffect( () => console.log( 'Has rendered. ', 'DatesContext' ) );

    return (
        <DatesContext.Provider value={{ state, dispatch }}>
            {props.children}
        </DatesContext.Provider>
    )
}

export { DatesContext, DatesContextProvider };