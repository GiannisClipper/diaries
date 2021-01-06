import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider } from '../../core/CoreContext';
import actions from '../../../storage/core/actions';
import { paymentGenreSchema } from '../../../storage/schemas';
import { parseGenreFromDB } from '../../../storage/payment/genre/parsers';
import { RetrieveManyRequest } from '../../core/CoreRequests';

import { BenchContext } from '../../bench/BenchContext';
import { GenresContext } from './GenresContext';

function GenresInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, dispatch } = useContext( GenresContext );
    const { _uiux } = state;

    const payload = {
        _namespace: 'genres',
        _schema: paymentGenreSchema,
        _parseFromDB: parseGenreFromDB,
        _sort: ( x, y ) => x.code > y.code ? 1 : -1,
    };

    //useEffect( () => console.log( 'Has rendered. ', 'payment/GenresInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <CoreContextProvider 
                actions={ [ actions.retrieveMany ] }
                dispatch={ dispatch }
                payload={ payload }
            >
                <RetrieveManyRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/payment-genre?diary_id=${diary_id}` }
                />
            </CoreContextProvider>
        );
    }
}

export default GenresInit;
export { GenresInit };