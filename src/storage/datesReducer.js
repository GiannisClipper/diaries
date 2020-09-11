import { initDate, initEntry } from './schemas';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../helpers/dates';
import { parseEntryFromDB } from './parsers';

let dates, prevDates, activeDate, nextDates;
let entries, prevEntries, activeEntry, nextEntries;

const getDateInSequence = date => {
    return daysBetween( dates[0].data.date, date );
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

const datesReducer = ( data, action ) => {

    const centralDate = new Date();
    centralDate.setHours( 12 );
    centralDate.setMinutes( 0 );
    centralDate.setSeconds( 0 );
    centralDate.setMilliseconds( 0 );

    const calcInitDates = ( date, num ) => {
        let startDate = shiftDate( date, -parseInt( num / 2 ) );
        let newDates = new Array( num ).fill( undefined );
        newDates = newDates.map( ( x, index ) => {
            const _ = initDate();
            _.data.date = shiftDate( startDate, index );
            _.uiux.db = { isOnRequest: true, dateFrom: startDate, dateTill: shiftDate( startDate, num - 1 ) };
            _.uiux.isTheCentral = _.data.date.getTime() === centralDate.getTime() ? true : false;
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
    
    switch ( action.type ) {

        case 'INITIALIZE_LIST': {

            dates = [ ...data.dates ];
            dates = calcInitDates( centralDate, action.payload.num );
            return { ...data, dates };

        } case 'ADD_PREV_DATES': {

            dates = [ ...data.dates ];
            const newDates = calcPrevDates( dates, action.payload.num );
            dates = [ ...newDates, ...dates ];
            return { ...data, dates };

        } case 'ADD_NEXT_DATES': {

            dates = [ ...data.dates ];
            const newDates = calcNextDates( dates, action.payload.num );
            dates = [ ...dates, ...newDates ];
            return { ...data, dates };

        // } case 'REMOVE_PREV_DATES': {

        //     dates = [ ...data.dates ];
        //     dates = dates.slice( action.payload.num );
        //     return { ...data, dates };

        // } case 'REMOVE_NEXT_DATES': {

        //     dates = [ ...data.dates ];
        //     dates = dates.slice( 0, -action.payload.num );
        //     return { ...data, dates };

        } case 'RETRIEVE_DATES_REQUEST_DONE': {

            dates = [ ...data.dates ];
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

            return { ...data, dates };

        } case 'RETRIEVE_DATES_REQUEST_ERROR': {

            dates = [ ...data.dates ];
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

            return { ...data, dates };

        } default: {
            throw new Error();
        }
    }
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

const entriesReducer = ( data, action ) => {

    switch ( action.type ) {

        case 'MOVE_ENTRY': {

            dates = [ ...data.dates ];
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

            return { ...data, dates };

        } case 'COPY_ENTRY': {

            dates = [ ...data.dates ];
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

            return { ...data, dates };

        } case 'OPEN_ENTRY_MENU': {

            dates = [ ...data.dates ];
            const { date, inSequence } = action.payload;
            const dateInSequence = getDateInSequence( date );

            deconstructDate( dateInSequence );
            deconstructEntry( inSequence );
            activeEntry.uiux.menu = { isOpen: true };
            constructEntry();
            constructDate();

            return { ...data, dates };

        } case 'CLOSE_MENU': {

            dates = [ ...data.dates ];
            const { date, inSequence } = action.payload;
            const dateInSequence = getDateInSequence( date );

            deconstructDate( dateInSequence );
            deconstructEntry( inSequence );
            activeEntry.uiux.menu = {};
            constructEntry();
            constructDate();

            return { ...data, dates };

        } case 'OPEN_FORM': {

            dates = [ ...data.dates ];
            const { date, inSequence, type, mode } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.form = { isOpen: true };
            activeEntry.uiux.type = type;
            activeEntry.uiux.mode = mode;
            constructEntry();
            constructDate();

            return { ...data, dates };

        } case 'CLOSE_FORM': {

            dates = [ ...data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.db = {};
            activeEntry.uiux.form = {};
            activeEntry.uiux.type = {};
            activeEntry.uiux.mode = {};
            constructEntry();
            constructDate();

            return { ...data, dates };

        } case 'REQUEST': {

            dates = [ ...data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.db = { isOnRequest: true };
            constructEntry();
            constructDate();

            return { ...data, dates };

        } case 'CREATE_REQUEST_DONE': {

            dates = [ ...data.dates ];
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

            return { ...data, dates };

        } case 'CREATE_REQUEST_ERROR': {

            dates = [ ...data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry = [];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { ...data, dates };

        } case 'UPDATE_REQUEST_DONE': {

            dates = [ ...data.dates ];
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

            return { ...data, dates };

        } case 'UPDATE_REQUEST_ERROR': {

            dates = [ ...data.dates ];
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

            return { ...data, dates };

        } case 'DELETE_REQUEST_DONE': {

            dates = [ ...data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry = [];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { ...data, dates };

        } case 'DELETE_REQUEST_ERROR': {

            dates = [ ...data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.db = {};
            activeEntry.uiux.mode = {};
            activeEntry.uiux.form = {};
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { ...data, dates };

        } default: {
            throw new Error();
    }
    }
}

export { datesReducer, entriesReducer };