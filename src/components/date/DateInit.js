import React, { useContext, useEffect  } from 'react';
import { CRUDContext, CRUDContextProvider, RetrieveManyRequest } from '../libs/CRUD';
import { DatesContext } from '../date/DatesContext';
import { AppContext } from '../app/AppContext';
import { dateToYYYYMMDD } from '../../helpers/dates';

function RetrieveManyResponseSetup() {

    const { state } = useContext( AppContext )
    const { payments, _uiux } = state;
    const { retrieveManyResponseSetup, retrieveManyResponseError } = useContext( CRUDContext );

    useEffect( () => {

        const process1 = _uiux.payments.genres.process;
        const process2 = _uiux.payments.funds.process;

        if ( process1.isResponseOk && process2.isResponseOk ) {
            const payload = { payments }; 
            retrieveManyResponseSetup( payload );

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

    // useEffect( () => console.log( 'Has rendered. ', 'DateInit' ) );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
        >
            { _uiux.process.isResponseOk ?
                <RetrieveManyResponseSetup />
            :
                <RetrieveManyRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/entry?range=${dateFrom}-${dateTill}` }
                />
            }
        </CRUDContextProvider>
    );
}

export default DateInit;
export { DateInit };