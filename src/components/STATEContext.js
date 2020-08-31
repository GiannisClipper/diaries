import React, { createContext, useReducer } from 'react';
import { daysBetween, shiftDate } from '../helpers/dates';

const STATEContext = createContext();

const STATEContextProvider = props => {

    const today = new Date();
    today.setHours( 0 );
    today.setMinutes( 0 );
    today.setSeconds( 0 );
    today.setMilliseconds( 0 );

    const testEntry = () => ( {
                data: {
                    id: '0101',
                    note: ` Entry with content ${Math.random() * 100}`,
                },
                uiux: {
                    form: { isClose: true },
                    menu: { isClose: true },
                }
            } );

    const initEntry = () => ( {
        data: { 
            id: null,
            note: '',
        },
        uiux: {
            form: { isClose: true },
            menu: { isClose: true },
        }
    } );

    const initState = {
        dates: [
            { date: shiftDate( today, -3 ), entries: [ testEntry(), initEntry() ] },
            { date: shiftDate( today, -2 ), entries: [ testEntry(), initEntry() ] },
            { date: shiftDate( today, -1 ), entries: [ testEntry(), initEntry() ] },
            { date: today, entries: [ initEntry() ] },
            { date: shiftDate( today, 1 ), entries: [ testEntry(), initEntry() ] },
            { date: shiftDate( today, 2 ), entries: [ initEntry() ] },
            { date: shiftDate( today, 3 ), entries: [ initEntry() ] }
        ],
    };

    const addPrevDates = ( dates, num ) => {
        let startVal = shiftDate( dates[ 0 ].date, -num );
        let newDates = new Array( num ).fill( undefined );
        newDates = newDates.map( ( x, index ) => ({ date: shiftDate( startVal, index ), entries: [ initEntry() ] }) );
        return [ ...newDates, ...dates ];
    }

    const addNextDates = ( dates, num ) => {
        let startVal = shiftDate( dates[ dates.length - 1 ].date, 1 );
        let newDates = new Array( num ).fill( undefined );
        newDates = newDates.map( ( x, index ) => ({ date: shiftDate( startVal, index ), entries: [ initEntry() ] }) );
        return [ ...dates, ...newDates ];
    }

    const STATEReducer = ( state, action ) => {

        let dates, prevDates, activeDate, nextDates;
        let entries, prevEntries, activeEntry, nextEntries;

        const getDatePos = date => {
            return daysBetween( dates[0].date, date );
        }

        const deconstructDate = datePos => {
            prevDates = dates.slice( 0, datePos );
            activeDate = { ...dates[ datePos ] };
            nextDates = dates.slice( datePos + 1 );
        }

        const deconstructEntry = entryPos => {
            entries = [ ...activeDate.entries ];
            entryPos = entryPos < entries.length ? entryPos : entries.length - 1;
            prevEntries = entries.slice( 0, entryPos );
            activeEntry = { ...entries[ entryPos ] };
            nextEntries = entries.slice( entryPos + 1 );
        }

        const constructEntry = () => {
            activeEntry = Array.isArray( activeEntry ) ? activeEntry : [ activeEntry ];
            entries = [ ...prevEntries, ...activeEntry, ...nextEntries ];
            activeDate.entries = entries;
        }

        const constructDate = () => {
            dates = [ ...prevDates, activeDate, ...nextDates ];
        }

        switch ( action.type ) {

            case 'ADD_PREV_DATES': {
                dates = [ ...state.dates ];
                return { ...state, dates: addPrevDates( dates, action.payload.num ) };

            } case 'ADD_NEXT_DATES': {
                dates = [ ...state.dates ];
                return { ...state, dates: addNextDates( dates, action.payload.num ) };

            } case 'REMOVE_PREV_DATES': {
                dates = [ ...state.dates ];
                return { ...state, dates: dates.slice( action.payload.num ) };

            } case 'REMOVE_NEXT_DATES': {
                dates = [ ...state.dates ];
                return { ...state, dates: dates.slice( 0, -action.payload.num ) };
    
           } case 'MOVE_ENTRY': {
                dates = [ ...state.dates ];
                const { departDate, arriveDate, departEntryPos, arriveEntryPos } = action.payload;

                deconstructDate( getDatePos( departDate ) );
                deconstructEntry( departEntryPos );
                const entryToMove = { ...activeEntry };
                activeEntry = [];
                constructEntry();
                constructDate();

                deconstructDate( getDatePos( arriveDate ) );
                deconstructEntry( arriveEntryPos );
                activeEntry = [ entryToMove, {...activeEntry} ];
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'COPY_ENTRY': {
                dates = [ ...state.dates ];
                const { departDate, arriveDate, departEntryPos, arriveEntryPos } = action.payload;

                deconstructDate( getDatePos( departDate ) );
                deconstructEntry( departEntryPos );
                const entryToCopy = { ...activeEntry };

                deconstructDate( getDatePos( arriveDate ) );
                deconstructEntry( arriveEntryPos );
                activeEntry = [ entryToCopy, {...activeEntry} ];
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'OPEN_ENTRY_MENU': {
                dates = [ ...state.dates ];
                const { date, entryPos } = action.payload;
                const datePos = getDatePos( date );

                deconstructDate( datePos );
                deconstructEntry( entryPos );
                activeEntry.uiux.menu = { isOpen: true };
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'CLOSE_ENTRY_MENU': {
                dates = [ ...state.dates ];
                const { date, entryPos } = action.payload;
                const datePos = getDatePos( date );

                deconstructDate( datePos );
                deconstructEntry( entryPos );
                activeEntry.uiux.menu = { isClose: true };
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'OPEN_ENTRY_FORM': {
                dates = [ ...state.dates ];
                const { date, entryPos } = action.payload;

                deconstructDate( getDatePos( date ) );
                deconstructEntry( entryPos );
                const uiux = { ...activeEntry.uiux };
                uiux.form = { isOpen: true };
                activeEntry.uiux = uiux;
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'CLOSE_ENTRY_FORM': {
                dates = [ ...state.dates ];
                const { date, entryPos } = action.payload;

                deconstructDate( getDatePos( date ) );
                deconstructEntry( entryPos );
                const uiux = { ...activeEntry.uiux }; 
                uiux.form = { isClose: true };
                activeEntry.uiux = uiux;
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'SAVE_ENTRY': {
                dates = [ ...state.dates ];
                const { date, entryPos, entry } = action.payload;
 
                deconstructDate( getDatePos( date ) );
                deconstructEntry( entryPos );
                activeEntry.data = { ...entry.data };
                if ( !entry.data.id ) {
                    nextEntries.push( initEntry() );
                    activeEntry.data.id = '0102';
                }
                constructEntry();
                constructDate();

                return { ...state, dates: dates };

            } case 'DELETE_ENTRY': {
                dates = [ ...state.dates ];
                const { date, entryPos } = action.payload;
 
                deconstructDate( getDatePos( date ) );
                deconstructEntry( entryPos );
                activeEntry = [];
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