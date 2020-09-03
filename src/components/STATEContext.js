import React, { createContext, useReducer, useEffect } from 'react';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../helpers/dates';

const today = new Date();
today.setHours( 0 );
today.setMinutes( 0 );
today.setSeconds( 0 );
today.setMilliseconds( 0 );

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

const initDate = () => ( {
    date: null,
    entries: [],
    uiux: {
        isLoading: true,
        doRequest: null,
        requestArgs: null,
    }
} );

const initState = {
    dates: [],
};

const calcInitDates = ( date, num ) => {
    let startDate = shiftDate( date, -parseInt( num / 2 ) );
    let newDates = new Array( num ).fill( undefined );
    newDates = newDates.map( ( x, index ) => ({ ...initDate(), date: shiftDate( startDate, index ) }) );
    const requestArgs = { dateFrom: startDate, dateTill: shiftDate( startDate, num - 1) };
    newDates[ 0 ].uiux.requestArgs = requestArgs;
    return newDates;
}

const calcPrevDates = ( dates, num ) => {
    let startDate = shiftDate( dates[ 0 ].date, -num );
    let newDates = new Array( num ).fill( undefined );
    newDates = newDates.map( ( x, index ) => ({ ...initDate(), date: shiftDate( startDate, index ) }) );
    const requestArgs = { dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
    newDates[ 0 ].uiux.requestArgs = requestArgs;
    return newDates;
}

const calcNextDates = ( dates, num ) => { 
    let startDate = shiftDate( dates[ dates.length - 1 ].date, 1 );
    let newDates = new Array( num ).fill( undefined );
    newDates = newDates.map( ( x, index ) => ({ ...initDate(), date: shiftDate( startDate, index ) }) );
    const requestArgs = { dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
    newDates[ 0 ].uiux.requestArgs = requestArgs;
    return newDates;
}

const STATEReducer = ( state, action ) => {
    //https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice
    //https://github.com/facebook/react/issues/16295
    
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

        case 'LOADING_OFF': {
            dates = [ ...state.dates ];
            const { dateFrom, dateTill, data } = action.payload;

            data.sort( (a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0 );

            const numDays = daysBetween( dateFrom, dateTill ) + 1;
            for ( let i = 0; i < numDays; i++ ) { 
                const date = shiftDate( dateFrom, i );
                const dateStr = dateToYYYYMMDD( date );
                const dateInDB = data.filter( x => x.date === dateStr );
                const entries = [];
                for ( const entryInDB of dateInDB ) {
                    const entry = initEntry() ;
                    entry.data = entryInDB;
                    entries.push( entry );
                }
                entries.push( initEntry() );

                deconstructDate( getDatePos( date ) );
                activeDate.entries = entries;
                activeDate.uiux.isLoading = false;
                activeDate.uiux.doRequest = null;
                activeDate.uiux.requestArgs = null;
                constructDate();
            }

            return { ...state, dates };

        } case 'ADD_INIT_DATES': {
            const dates = calcInitDates( today, action.payload.num );
            return { ...state, dates };

        } case 'ADD_PREV_DATES': {
            dates = [ ...state.dates ];
            const newDates = calcPrevDates( dates, action.payload.num );
            return { ...state, dates: [ ...newDates, ...dates ] };

        } case 'ADD_NEXT_DATES': {
            dates = [ ...state.dates ];
            const newDates = calcNextDates( dates, action.payload.num );
            return { ...state, dates: [ ...dates, ...newDates ] };

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

            return { ...state, dates };

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

            return { ...state, dates };

        } case 'OPEN_ENTRY_MENU': {
            dates = [ ...state.dates ];
            const { date, entryPos } = action.payload;
            const datePos = getDatePos( date );

            deconstructDate( datePos );
            deconstructEntry( entryPos );
            activeEntry.uiux.menu = { isOpen: true };
            constructEntry();
            constructDate();

            return { ...state, dates };

        } case 'CLOSE_ENTRY_MENU': {
            dates = [ ...state.dates ];
            const { date, entryPos } = action.payload;
            const datePos = getDatePos( date );

            deconstructDate( datePos );
            deconstructEntry( entryPos );
            activeEntry.uiux.menu = { isClose: true };
            constructEntry();
            constructDate();

            return { ...state, dates };

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

            return { ...state, dates };

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

            return { ...state, dates };

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

            return { ...state, dates };

        } case 'DELETE_ENTRY': {
            dates = [ ...state.dates ];
            const { date, entryPos } = action.payload;

            deconstructDate( getDatePos( date ) );
            deconstructEntry( entryPos );
            activeEntry = [];
            constructEntry();
            constructDate();

            return { ...state, dates };

        } default: {
            throw new Error();
        }
    }
};

const STATEContext = createContext();

const STATEContextProvider = props => {

    const [ state, dispatch ] = useReducer( STATEReducer, initState );

    useEffect( () => {
        console.log( 'Just rendered ', 'STATEContext.Provider' );
    } );

    return (
        <STATEContext.Provider value={{ state, dispatch }}>
            {props.children}
        </STATEContext.Provider>    
    )
}

export { STATEContext, STATEContextProvider };