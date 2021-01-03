import React, { createContext, useReducer, useEffect } from 'react';
import { appSchema } from '../../storage/schemas';
import { appReducer } from '../../storage/app/reducers';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ state, dispatch ] = useReducer( appReducer, appSchema() );

    window.state = state;

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { state, dispatch } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };