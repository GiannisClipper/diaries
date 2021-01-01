import React, { createContext, useReducer, useEffect } from 'react';
import { paymentGenresSchema } from '../../../storage/schemas';
import { genresReducer } from '../../../storage/payment/genre/reducers';

const GenresContext = createContext();

const GenresContextProvider = props => {

    const [ state, dispatch ] = useReducer( genresReducer, paymentGenresSchema() );

    useEffect( () => console.log( 'Has rendered. ', 'GenresContextProvider' ) );

    return (
        <GenresContext.Provider value={ { state, dispatch } }>
            { props.children }
        </GenresContext.Provider>
    )
}

export { GenresContext, GenresContextProvider };