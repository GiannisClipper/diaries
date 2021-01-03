import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider, CoreContext } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { RetrieveManyRequest } from '../core/CoreRequests';

import { DatesContext } from '../date/DatesContext';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';
import { dateToYYYYMMDD } from '../../helpers/dates';

function RetrieveManyResponseAfter() {

    const { genres } = useContext( GenresContext ).state;
    const { funds } = useContext( FundsContext ).state;
    const genres_uiux = useContext( GenresContext ).state._uiux;
    const funds_uiux = useContext( FundsContext ).state._uiux;

    const { retrieveManyResponseAfter, retrieveManyResponseError } = useContext( CoreContext );

    useEffect( () => {

        const process1 = genres_uiux.process;
        const process2 = funds_uiux.process;

        if ( process1.isResponseOk && process2.isResponseOk ) {
            const payload = { genres, funds };
            retrieveManyResponseAfter( payload );

        } else if ( process1.isResponseError || process2.isResponseError ) {
            retrieveManyResponseError();
        }
    } );

    return null;
};

function DateInit() {

    const { state, dispatch } = useContext( DatesContext );
    const { dates, _uiux } = state;

    const dateFrom = dateToYYYYMMDD( dates[ 0 ].date );
    const dateTill = dateToYYYYMMDD( dates[ dates.length - 1 ].date );

    //useEffect( () => console.log( 'Has rendered. ', 'DateInit' ) );

    return (
        <CoreContextProvider 
            actions={ [ actions.retrieveMany ] }
            dispatch={ dispatch }
        >
            { _uiux.process.isResponseOk ?
                <RetrieveManyResponseAfter />
            :
                <RetrieveManyRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/entry?range=${dateFrom}-${dateTill}` }
                />
            }
        </CoreContextProvider>
    );
}

export default DateInit;
export { DateInit };