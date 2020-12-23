import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from '../../storage/user/reducers';

const UserContext = createContext();

const UserContextProvider = props => {

    const [ state, dispatch ] = useReducer( userReducer, props.state );

    useEffect( () => console.log( 'Has rendered. ', 'UserContextProvider' ) );

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };