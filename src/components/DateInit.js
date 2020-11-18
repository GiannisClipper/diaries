import React, { useContext, useEffect } from 'react';
import { STATEContext } from './STATEContext';
import { dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';

const namespace = 'dates';

function DateInit() {

    const STATE = useContext( STATEContext );

    const { init } = STATE.state.uiux;

    const settings = STATE.state.data.settings;

    const initializeList = () => {
        STATE.dispatch( { 
            namespace, 
            type: 'INITIALIZE_LIST',
            payload: { 
                centralDate: settings.data.centralDate, 
                num: 7
            }
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
            if ( Object.keys( init.dates ).length === 0 ) {
                console.log( 'To_init_dates...' )
                initializeList();

            } else if ( init.dates.isBeforeRequest ) {
                const { dateFrom, dateTill } = init.dates;
                const strFrom = dateToYYYYMMDD( dateFrom );
                const strTill = dateToYYYYMMDD( dateTill );

                if ( init.payments.genres && init.payments.funds ) {
    
                    if ( init.payments.genres.isDone || init.payments.funds.isDone ) {
                        console.log( 'Requesting... ', strFrom, strTill )
                        const uri = `/.netlify/functions/entry?range=${strFrom}-${strTill}`;
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

                    } else if ( init.payments.genres.isError || init.payments.funds.isError ) {
                        retrieveDatesRequestError( dateFrom, dateTill );
                        initializeListAfterRequest();
                    }
            }
        }
    } );

    return ( <></> );
}

export default DateInit;