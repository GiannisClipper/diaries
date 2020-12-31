import React, { createContext, useReducer, useEffect } from 'react';
import { reportsSchema } from '../../storage/schemas';
import { reportsReducer } from '../../storage/report/reducers';

const ReportsContext = createContext();

const ReportsContextProvider = props => {

    const [ state, dispatch ] = useReducer( reportsReducer, reportsSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'ReportsContextProvider' ) );

    return (
        <ReportsContext.Provider value={ { state, dispatch } }>
            { props.children }
        </ReportsContext.Provider>
    )
}

export { ReportsContext, ReportsContextProvider };