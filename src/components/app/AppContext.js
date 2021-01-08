import React, { createContext, useReducer, useEffect } from 'react';
import { appSchema } from '../../storage/schemas';
import { appReducer } from '../../storage/app/reducers';

const AppContext = createContext();

const AppContextProvider = props => {

    const schema = appSchema();
    schema.signin = { ...schema.signin, ...JSON.parse( localStorage.getItem( 'signin' ) || '{}' ) };
    schema.settings = { ...schema.settings, ...JSON.parse( localStorage.getItem( 'settings' ) || '{}' ) };

    const [ state, dispatch ] = useReducer( appReducer, schema );

    window.state = state;

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { state, dispatch } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };