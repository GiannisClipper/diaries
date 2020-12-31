import React, { createContext, useReducer, useEffect } from 'react';
import { dateReducer } from '../../storage/date/reducers';

const DateContext = createContext();

const DateContextProvider = props => {

    const [ state, dispatch ] = useReducer( dateReducer, props.state );

    // useEffect( () => console.log( 'Has rendered. ', 'DateContextProvider' ) );

    return (
        <DateContext.Provider value={{ state, dispatch }}>
            { props.children }
        </DateContext.Provider>
    )
}

export { DateContext, DateContextProvider };