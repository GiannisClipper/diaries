import React, { useContext, useEffect  } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../../libs/CRUD';
import { GenresContext } from './GenresContext';

function GenreInit() {

    const { state, dispatch } = useContext( GenresContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'payment/GenreInit' ) );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/payment-genre` }
            />
        </CRUDContextProvider>
    );
}

export default GenreInit;
export { GenreInit };