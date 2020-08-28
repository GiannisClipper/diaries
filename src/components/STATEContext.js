import React, { createContext, useReducer } from 'react';
import { daysBetween, shiftDate } from '../helpers/dates';

const STATEContext = createContext();

const STATEContextProvider = props => {

    const today = new Date();
    today.setHours( 0 );
    today.setMinutes( 0 );
    today.setSeconds( 0 );
    today.setMilliseconds( 0 );

    const newEntry = () => ( {
        data: '',
        uiux: {
            form: { isClose: true },
            menu: { isClose: true },
        }
    } );

    const initState = {
        dates: [
            { date: shiftDate( today, -3 ), entries: [ newEntry() ] },
            { date: shiftDate( today, -2 ), entries: [ newEntry() ] },
            { date: shiftDate( today, -1 ), entries: [ newEntry() ] },
            { date: today, entries: [ newEntry() ] },
            { date: shiftDate( today, 1 ), entries: [ newEntry() ] },
            { date: shiftDate( today, 2 ), entries: [ newEntry() ] },
            { date: shiftDate( today, 3 ), entries: [ newEntry() ] }
        ],
    };

    const STATEReducer = ( state, action ) => {

        let dates, prevDates, activeDate, nextDates;
        let entries, prevEntries, activeEntry, nextEntries;

        const deconstructDate = date => {
            const pos = daysBetween( dates[0].date, date );
            prevDates = dates.slice( 0, pos );
            activeDate = { ...dates[ pos ] };
            nextDates = dates.slice( pos + 1 );
        }

        const deconstructEntry = pos => {
            entries = [ ...activeDate.entries ];
            prevEntries = entries.slice( 0, pos );
            activeEntry = { ...entries[ pos ] };
            nextEntries = entries.slice( pos + 1 );
        }

        const constructEntry = () => {
            activeEntry = Array.isArray( activeEntry ) ? activeEntry : [ activeEntry ];
            entries = [ ...prevEntries, ...activeEntry, ...nextEntries ];
            activeDate.entries = entries;
        }

        const constructDate = () => {
            dates = [ ...prevDates, activeDate, ...nextDates ];
        }

        switch (action.type) {

            case 'ADD_PREV_DATES': {
                const addPrevDates = ( dates, num ) => {
                    let startVal = shiftDate( dates[ 0 ].date, -num );
                    let newDates = new Array( num ).fill( undefined );
                    newDates = newDates.map( ( x, index ) => ({ date: shiftDate( startVal, index ), entries: [ newEntry() ] }) );
                    return [ ...newDates, ...dates ];
                }

                dates = [ ...state.dates ];
                return { ...state, dates: addPrevDates( dates, action.payload.num ) };

            } case 'ADD_NEXT_DATES': {
                const addNextDates = ( dates, num ) => {
                    let startVal = shiftDate( dates[ dates.length - 1 ].date, 1 );
                    let newDates = new Array( num ).fill( undefined );
                    newDates = newDates.map( ( x, index ) => ({ date: shiftDate( startVal, index ), entries: [ newEntry() ] }) );
                    return [ ...dates, ...newDates ];
                }

                dates = [ ...state.dates ];
                return { ...state, dates: addNextDates( dates, action.payload.num ) };
        
            } case 'MOVE_ENTRY': {
                dates = [ ...state.dates ];
                const { dragDate, dropDate, dragPos, dropPos } = action.payload;
                console.log( action.payload )

                deconstructDate( dragDate );
                deconstructEntry( dragPos );
                const entryToMove = { ...activeEntry };
                activeEntry = [];
                constructEntry();
                constructDate();

                deconstructDate( dropDate );
                deconstructEntry( dropPos );
                activeEntry = [ entryToMove, {...activeEntry} ];
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'OPEN_ENTRY_FORM': {
                dates = [ ...state.dates ];
                const { date, pos } = action.payload;

                deconstructDate( date );
                deconstructEntry( pos );
                const uiux = { ...activeEntry.uiux }; 
                uiux.form = { isOpen: true };
                activeEntry.uiux = uiux;
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'CLOSE_ENTRY_FORM': {
                dates = [ ...state.dates ];
                const { date, pos } = action.payload;

                deconstructDate( date );
                deconstructEntry( pos );
                const uiux = { ...activeEntry.uiux }; 
                uiux.form = { isClose: true };
                activeEntry.uiux = uiux;
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'OPEN_ENTRY_MENU': {
                dates = [ ...state.dates ];
                const { date, pos } = action.payload;

                deconstructDate( date );
                deconstructEntry( pos );
                activeEntry.uiux.menu = { isOpen: true };
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'CLOSE_ENTRY_MENU': {
                dates = [ ...state.dates ];
                const { date, pos } = action.payload;

                deconstructDate( date );
                deconstructEntry( pos );
                activeEntry.uiux.menu = { isClose: true };
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } default: {
                throw new Error();
            }
        }
    };

    const [ state, dispatch ] = useReducer( STATEReducer, initState );

    return (
        <STATEContext.Provider value={{ state, dispatch }}>
            {props.children}
        </STATEContext.Provider>    
    )
}

export { STATEContext, STATEContextProvider };