import React, { createContext, useReducer, useEffect } from 'react';
import { usersSchema } from '../../storage/schemas';
import comboReducer from '../../helpers/comboReducer';
import { oneOfManyFormReducer, oneOfManyValidationReducer, oneOfManyRequestReducer } from '../../storage/core/oneOfManyReducers';
import { manyRequestReducer } from '../../storage/core/manyReducers';

const UsersContext = createContext();

const UsersContextProvider = props => {

    const reducers = [ 
        oneOfManyFormReducer,
        oneOfManyValidationReducer,
        oneOfManyRequestReducer,
        manyRequestReducer,
    ];

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), usersSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'UsersContextProvider' ) );

    return (
        <UsersContext.Provider value={ { state, dispatch } }>
            { props.children }
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersContextProvider };