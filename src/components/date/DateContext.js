import React, { createContext, useReducer, useEffect } from 'react';
import comboReducer from '../../helpers/comboReducer';
import { oneOfManyMenuReducer, oneOfManyValidationReducer } from '../../storage/core/oneOfManyReducers';
import { dateReducer } from '../../storage/date/reducers';

const DateContext = createContext();

const DateContextProvider = props => {

    const reducers = [ 
        oneOfManyMenuReducer,
        oneOfManyValidationReducer,
        dateReducer
    ];

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), props.state );

    //useEffect( () => console.log( 'Has rendered. ', 'DateContextProvider' ) );

    return (
        <DateContext.Provider value={{ state, dispatch }}>
            { props.children }
        </DateContext.Provider>
    )
}

export { DateContext, DateContextProvider };