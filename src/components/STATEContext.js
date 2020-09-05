import React, { createContext, useReducer, useEffect } from 'react';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../helpers/dates';

const today = new Date();
today.setHours( 0 );
today.setMinutes( 0 );
today.setSeconds( 0 );
today.setMilliseconds( 0 );

const initState = {
    dates: [],
};

const initDate = () => ( {
    data: {
        date: null,
        entries: [],
    },
    uiux: {
        request: {
            isDoing: false,
            dateFrom: '',
            dateTill: '',
        }
    }
} );

const initEntry = () => ( {
    data: {
        id: null,
        note: '',
//        entryPos: 0,
    },
    uiux: {
        form: { isOpen: false },
        menu: { isOpen: false },
    }
} );

const parseEntryFromDB = data => ( {
    id: data._id,
    date: data.date,
    note: data.note,
    entryPos: data.entryPos
} )

const calcInitDates = ( date, num ) => {
    let startDate = shiftDate( date, -parseInt( num / 2 ) );
    let newDates = new Array( num ).fill( undefined );
    newDates = newDates.map( ( x, index ) => {
        const _ = initDate();
        _.data.date = shiftDate( startDate, index );
        _.uiux.request = { isDoing: true, dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
        return _;
    } );

    return newDates;
}

const calcPrevDates = ( dates, num ) => {
    let startDate = shiftDate( dates[ 0 ].data.date, -num );
    let newDates = new Array( num ).fill( undefined );
    newDates = newDates.map( ( x, index ) => {
        const _ = initDate();
        _.data.date = shiftDate( startDate, index );
        _.uiux.request = { isDoing: true, dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
        return _;
    } );

    return newDates;
}

const calcNextDates = ( dates, num ) => { 
    let startDate = shiftDate( dates[ dates.length - 1 ].data.date, 1 );
    let newDates = new Array( num ).fill( undefined );
    newDates = newDates.map( ( x, index ) => {
        const _ = initDate();
        _.data.date = shiftDate( startDate, index );
        _.uiux.request = { isDoing: true, dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
        return _;
    } );

    return newDates;
}

const STATEReducer = ( state, action ) => {
    //https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice
    //https://github.com/facebook/react/issues/16295
    
    let dates, prevDates, activeDate, nextDates;
    let entries, prevEntries, activeEntry, nextEntries;

    const getDatePos = date => {
        return daysBetween( dates[0].data.date, date );
    }

    const deconstructDate = datePos => {
        prevDates = dates.slice( 0, datePos );
        activeDate = {
            data: { ...dates[ datePos ].data },
            uiux: { ...dates[ datePos ].uiux }
        }
        nextDates = dates.slice( datePos + 1 );
    }

    const constructDate = () => {
        dates = [ ...prevDates, activeDate, ...nextDates ];
    }

    const deconstructEntry = entryPos => {
        entries = [ ...activeDate.data.entries ];
        entryPos = entryPos < entries.length ? entryPos : entries.length - 1;
        prevEntries = entries.slice( 0, entryPos );
        activeEntry = { ...entries[ entryPos ] };
        activeEntry = {
            data: { ...entries[ entryPos ].data },
            uiux: { ...entries[ entryPos ].uiux }
        }
        nextEntries = entries.slice( entryPos + 1 );
    }

    const constructEntry = () => {
        activeEntry = Array.isArray( activeEntry ) ? activeEntry : [ activeEntry ];
        entries = [ ...prevEntries, ...activeEntry, ...nextEntries ];
        activeDate.data.entries = entries;
    }

    switch ( action.type ) {

        case 'ADD_INIT_DATES': {
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
            activeEntry.uiux.menu = {};
            constructEntry();
            constructDate();

            return { ...state, dates };

        } case 'OPEN_ENTRY_FORM': {
            dates = [ ...state.dates ];
            const { date, entryPos } = action.payload;

            deconstructDate( getDatePos( date ) );
            deconstructEntry( entryPos );
            activeEntry.uiux.form = { isOpen: true };
            constructEntry();
            constructDate();

            return { ...state, dates };

        } case 'CLOSE_ENTRY_FORM': {
            dates = [ ...state.dates ];
            const { date, entryPos } = action.payload;

            deconstructDate( getDatePos( date ) );
            deconstructEntry( entryPos );
            activeEntry.uiux.form = {};
            constructEntry();
            constructDate();

            return { ...state, dates };

        } case 'REQUESTING_ENTRY_FORM': {
            dates = [ ...state.dates ];
            const { date, entryPos } = action.payload;

            deconstructDate( getDatePos( date ) );
            deconstructEntry( entryPos );
            activeEntry.uiux.form = { isOpen: true, isRequesting: true };
            constructEntry();
            constructDate();

            return { ...state, dates };

        } case 'RETRIEVE_DATES_REQUEST_DONE': {
            dates = [ ...state.dates ];
            const { dateFrom, dateTill, dataFromDB } = action.payload;
            dataFromDB.sort( ( a, b ) => a.entryPos < b.entryPos ? -1 : a.entryPos > b.entryPos ? 1 : 0 );

            const numDays = daysBetween( dateFrom, dateTill ) + 1;
            for ( let i = 0; i < numDays; i++ ) { 
                const date = shiftDate( dateFrom, i );
                const dateStr = dateToYYYYMMDD( date );
                const dateFromDB = dataFromDB.filter( x => x.date === dateStr );
                const entries = [];
                for ( const entryFromDB of dateFromDB ) {
                    const entry = initEntry();
                    entry.data = parseEntryFromDB( entryFromDB );
                    entries.push( entry );
                }
                const entry = initEntry();
                entries.push( entry );

                deconstructDate( getDatePos( date ) );
                activeDate.data.entries = entries;
                activeDate.uiux.request = {};
                constructDate();
            }

            return { ...state, dates };

        } case 'CREATE_ENTRY_REQUEST_DONE': {
            dates = [ ...state.dates ];
            const { date, entryPos, dataFromDB } = action.payload;

            deconstructDate( getDatePos( date ) );
            deconstructEntry( entryPos );
            activeEntry.data = parseEntryFromDB( dataFromDB );
            activeEntry.uiux.form = {};
            nextEntries.push( initEntry() );
            constructEntry();
            constructDate();

            return { ...state, dates };

        } case 'UPDATE_ENTRY_REQUEST_DONE': {
            dates = [ ...state.dates ];
            const { date, entryPos, dataFromDB } = action.payload;

            deconstructDate( getDatePos( date ) );
            deconstructEntry( entryPos );
            activeEntry.data = parseEntryFromDB( dataFromDB );
            activeEntry.uiux.form = {};
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
        console.log( 'Has rendered. ', 'STATEContext.Provider' );
    } );

    return (
        <STATEContext.Provider value={{ state, dispatch }}>
            {props.children}
        </STATEContext.Provider>
    )
}

export { STATEContext, STATEContextProvider };