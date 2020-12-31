import React, { createContext, useReducer, useEffect } from 'react';
import { usersSchema } from '../../storage/schemas';
import { usersReducer } from '../../storage/user/reducers';

const UsersContext = createContext();

const UsersContextProvider = props => {

    const [ state, dispatch ] = useReducer( usersReducer, usersSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'UsersContextProvider' ) );

    return (
        <UsersContext.Provider value={ { state, dispatch } }>
            { props.children }
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersContextProvider };