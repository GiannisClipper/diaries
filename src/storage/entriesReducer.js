import { initEntry } from './schemas';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../helpers/dates';
import { initNotes, initPayments } from './schemas';
import { parseNoteFromDB } from './notes/parsers';
import { parsePaymentFromDB } from './payments/parsers';

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

const entriesReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'MOVE_ENTRY': {

            dates = [ ...state.data.dates ];
            const { cut, paste } = action.payload;

            if ( cut.date + cut.inSequence !== paste.date + paste.inSequence ) {
                deconstructDate( getDateInSequence( cut.date ) );
                deconstructEntry( cut.inSequence );
                const entryToMove = { ...activeEntry };
                entryToMove.uiux.process = { isOnRequest: true };
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

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'COPY_ENTRY': {

            dates = [ ...state.data.dates ];
            const { copy, paste } = action.payload;

            deconstructDate( getDateInSequence( copy.date ) );
            deconstructEntry( copy.inSequence );
            const entryToCopy = { ...activeEntry };
            entryToCopy.uiux.process = { isOnRequest: true };
            entryToCopy.uiux.mode = { isCreate: true };

            deconstructDate( getDateInSequence( paste.date ) );
            deconstructEntry( paste.inSequence );
            activeEntry = [ entryToCopy, { ...activeEntry } ];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = { isSuspended: true } );
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'OPEN_MENU': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;
            const dateInSequence = getDateInSequence( date );

            deconstructDate( dateInSequence );
            deconstructEntry( inSequence );
            activeEntry.uiux.menu = { isOpen: true };
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'CLOSE_MENU': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;
            const dateInSequence = getDateInSequence( date );

            deconstructDate( dateInSequence );
            deconstructEntry( inSequence );
            activeEntry.uiux.menu = {};
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'OPEN_FORM': {

            dates = [ ...state.data.dates ];
            const { date, inSequence, type, mode } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.form = { isOpen: true };
            activeEntry.uiux.type = type;
            activeEntry.uiux.mode = mode;
            if ( mode.isCreate ) {
                activeEntry.data = type.isPayment
                    ? { ...activeEntry.data, ...initPayments.payment().data }
                    : { ...activeEntry.data, ...initNotes.note().data };
            }
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'CLOSE_FORM': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = {};
            activeEntry.uiux.form = {};
            activeEntry.uiux.type = {};
            activeEntry.uiux.mode = {};
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'DO_VALIDATION': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = { isOnValidation: true };
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'VALIDATION_DONE': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = { isOnValidationDone: true };
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'VALIDATION_ERROR': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = {};
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'DO_REQUEST': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = { isOnRequest: true };
            constructEntry();
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'CREATE_REQUEST_DONE': {

            dates = [ ...state.data.dates ];
            const { date, inSequence, dataFromDB } = action.payload;
            const { genres, funds } = state.data.payments;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.data = dataFromDB.type === 'payment'
                ? parsePaymentFromDB( dataFromDB, genres, funds )
                : parseNoteFromDB( dataFromDB )

            activeEntry.uiux.process = {};
            activeEntry.uiux.mode = {};
            activeEntry.uiux.form = {};
            if ( nextEntries.length === 0 ) {
                nextEntries.push( initEntry() );
            }
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'CREATE_REQUEST_ERROR': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry = [];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'UPDATE_REQUEST_DONE': {

            dates = [ ...state.data.dates ];
            const { date, inSequence, dataFromDB } = action.payload;
            const { genres, funds } = state.data.payments;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.data = dataFromDB.type === 'payment'
                ? parsePaymentFromDB( dataFromDB, genres, funds )
                : parseNoteFromDB( dataFromDB )

            activeEntry.uiux.process = {};
            activeEntry.uiux.mode = {};
            activeEntry.uiux.form = {};
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'UPDATE_REQUEST_ERROR': {

            dates = [ ...state.data.dates ];
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
            entryToMoveBack.uiux.process = {};
            activeEntry.uiux.mode = {};
            entryToMoveBack.uiux.form = {};
            activeEntry = [ entryToMoveBack, { ...activeEntry } ];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'DELETE_REQUEST_DONE': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry = [];
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'DELETE_REQUEST_ERROR': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = {};
            activeEntry.uiux.mode = {};
            activeEntry.uiux.form = {};
            constructEntry();
            activeDate.data.entries.forEach( x => x.uiux.status = {} );
            constructDate();

            return { uiux: state.uiux, data: { ...state.data, dates } };

        } case 'RETRIEVE_ALL_REQUEST_BEFORE': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );

            activeEntry.uiux.process = { isOnRequestBefore: true };
            constructEntry();
            constructDate();

            return { ...state, data: { ...state.data, dates } };

        } case 'RETRIEVE_ALL_REQUEST': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = { isOnRequest: true };
            constructEntry();
            constructDate();

            return { ...state, data: { ...state.data, dates } };

        } case 'RETRIEVE_ALL_REQUEST_AFTER': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            activeEntry.uiux.process = { isOnRequestAfter: true };
            constructEntry();
            constructDate();

            return { ...state, data: { ...state.data, dates } };

        } case 'RETRIEVE_ALL_REQUEST_DONE': {

            dates = [ ...state.data.dates ];
            const { date, inSequence, dataFromDB } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            const { dateFrom, dateTill } = activeEntry.uiux;

            dataFromDB.sort( ( a, b ) => a.inSequence < b.inSequence ? -1 : a.inSequence > b.inSequence ? 1 : 0 );
            const { genres, funds } = state.data.payments;

            const days = daysBetween( dateFrom, dateTill ) + 1;
            for ( let i = 0; i < days; i++ ) { 
                const date = shiftDate( dateFrom, i );
                const dateStr = dateToYYYYMMDD( date );
                const dateFromDB = dataFromDB.filter( x => x.date === dateStr );
                const entries = [];
                for ( const entryFromDB of dateFromDB ) {
                    const entry = initEntry();
                    entry.data = entryFromDB.type === 'payment'
                        ? parsePaymentFromDB( entryFromDB, genres, funds )
                        : parseNoteFromDB( entryFromDB )
                    entries.push( entry );
                }
                const entry = initEntry();
                entries.push( entry );

                deconstructDate( getDateInSequence( date ) );
                activeDate.data.entries = entries;
                constructDate();
            }

            return { ...state, data: { ...state.data, dates } };

        } case 'RETRIEVE_ALL_REQUEST_ERROR': {

            dates = [ ...state.data.dates ];
            const { date, inSequence } = action.payload;

            deconstructDate( getDateInSequence( date ) );
            deconstructEntry( inSequence );
            const { dateFrom, dateTill } = activeEntry.uiux;

            const days = daysBetween( dateFrom, dateTill ) + 1;
            for ( let i = 0; i < days; i++ ) { 
                const date = shiftDate( dateFrom, i );
                const entries = [];
                const entry = initEntry();
                entry.uiux.status = { isSuspended: true };
                entries.push( entry );

                deconstructDate( getDateInSequence( date ) );
                activeDate.data.entries = entries;
                activeDate.uiux.process = {};
                activeDate.uiux.mode = {};
                constructDate();
            }

            const { init } = state.uiux;
            init.error = action.payload.error;

            return { uiux: { ...state.uiux, init }, data: { ...state.data, dates } };

        } default: {
            throw new Error( action.type );
        }
    }
}

export default entriesReducer;
