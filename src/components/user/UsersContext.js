import React, { createContext, useReducer, useEffect } from 'react';
import { usersSchema } from '../../storage/schemas';
import { comboReducer, formReducer, validationReducer } from '../../storage/core/reducers';
import { usersReducer, userReducer } from '../../storage/user/reducers';

const UsersContext = createContext();

const UsersContextProvider = props => {

    const reducers = [ formReducer, validationReducer, usersReducer, userReducer ];

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), usersSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'UsersContextProvider' ) );

    return (
        <UsersContext.Provider value={ { state, dispatch } }>
            { props.children }
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersContextProvider };