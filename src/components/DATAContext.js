import React, { createContext, useReducer } from 'react';
import { daysBetween, shiftDate } from '../helpers/dates';

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

        let dates, entries;

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
        
            case 'MOVE_DATE_ENTRY':
                dates = [ ...state.dates ];
                console.log( action.payload )
                const { dragDate, dropDate, dragKey, dropKey } = action.payload;

                const dragFound = daysBetween( dates[0].date, dragDate );
                const dropFound = daysBetween( dates[0].date, dropDate );

                if ( dragFound > -1 && dropFound > -1 ) {

                    let prevDates, nextDates, dragDateFound, dropDateFound;

                    prevDates = dates.slice( 0, dragFound );
                    dragDateFound = { ...dates[ dragFound ] };
                    nextDates = dates.slice( dragFound + 1 );
                    entries = [ ...dragDateFound.entries ];
                    const entry = entries.splice( dragKey, 1 )[ 0 ];
                    dragDateFound.entries = entries;
                    dates = [ ...prevDates, dragDateFound, ...nextDates ];

                    prevDates = dates.slice( 0, dropFound );
                    dropDateFound = { ...dates[ dropFound ] };
                    nextDates = dates.slice( dropFound + 1 );
                    entries = [ ...dropDateFound.entries ];
                    entries.splice( dropKey, 0, entry );
                    dropDateFound.entries = entries;
                    dates = [ ...prevDates, dropDateFound, ...nextDates ];

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