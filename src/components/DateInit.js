import React, { useEffect, useContext } from 'react';
import { STATEContext } from './STATEContext';
import { shiftDate, YYYYMMDDToDate, reprToYYYYMMDD } from '../helpers/dates';

const namespace = 'dates';

const calcCentralDate = centralDate => {
    centralDate = YYYYMMDDToDate( reprToYYYYMMDD( centralDate ) ) || new Date();
    centralDate.setHours( 12 );
    centralDate.setMinutes( 0 );
    centralDate.setSeconds( 0 );
    centralDate.setMilliseconds( 0 );

    return centralDate;
}

const calcDates = ( startDate, days ) => {
    startDate = days < 0
        ? shiftDate( startDate, days )
        : shiftDate( startDate, 1 );

    const dates = new Array( Math.abs( days ) )
        .fill( undefined )
        .map( ( x, index ) => shiftDate( startDate, index ) );

    return dates;
}

const calcInitDates = ( centralDate, days ) => {
    const prevDates = calcDates( centralDate, -Math.abs( days ) );
    const nextDates = calcDates( centralDate, Math.abs( days ) );
    const dateFrom = prevDates[ 0 ];
    const dateTill = nextDates[ nextDates.length - 1 ];

    return { prevDates, centralDate, nextDates, dateFrom, dateTill };
}

const calcPrevDates = ( startDate, days ) => {
    const prevDates = calcDates( startDate, -days );
    const dateFrom = prevDates[ 0 ];
    const dateTill = prevDates[ prevDates.length - 1 ];
    const nextDates = [];

    return { prevDates, nextDates, dateFrom, dateTill };
}

const calcNextDates = ( startDate, days ) => {
    const prevDates = [];
    const nextDates = calcDates( startDate, days );
    const dateFrom = nextDates[ 0 ];
    const dateTill = nextDates[ nextDates.length - 1 ];

    return { prevDates, nextDates, dateFrom, dateTill };
}

function DateInit( { mode, process, entriesMode } ) {

    const STATE = useContext( STATEContext );
    const { dispatch } = STATE;
    const { dates, settings } = STATE.state.data;
    const centralDate = calcCentralDate( settings.data.centralDate );
    const days = 7;

    useEffect( () => {
        if ( Object.keys( process ).length === 0 ) {  // process === {}
            const payload = { mode: { isInit: true } };
            dispatch( { namespace, type: 'DO_INIT', payload } );

        } else if ( 
                process.isOnInit || 
                ( process.isWaiting && entriesMode.isRetrieveAll ) ||
                ( process.isWaiting && entriesMode.isOnRequestError ) 
            ) {

            if ( mode.isInit ) {
                const payload = { 
                    ...calcInitDates( centralDate, days ),
                    entriesMode
                };
                dispatch( { namespace, type: 'INIT_DATES', payload } );

            } else if ( mode.isInitPrev ) {
                const payload = {
                    ...calcPrevDates( dates[ 0 ].data.date, days ),
                    entriesMode
                };
                dispatch( { namespace, type: 'INIT_PREV_DATES', payload } );

            } else if ( mode.isInitNext ) {
                const payload = {
                    ...calcNextDates( dates[ dates.length - 1 ].data.date, days ),
                    entriesMode
                };
                dispatch( { namespace, type: 'INIT_NEXT_DATES', payload } );
            }
        }
    } );

    return <></>;
}

export default DateInit;
