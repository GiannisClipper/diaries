import React, { createContext, useReducer } from 'react';
import { shiftDate } from '../helpers/dates';

const DATAContext = createContext();

const DATAContextProvider = props => {

    const today = new Date();
    today.setHours( 0 );
    today.setMinutes( 0 );
    today.setSeconds( 0 );
    today.setMilliseconds( 0 );

    const notes = [
        'First note...',
        'Second note...',
        'Third note...'
    ];

    const DATAState = {
        dates: [
            { date: shiftDate( today, -3 ), entries: [ ...notes ] },
            { date: shiftDate( today, -2 ), entries: [ ...notes ] },
            { date: shiftDate( today, -1 ), entries: [ ...notes ] },
            { date: today, entries: [ ...notes ] },
            { date: shiftDate( today, 1 ), entries: [ ...notes ] },
            { date: shiftDate( today, 2 ), entries: [ ...notes ] },
            { date: shiftDate( today, 3 ), entries: [ ...notes ] }
        ],
    };

    const DATAReducer = ( state, action ) => {

        let dates;

        switch (action.type) {

            case 'ADD_PREV_DATES':
                const addPrevDates = ( dates, num ) => {
                    let startVal = shiftDate( dates[ 0 ].date, -num );
                    let newDates = new Array( num ).fill( undefined );
                    newDates = newDates.map( ( x, index ) => ({ date: shiftDate( startVal, index ), entries: [ ...notes ] }) );
                    return [ ...newDates, ...dates ];
                }

                dates = [ ...state.dates ];
                return { ...state, dates: addPrevDates( dates, action.payload.num ) };

            case 'ADD_NEXT_DATES':
                const addNextDates = ( dates, num ) => {
                    let startVal = shiftDate( dates[ dates.length - 1 ].date, 1 );
                    let newDates = new Array( num ).fill( undefined );
                    newDates = newDates.map( ( x, index ) => ({ date: shiftDate( startVal, index ), entries: [ ...notes ] }) );
                    return [ ...dates, ...newDates ];
                }

                dates = [ ...state.dates ];
                return { ...state, dates: addNextDates( dates, action.payload.num ) };
        
            case 'SHIFT_DATE_ITEMS':
                dates = [ ...state.dates ];

                const { date, key1, key2 } = action.payload;
                const timestamp = date.getTime();
                let found = -1;

                for ( let i = 0; i < dates.length; i++ ) {
                    if ( dates[ i ].date.getTime() === timestamp ) {
                        found = i;
                        break;
                    }
                }

                if ( found > -1 ) {
                    const prevDates = dates.slice( 0, found );
                    const foundDate = { ...dates[ found ] };
                    const nextDates = dates.slice( found + 1 );

                    const entries = [ ...foundDate.entries ];
                    let tmp = entries[ key1 ];
                    entries[ key1 ] = entries[ key2 ];
                    entries[ key2 ] = tmp;

                    foundDate.entries = entries;
                    dates = [ ...prevDates, foundDate, ...nextDates ];
                    return { ...state, dates: dates };
                }

                return state;

            default:
                throw new Error();
        }
    };

    const [ state, dispatch ] = useReducer( DATAReducer, DATAState );

    return (
        <DATAContext.Provider value={ { state, dispatch } }>
            {props.children}
        </DATAContext.Provider>    
    )
}

export { DATAContext, DATAContextProvider };