import React, { useContext, useEffect  } from 'react';
import { CoreContextProvider } from '../../core/CoreContext';
import actions from '../../../storage/core/actions';
import { RetrieveManyRequest } from '../../core/CoreRequests';
import { GenresContext } from './GenresContext';

function GenreInit() {

    const { state, dispatch } = useContext( GenresContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'payment/GenreInit' ) );

    return (
        <CoreContextProvider 
            actions={ [ actions.retrieveMany ] }
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/payment-genre` }
            />
        </CoreContextProvider>
    );
}

export default GenreInit;
export { GenreInit };