import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider, CoreContext } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { RetrieveManyRequest } from '../core/CoreRequests';

import { BenchContext } from '../bench/BenchContext';
import { DatesContext } from '../date/DatesContext';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';
import { dateToYYYYMMDD } from '../../helpers/dates';

function RetrieveManyResponseOkAfter() {

    const { genres } = useContext( GenresContext ).state;
    const { funds } = useContext( FundsContext ).state;
    const genres_uiux = useContext( GenresContext ).state._uiux;
    const funds_uiux = useContext( FundsContext ).state._uiux;

    const { retrieveManyResponseOkAfter, retrieveManyResponseError } = useContext( CoreContext );

    useEffect( () => {

        const process1 = genres_uiux.process;
        const process2 = funds_uiux.process;

        if ( process1.isResponseOkAfter && process2.isResponseOkAfter ) {
            const payload = { genres, funds };
            retrieveManyResponseOkAfter( payload );

        } else if ( process1.isResponseError || process2.isResponseError ) {
            retrieveManyResponseError();
        }
    } );

    return null;
};

function DatesInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, dispatch } = useContext( DatesContext );
    const { dates, _uiux } = state;

    const dateFrom = dateToYYYYMMDD( dates[ 0 ].date );
    const dateTill = dateToYYYYMMDD( dates[ dates.length - 1 ].date );

    //useEffect( () => console.log( 'Has rendered. ', 'DatesInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {

        return (
            <CoreContextProvider 
                actions={ [ actions.retrieveMany ] }
                dispatch={ dispatch }
            >
                { _uiux.process.isResponseOk ?
                    <RetrieveManyResponseOkAfter />
                :
                    <RetrieveManyRequest 
                        process={ _uiux.process }
                        url={ `/.netlify/functions/entry?diary_id=${diary_id}&range=${dateFrom}-${dateTill}` }
                        error={ _uiux.error }
                    />
                }
            </CoreContextProvider>
        );
    }
}

export default DatesInit;
export { DatesInit };