import { entrySchema, noteSchema, paymentSchema } from '../schemas';
import { parseNoteFromDB } from '../note/parsers';
import { parsePaymentFromDB } from '../payment/parsers';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../../helpers/dates'; 

const datesReducer = ( state, action ) => {

    switch ( action.type ) {

        // case 'RETRIEVE_MANY_REQUEST_BEFORE': {
        //     const { dates, _uiux } = state;
        //     dates.forEach( x => x._uiux.process = { isRequestBefore: true } );
        //     _uiux.process = { isRequestBefore: true };

        //     return { ...state, _uiux };

        // } case 'RETRIEVE_MANY_REQUEST': {
        //     const { dates, _uiux } = state;
        //     dates.forEach( x => x._uiux.mode = { isRetrieveMany: true } );
        //     dates.forEach( x => x._uiux.process = { isRequest: true } );
        //     _uiux.mode = { isRetrieveMany: true };
        //     _uiux.process = { isRequest: true };

        //     return { ...state, dates, _uiux };

        // } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
        //     const { dates, _uiux } = state;
        //     dates.forEach( x => x._uiux.process = { isResponseWaiting: true } );
        //     _uiux.process = { isResponseWaiting: true };

        //     return { ...state, dates, _uiux };

        case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;
            const { dates, _uiux } = state;
            dates.forEach( x => x._uiux.process = { isResponseOk: true } );
            _uiux.process = { isResponseOk: true };

            return { ...state, dates, _uiux, dataFromDB };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { dates, _uiux } = state;
            dates.forEach( date => { 
                date._uiux.process = { isResponseError: true };
                date.entries.forEach( entry => entry._uiux.process = { isResponseError: true } );
            } );
            _uiux.process = { isResponseError: true };

            //_uiux._error = action.payload.error;

            return { ...state, dates, _uiux };

         } case 'RETRIEVE_MANY_RESPONSE_OK_AFTER': {

            const { genres, funds } = action.payload;

            if ( genres && funds ) {
                const { dates, _uiux, dataFromDB } = state;

                dataFromDB.sort( ( a, b ) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0 );

                const dateFrom = dates[ 0 ].date;
                const dateTill = dates[ dates.length - 1 ].date;
                const days = daysBetween( dateFrom, dateTill ) + 1;

                for ( let i = 0; i < days; i++ ) { 
                    const date = shiftDate( dateFrom, i );
                    const dateStr = dateToYYYYMMDD( date );
                    const dateFromDB = dataFromDB.filter( x => x.date === dateStr );
                    const entries = [];

                    for ( const entryFromDB of dateFromDB ) {

                        entryFromDB.genres = genres;
                        entryFromDB.funds = funds;

                        const entry = entryFromDB.type === 'payment'
                            ? parsePaymentFromDB( entryFromDB )
                            : parseNoteFromDB( entryFromDB )
                        entries.push( { ...entrySchema(), ...entry } );
                    }
                    entries.push( entrySchema() );
                    dates[ i ].entries = entries;
                }
                _uiux.process = { isResponseOkAfter: true };

                return { ...state, dates, _uiux, dataFromDB: null };
            }

            return state;

        } case 'RETRIEVE_MANY_RESPONSE_ERROR_AFTER': {
            const { dates, _uiux } = state;
            dates.forEach( date => { 
                date._uiux.process = { isResponseErrorAfter: true };
                date.entries.forEach( entry => entry._uiux.process = { isResponseErrorAfter: true } );
            } );
            _uiux.process = { isResponseError: true };

            //_uiux._error = action.payload.error;

            return { ...state, dates, _uiux };

        } default: {
            return undefined;
        }
    }
}

const dateReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { entries } = state;
            const { index, type, mode } = action.payload;
            entries[ index ]._uiux.form = { isOpen: true };
            entries[ index ]._uiux.type = type;
            entries[ index ]._uiux.mode = mode;

            if ( mode.isCreate ) {
                const { _uiux } = entries[ index ];
                entries[ index ] = type.isPayment
                    ? { ...paymentSchema(), _uiux }
                    : { ...noteSchema(), _uiux };
                }

            entries[ index ]._saved = { ...entries[ index ] };
            delete entries[ index ]._saved._uiux;

            return { ...state, entries };

        } case 'CLOSE_FORM': {
            const { entries } = state;
            const { index } = action.payload;
            entries[ index ]._uiux.process = {};
            entries[ index ]._uiux.form = {};
            entries[ index ]._uiux.type = {};
            entries[ index ]._uiux.mode = {};

            delete entries[ index ]._saved;

            return { ...state, entries };

        } case 'DO_REQUEST': {
            const { entries } = state;
            const { index } = action.payload;
            entries[ index ]._uiux.process = { isRequest: true };

            return { ...state, entries };

        } case 'CREATE_RESPONSE_OK': {
            const entries = [ ...state.entries ];
            const { index, genres, funds, dataFromDB } = action.payload;
            const { _uiux } = entries[ index ];
            _uiux.mode = {};
            _uiux.form = {};

            dataFromDB.genres = genres;
            dataFromDB.funds = funds;

            entries[ index ] = dataFromDB.type === 'payment'
                ? { ...parsePaymentFromDB( dataFromDB ), _uiux }
                : { ...parseNoteFromDB( dataFromDB ), _uiux };

            if ( index === entries.length - 1 ) {
                entries.push( entrySchema() );
            }

            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'CREATE_RESPONSE_ERROR': {
            const { entries } = state;
            const { index } = action.payload;
            const { _uiux } = entries[ index ];
            entries[ index ] = { ...entrySchema(), _uiux };
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'UPDATE_RESPONSE_OK': {
            const entries = [ ...state.entries ];
            const { index, genres, funds, dataFromDB } = action.payload;
            const { _uiux } = entries[ index ];
            _uiux.mode = {};
            _uiux.form = {};

            dataFromDB.genres = genres;
            dataFromDB.funds = funds;

            entries[ index ] = dataFromDB.type === 'payment'
                ? { ...parsePaymentFromDB( dataFromDB ), _uiux }
                : { ...parseNoteFromDB( dataFromDB ), _uiux };

            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { entries } = state;
            const { index } = action.payload;
            const { _uiux, _saved } = entries[ index ];
            entries[ index ] = { ..._saved, _uiux };
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'DELETE_RESPONSE_OK': {
            const entries = [ ...state.entries ];
            const { index } = action.payload;
            entries.splice( index, 1 );
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } case 'DELETE_RESPONSE_ERROR': {
            const { entries } = state;
            const { index } = action.payload;
            entries[ index ]._uiux.mode = {};
            entries[ index ]._uiux.form = {};
            entries.forEach( x => x._uiux.process = {} );

            return { ...state, entries };

        } default: {
            return undefined;
        }
    }
}

export { datesReducer, dateReducer };
