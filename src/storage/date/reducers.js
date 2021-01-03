import { entrySchema, noteSchema, paymentSchema } from '../schemas';
import { parseNoteFromDB } from '../note/parsers';
import { parsePaymentFromDB } from '../payment/parsers';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../../helpers/dates'; 

const datesReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { dates, _uiux } = state;
            dates.forEach( x => x._uiux.process = { isRequestBefore: true } );
            _uiux.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const { dates, _uiux } = state;
            dates.forEach( x => x._uiux.mode = { isRetrieveMany: true } );
            dates.forEach( x => x._uiux.process = { isRequest: true } );
            _uiux.mode = { isRetrieveMany: true };
            _uiux.process = { isRequest: true };

            return { ...state, dates, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { dates, _uiux } = state;
            dates.forEach( x => x._uiux.process = { isResponseWaiting: true } );
            _uiux.process = { isResponseWaiting: true };

            return { ...state, dates, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;
            const { dates, _uiux } = state;
            dates.forEach( x => x._uiux.process = { isResponseOk: true } );
            _uiux.process = { isResponseOk: true };

            return { ...state, dates, _uiux, dataFromDB };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { dates, _uiux } = state;
            dates.forEach( x => x._uiux.process = { isResponseError: true } );
            _uiux.process = { isResponseError: true };

            //_uiux._error = action.payload.error;

            return { ...state, dates, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_AFTER': {

            const { genres, funds } = action.payload;

            if ( genres && funds ) {
                const { dates, _uiux, dataFromDB } = state;

                dataFromDB.sort( ( a, b ) => a.inSequence < b.inSequence ? -1 : a.inSequence > b.inSequence ? 1 : 0 );

                const dateFrom = dates[ 0 ].date;
                const dateTill = dates[ dates.length - 1 ].date;
                const days = daysBetween( dateFrom, dateTill ) + 1;

                for ( let i = 0; i < days; i++ ) { 
                    const date = shiftDate( dateFrom, i );
                    const dateStr = dateToYYYYMMDD( date );
                    const dateFromDB = dataFromDB.filter( x => x.date === dateStr );
                    const entries = [];

                    for ( const entryFromDB of dateFromDB ) {
                        const entry = entryFromDB.type === 'payment'
                            ? parsePaymentFromDB( entryFromDB, genres, funds )
                            : parseNoteFromDB( entryFromDB )
                        entries.push( { ...entrySchema(), ...entry } );
                    }
                    entries.push( entrySchema() );
                    dates[ i ].entries = entries;
                }
                _uiux.process = {};

                return { ...state, dates, _uiux, dataFromDB: null };
            }

            return state;

        } default: {
            throw new Error();
        }
    }
}

const dateReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_MENU': {
            const { entries } = state;
            const { inSequence } = action.payload;
            entries[ inSequence ]._uiux.menu = { isOpen: true };

            return { ...state, entries };

        } case 'CLOSE_MENU': {
            const { entries } = state;
            const { inSequence } = action.payload;
            entries[ inSequence ]._uiux.menu = {};

            return { ...state, entries };

        } case 'OPEN_FORM': {
            const { entries } = state;
            const { inSequence, type, mode } = action.payload;
            entries[ inSequence ]._uiux.form = { isOpen: true };
            entries[ inSequence ]._uiux.type = type;
            entries[ inSequence ]._uiux.mode = mode;

            if ( mode.isCreate ) {
                const { _uiux } = entries[ inSequence ];
                entries[ inSequence ] = type.isPayment
                    ? { ...paymentSchema(), _uiux }
                    : { ...noteSchema(), _uiux };
                }

            entries[ inSequence ]._saved = { ...entries[ inSequence ] };
            delete entries[ inSequence ]._saved._uiux;

            return { ...state, entries };

        } case 'CLOSE_FORM': {
            const { entries } = state;
            const { inSequence } = action.payload;
            entries[ inSequence ]._uiux.process = {};
            entries[ inSequence ]._uiux.form = {};
            entries[ inSequence ]._uiux.type = {};
            entries[ inSequence ]._uiux.mode = {};

            delete entries[ inSequence ]._saved;

            return { ...state, entries };

        } case 'DO_VALIDATION': {
            const { entries } = state;
            const { inSequence } = action.payload;
            entries[ inSequence ]._uiux.process = { isValidation: true };

            return { ...state, entries };

        } case 'VALIDATION_OK': {
            const { entries } = state;
            const { inSequence, data } = action.payload;
            const { _uiux } = entries[ inSequence ];
            _uiux.process = { isValidationOk: true };
            entries[ inSequence ] = { ...data, _uiux };

            return { ...state, entries };

        } case 'VALIDATION_ERROR': {
            const { entries } = state;
            const { inSequence } = action.payload;
            entries[ inSequence ]._uiux.process = {};

            return { ...state, entries };

        } case 'DO_REQUEST': {
            const { entries } = state;
            const { inSequence } = action.payload;
            entries[ inSequence ]._uiux.process = { isRequest: true };

            return { ...state, entries };

        } case 'CREATE_RESPONSE_OK': {
            const entries = [ ...state.entries ];
            const { inSequence, genres, funds, dataFromDB } = action.payload;
            const { _uiux } = entries[ inSequence ];
            _uiux.mode = {};
            _uiux.form = {};

            entries[ inSequence ] = dataFromDB.type === 'payment'
                ? { ...parsePaymentFromDB( dataFromDB, genres, funds ), _uiux }
                : { ...parseNoteFromDB( dataFromDB ), _uiux };

            if ( inSequence === entries.length - 1 ) {
                entries.push( entrySchema() );
            }

            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'CREATE_RESPONSE_ERROR': {
            const { entries } = state;
            const { inSequence } = action.payload;
            const { _uiux } = entries[ inSequence ];
            entries[ inSequence ] = { ...entrySchema(), _uiux };
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'UPDATE_RESPONSE_OK': {
            const entries = [ ...state.entries ];
            const { inSequence, genres, funds, dataFromDB } = action.payload;
            const { _uiux } = entries[ inSequence ];
            _uiux.mode = {};
            _uiux.form = {};

            entries[ inSequence ] = dataFromDB.type === 'payment'
                ? { ...parsePaymentFromDB( dataFromDB, genres, funds ), _uiux }
                : { ...parseNoteFromDB( dataFromDB ), _uiux };

            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { entries } = state;
            const { inSequence } = action.payload;
            const { _uiux, _saved } = entries[ inSequence ];
            entries[ inSequence ] = { ..._saved, _uiux };
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'DELETE_RESPONSE_OK': {
            const entries = [ ...state.entries ];
            const { inSequence } = action.payload;
            entries.splice( inSequence, 1 );
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'DELETE_RESPONSE_ERROR': {
            const { entries } = state;
            const { inSequence } = action.payload;
            entries[ inSequence ]._uiux.mode = {};
            entries[ inSequence ]._uiux.form = {};
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } default: {
            throw new Error();
        }
    }
}

export { datesReducer, dateReducer };
