import React, { createContext, useReducer, useEffect } from 'react';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../helpers/dates';

const centralDate = new Date();
centralDate.setHours( 12 );
centralDate.setMinutes( 0 );
centralDate.setSeconds( 0 );
centralDate.setMilliseconds( 0 );

const initState = {
    data: {
        dates: [],
        paymentGenres: []
    },
    uiux: {
        // status: { isBeforeFirstRequest: true }  // isBeforeFirstRequest, isAfterFirstRequest
    }
};

const initDate = () => ( {
    data: {
        date: null,
        entries: [],
    },
    uiux: {
        db: {
            isOnRequest: false,
            dateFrom: '',
            dateTill: '',
        },
        position: {}  // isCentral
    }
} );

const initEntry = () => ( {
    data: {
        id: null,
        date: '',
        note: '',
        inSequence: 0,
    },
    uiux: {
        menu: {},  // isOpen
        form: {},  // isOpen
        type: {},  // isNote, isPayment
        mode: {},  // isCreate, isUpdate, isDelete
        db: {},  // isOnRequest
        status: {}  // isSuspended
    }
} );

const initPaymentGenre = () => ( {
    data: {
        id: null,
        code: '',
        name: '',
        isIncoming: null,
    },
    uiux: {
        db: {
            isOnRequest: false,
        },
    }
} );

const parseEntryFromDB = data => ( {
    id: data._id,
    date: data.date,
    note: data.note,
    inSequence: data.inSequence
} )

const parsePaymentGenreFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming
} )

const calcInitDates = ( date, num ) => {
    let startDate = shiftDate( date, -parseInt( num / 2 ) );
    let newDates = new Array( num ).fill( undefined );
    newDates = newDates.map( ( x, index ) => {
        const _ = initDate();
        _.data.date = shiftDate( startDate, index );
        _.uiux.db = { isOnRequest: true, dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
        _.uiux.position = _.data.date.getTime() === centralDate.getTime() ? { isCentral: true } : {};
        _.data.entries.push( initEntry() );
        _.data.entries[ 0 ].uiux.db = { isOnRequest: true };
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
        _.uiux.db = { isOnRequest: true, dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
        _.data.entries.push( initEntry() );
        _.data.entries[ 0 ].uiux.db = { isOnRequest: true };
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
        _.uiux.db = { isOnRequest: true, dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
        _.data.entries.push( initEntry() );
        _.data.entries[ 0 ].uiux.db = { isOnRequest: true };
        return _;
    } );

    return newDates;
}

const STATEReducer = ( state, action ) => {
    //https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice
    //https://github.com/facebook/react/issues/16295
    
    let data, uiux;
    let dates, prevDates, activeDate, nextDates;
    let entries, prevEntries, activeEntry, nextEntries;
    let paymentGenres, prevPaymentGenres, activePaymentGenre, nextPaymentGenres;

    const getDateInSequence = date => {
        return daysBetween( dates[0].data.date, date );
    }

    const deconstructState = () => {
        data = { ...state.data };
        uiux = { ...state.uiux };
        dates = [ ...data.dates ];
        paymentGenres = [ ...data.paymentGenres ];
    }

    const constructState = () => {
        return { data: { dates, paymentGenres }, uiux };
    }

    const deconstructDate = dateInSequence => {
        prevDates = dates.slice( 0, dateInSequence );
        activeDate = {
            data: { ...dates[ dateInSequence ].data },
            uiux: { ...dates[ dateInSequence ].uiux }
        }
        nextDates = dates.slice( dateInSequence + 1 );
    }

    const constructDate = () => {
        dates = [ ...prevDates, activeDate, ...nextDates ];
    }

    const deconstructEntry = inSequence => {
        entries = [ ...activeDate.data.entries ];
        inSequence = inSequence < entries.length ? inSequence : entries.length - 1;
        prevEntries = entries.slice( 0, inSequence );
        activeEntry = { ...entries[ inSequence ] };
        activeEntry = {
            data: { ...entries[ inSequence ].data },
            uiux: { ...entries[ inSequence ].uiux }
        }
        nextEntries = entries.slice( inSequence + 1 );
    }

    const constructEntry = () => {
        activeEntry = Array.isArray( activeEntry ) ? activeEntry : [ activeEntry ];
        entries = [ ...prevEntries, ...activeEntry, ...nextEntries ];
        activeDate.data.entries = entries;
    }

    switch ( action.type ) {

        case 'ADD_INIT_DATES': {

            deconstructState();
            dates = calcInitDates( centralDate, action.payload.num );
            return constructState();

        } case 'ADD_PREV_DATES': {

            deconstructState();
            const newDates = calcPrevDates( dates, action.payload.num );
            dates = [ ...newDates, ...dates ];
            return constructState();

        } case 'ADD_NEXT_DATES': {

            deconstructState();
            const newDates = calcNextDates( dates, action.payload.num );
            dates = [ ...dates, ...newDates ];
            return constructState();

        } case 'REMOVE_PREV_DATES': {

            deconstructState();
            dates = dates.slice( action.payload.num );
            return constructState();

        } case 'REMOVE_NEXT_DATES': {

            deconstructState();
            dates = dates.slice( 0, -action.payload.num );
            return constructState();

        } case 'MOVE_ENTRY': {

            deconstructState();
            const { cut, paste } = action.payload;

            if ( cut.date + cut.inSequence !== paste.date + paste.inSequence ) {
                deconstructDate( getDateInSequence( cut.date ) );
                deconstructEntry( cut.inSequence );
                const entryToMove = { ...activeEntry };
                entryToMove.uiux.db = { isOnRequest: true };
                entryToMove.uiux.mode = { isUpdate: true };

                activeEntry = [];
                constructEntry();
                constructDate();

                deconstructDate( getDateInSequence( paste.date ) );
                deconstructEntry( paste.inSequence );
                activeEntry = [ entryToMove, { ...activeEntry } ];
                constructEntry();
                activeDate.data.entries.forEach( x => x.uiux.status = { isSuspended: true } );
                constructDate();
            }

            return constructState();

        } case 'COPY_ENTRY': {

            deconstructState();
            const { copy, paste } = action.payload;

            deconstructDate( getDateInSequence( copy.date ) );
            deconstructEntry( copy.inSequence );
            const entryToCopy = { ...activeEntry };
            entryToCopy.uiux.db = { isOnRequest: true };
            entryToCopy.uiux.mode = { isCreate: true };

            deconstructDate( getDateInSequence( paste.date ) );
            deconstructEntry( paste.inSequence );
            activeEntry = [ entryToCopy, { ...activeEntry } ];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = { isSuspended: true } );
            constructDate();

            return constructState();

        } case 'OPEN_ENTRY_MENU': {

            deconstructState();
            const { date, inSequence } = action.payload;
            const dateInSequence = getDateInSequence( date );

            deconstructDate( dateInSequence );
            deconstructEntry( inSequence );
            activeEntry.uiux.menu = { isOpen: true };
            constructEntry();
            constructDate();

            return constructState();

        } case 'CLOSE_ENTRY_MENU': {

            deconstructState();
            const { date, inSequence } = action.payload;
            const dateInSequence = getDateInSequence( date );

            deconstructDate( dateInSequence );
            deconstructEntry( inSequence );
            activeEntry.uiux.menu = {};
            constructEntry();
            constructDate();

            return constructState();

        } case 'OPEN_ENTRY_FORM': {

            deconstructState();
            const { date, inSequence, type, mode } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.form = { isOpen: true };
            activeEntry.uiux.type = type;
            activeEntry.uiux.mode = mode;
            constructEntry();
            constructDate();

            return constructState();

        } case 'CLOSE_ENTRY_FORM': {

            deconstructState();
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.db = {};
            activeEntry.uiux.form = {};
            activeEntry.uiux.type = {};
            activeEntry.uiux.mode = {};
            constructEntry();
            constructDate();

            return constructState();

        } case 'RETRIEVE_DATES_REQUEST_DONE': {

            deconstructState();
            const { dateFrom, dateTill, dataFromDB } = action.payload;
            dataFromDB.sort( ( a, b ) => a.inSequence < b.inSequence ? -1 : a.inSequence > b.inSequence ? 1 : 0 );

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

                deconstructDate( getDateInSequence( date ) );
                activeDate.data.entries = entries;
                activeDate.uiux.db = {};
                activeDate.uiux.mode = {};
                constructDate();
            }

            return constructState();

        } case 'RETRIEVE_DATES_REQUEST_ERROR': {

            deconstructState();
            const { dateFrom, dateTill } = action.payload;

            const numDays = daysBetween( dateFrom, dateTill ) + 1;
            for ( let i = 0; i < numDays; i++ ) { 
                const date = shiftDate( dateFrom, i );
                const entries = [];
                const entry = initEntry();
                entry.uiux.status = { isSuspended: true }
                entries.push( entry );

                deconstructDate( getDateInSequence( date ) );
                activeDate.data.entries = entries;
                activeDate.uiux.db = {};
                activeDate.uiux.mode = {};
                constructDate();
            }

            return constructState();

        } case 'ENTRY_REQUEST': {

            deconstructState();
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.db = { isOnRequest: true };
            constructEntry();
            constructDate();

            return constructState();

        } case 'CREATE_ENTRY_REQUEST_DONE': {

            deconstructState();
            const { date, inSequence, dataFromDB } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.data = parseEntryFromDB( dataFromDB );
            activeEntry.uiux.db = {};
            activeEntry.uiux.mode = {};
            activeEntry.uiux.form = {};
            if ( nextEntries.length === 0 ) {
                nextEntries.push( initEntry() );
            }
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return constructState();

        } case 'CREATE_ENTRY_REQUEST_ERROR': {

            deconstructState();
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry = [];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return constructState();

        } case 'UPDATE_ENTRY_REQUEST_DONE': {

            deconstructState();
            const { date, inSequence, dataFromDB } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.data = parseEntryFromDB( dataFromDB );
            activeEntry.uiux.db = {};
            activeEntry.uiux.mode = {};
            activeEntry.uiux.form = {};
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return constructState();

        } case 'UPDATE_ENTRY_REQUEST_ERROR': {

            deconstructState();
            const { date, inSequence, saved } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            const entryToMoveBack = { ...activeEntry };
            activeEntry = [];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            deconstructDate( getDateInSequence( saved.date ) );
            deconstructEntry( saved.inSequence );
            entryToMoveBack.data = { ...saved.entry.data };
            entryToMoveBack.uiux.db = {};
            activeEntry.uiux.mode = {};
            entryToMoveBack.uiux.form = {};
            activeEntry = [ entryToMoveBack, { ...activeEntry } ];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return constructState();

        } case 'DELETE_ENTRY_REQUEST_DONE': {

            deconstructState();
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry = [];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return constructState();

        } case 'DELETE_ENTRY_REQUEST_ERROR': {

            deconstructState();
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.db = {};
            activeEntry.uiux.mode = {};
            activeEntry.uiux.form = {};
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return constructState();

        } case 'ADD_INIT_PAYMENT_GENRES': {

            deconstructState();
            paymentGenres = [ initPaymentGenre() ];
            return constructState();

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