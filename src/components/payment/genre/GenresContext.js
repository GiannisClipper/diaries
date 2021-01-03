import React, { createContext, useReducer, useEffect } from 'react';
import { paymentGenresSchema } from '../../../storage/schemas';
import comboReducer from '../../../helpers/comboReducer';
import { oneOfManyFormReducer, oneOfManyValidationReducer, oneOfManyRequestReducer } from '../../../storage/core/oneOfManyReducers';
import { manyRequestReducer } from '../../../storage/core/manyReducers';

const GenresContext = createContext();

const GenresContextProvider = props => {

    const reducers = [ 
        oneOfManyFormReducer,
        oneOfManyValidationReducer,
        oneOfManyRequestReducer,
        manyRequestReducer,
    ];

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), paymentGenresSchema() );

    //useEffect( () => console.log( 'Has rendered. ', 'GenresContextProvider' ) );

    return (
        <GenresContext.Provider value={ { state, dispatch } }>
            { props.children }
        </GenresContext.Provider>
    )
}

export { GenresContext, GenresContextProvider };