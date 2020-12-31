import React, { createContext, useReducer, useEffect } from 'react';
import { diariesSchema } from '../../storage/schemas';
import { diariesReducer } from '../../storage/diary/reducers';

const DiariesContext = createContext();

const DiariesContextProvider = props => {

    const [ state, dispatch ] = useReducer( diariesReducer, diariesSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'DiariesContextProvider' ) );

    return (
        <DiariesContext.Provider value={ { state, dispatch } }>
            { props.children }
        </DiariesContext.Provider>
    )
}

export { DiariesContext, DiariesContextProvider };