import React, { useContext, useEffect } from 'react';
import { STATEContext } from './STATEContext';
import { dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';

const namespace = 'dates';

function DateInit() {

    const STATE = useContext( STATEContext );

    const { init } = STATE.state.uiux;

    const initializeList = () => {
        STATE.dispatch( { 
            namespace, 
            type: 'INITIALIZE_LIST',
            payload: { num: 7 }
        } );
    }

    const initializeListAfterRequest = () => {
        STATE.dispatch( { 
            namespace, 
            type: 'INITIALIZE_LIST_AFTER_REQUEST' 
        } );
    }

    const retrieveDatesRequestDone = ( dateFrom, dateTill, dataFromDB ) => {
        STATE.dispatch( { 
            namespace,
            type: 'RETRIEVE_DATES_REQUEST_DONE',
            payload: { dateFrom, dateTill, dataFromDB },

        } );
    }

    const retrieveDatesRequestError = ( dateFrom, dateTill ) => {
        STATE.dispatch( { 
            namespace,
            type: 'RETRIEVE_DATES_REQUEST_ERROR',
            payload: { dateFrom, dateTill },

        } );
    }

    useEffect( () => {
        if ( !init.dates ) {
            console.log( 'To_init_dates...' )
            initializeList();

        } else if ( init.dates.isBeforeRequest ) {
            const { dateFrom, dateTill } = init.dates;
            const strFrom = dateToYYYYMMDD( dateFrom );
            const strTill = dateToYYYYMMDD( dateTill );
            console.log( 'Requesting... ', strFrom, strTill )

            const uri = `/.netlify/functions/retrieve-dates?range=${strFrom}-${strTill}`;
            const method = 'GET';

            //mockFetch( uri, { method } )
            realFetch( uri, { method } )
                .then( res => {
                    alert( JSON.stringify( res ) );
                    retrieveDatesRequestDone( dateFrom, dateTill, res );
                } )
                .catch( err => {
                    alert( `${err} (${method} ${uri}).` );
                    console.log( `${err} (${method} ${uri}).` );
                    retrieveDatesRequestError( dateFrom, dateTill );
                } );

                initializeListAfterRequest();
        }
    } );

    return ( <></> );
}

export default DateInit;