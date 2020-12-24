import React, { useContext, useEffect  } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../libs/CRUD';
import { AppContext } from '../app/AppContext';

function GenreInit() {

    const { state, dispatch } = useContext( AppContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'payment/GenreInit' ) );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
            namespace={ 'paymentGenres' }
        >
            <RetrieveManyRequest 
                process={ _uiux.payments.genres.process }
                url={ `/.netlify/functions/payment-genre` }
            />
        </CRUDContextProvider>
    );
}

export default GenreInit;
export { GenreInit };