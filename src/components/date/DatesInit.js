import React, { useContext, useEffect  } from 'react';

import { BenchContext } from '../bench/BenchContext';
import { DatesContext } from '../date/DatesContext';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';
import { dateToYYYYMMDD } from '../core/helpers/dates';

import assets from './assets/assets';
import { RetrieveManyRequest } from '../core/CoreRequests';

function RetrieveManyResponseOkAfter() {

    const { genres } = useContext( GenresContext ).state;
    const { funds } = useContext( FundsContext ).state;
    const genres_uiux = useContext( GenresContext ).state._uiux;
    const funds_uiux = useContext( FundsContext ).state._uiux;

    const { actions } = useContext( DatesContext );

    useEffect( () => {

        const status1 = genres_uiux.status;
        const status2 = funds_uiux.status;

        if ( status1.isResponseOkAfter && status2.isResponseOkAfter ) {
            const payload = { genres, funds, assets };
            actions.retrieveManyResponseOkAfter( payload );

        } else if ( status1.isResponseError || status2.isResponseError ) {
            const payload = { genres, funds, assets };
            actions.retrieveManyResponseError( payload );
        }
    } );

    return null;
};

function DatesInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, actions } = useContext( DatesContext );
    const { dates, _uiux } = state;

    const dateFrom = dateToYYYYMMDD( dates[ 0 ].date );
    const dateTill = dateToYYYYMMDD( dates[ dates.length - 1 ].date );

    if ( Object.keys( _uiux.status ).length === 0 ) {
        actions.retrieveManyRequestBefore( { assets } );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'DatesInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {

        return (
            _uiux.status.isResponseOk
            ?
                <RetrieveManyResponseOkAfter />
            :
                <RetrieveManyRequest 
                    Context={ DatesContext }
                    assets = { assets }
                    url={ `/.netlify/functions/entry?diary_id=${ diary_id }&range=${ dateFrom }-${ dateTill }` }
                />
        );
    }
}

export default DatesInit;
export { DatesInit };