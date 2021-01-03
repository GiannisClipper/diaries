import React, { createContext, useReducer, useEffect } from 'react';
import { diariesSchema } from '../../storage/schemas';
import comboReducer from '../../helpers/comboReducer';
import { oneOfManyFormReducer, oneOfManyValidationReducer, oneOfManyRequestReducer } from '../../storage/core/oneOfManyReducers';
import { manyRequestReducer } from '../../storage/core/manyReducers';

const DiariesContext = createContext();

const DiariesContextProvider = props => {

    const reducers = [ 
        oneOfManyFormReducer,
        oneOfManyValidationReducer,
        oneOfManyRequestReducer,
        manyRequestReducer,
    ];

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), diariesSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'DiariesContextProvider' ) );

    return (
        <DiariesContext.Provider value={ { state, dispatch } }>
            { props.children }
        </DiariesContext.Provider>
    )
}

export { DiariesContext, DiariesContextProvider };