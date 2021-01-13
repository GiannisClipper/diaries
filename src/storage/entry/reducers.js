import { entrySchema, noteSchema, paymentSchema } from '../schemas';
import { parseNoteFromDB } from '../note/parsers';
import { parsePaymentFromDB } from '../payment/parsers';

const entriesReducer = ( state, action ) => {

    switch ( action.type ) {

        // case 'OPEN_FORM': {
        //     const { entries } = state;
        //     const { index, type, mode } = action.payload;
        //     entries[ index ]._uiux.form = { isOpen: true };
        //     entries[ index ]._uiux.type = type;
        //     entries[ index ]._uiux.mode = mode;

        //     if ( mode.isCreate ) {
        //         const { _uiux } = entries[ index ];
        //         entries[ index ] = type.isPayment
        //             ? { ...paymentSchema(), _uiux }
        //             : { ...noteSchema(), _uiux };
        //         }

        //     entries[ index ]._saved = { ...entries[ index ] };
        //     delete entries[ index ]._saved._uiux;

        //     return { ...state, entries };

        // } case 'CLOSE_FORM': {
        //     const { entries } = state;
        //     const { index } = action.payload;
        //     entries[ index ]._uiux.status = {};
        //     entries[ index ]._uiux.form = {};
        //     entries[ index ]._uiux.type = {};
        //     entries[ index ]._uiux.mode = {};

        //     delete entries[ index ]._saved;

        //     return { ...state, entries };

        // } case 'DO_REQUEST': {
        //     const { entries } = state;
        //     const { index } = action.payload;
        //     entries[ index ]._uiux.status = { isRequest: true };

        //     return { ...state, entries };

        // } case 'CREATE_RESPONSE_OK': {
        //     const entries = [ ...state.entries ];
        //     const { index, genres, funds, dataFromDB } = action.payload;
        //     const { _uiux } = entries[ index ];
        //     _uiux.mode = {};
        //     _uiux.form = {};

        //     dataFromDB.genres = genres;
        //     dataFromDB.funds = funds;

        //     entries[ index ] = dataFromDB.type === 'payment'
        //         ? { ...parsePaymentFromDB( dataFromDB ), _uiux }
        //         : { ...parseNoteFromDB( dataFromDB ), _uiux };

        //     if ( index === entries.length - 1 ) {
        //         entries.push( entrySchema() );
        //     }

        //     entries.forEach( x => x._uiux.status = {} );

        //     return { ...state, entries };

        // } case 'CREATE_RESPONSE_ERROR': {
        //     const { entries } = state;
        //     const { index } = action.payload;
        //     const { _uiux } = entries[ index ];
        //     entries[ index ] = { ...entrySchema(), _uiux };
        //     entries.forEach( x => x._uiux.status = {} );

        //     return { ...state, entries };

        // } case 'UPDATE_RESPONSE_OK': {
        //     const entries = [ ...state.entries ];
        //     const { index, genres, funds, dataFromDB } = action.payload;
        //     const { _uiux } = entries[ index ];
        //     _uiux.mode = {};
        //     _uiux.form = {};

        //     dataFromDB.genres = genres;
        //     dataFromDB.funds = funds;

        //     entries[ index ] = dataFromDB.type === 'payment'
        //         ? { ...parsePaymentFromDB( dataFromDB ), _uiux }
        //         : { ...parseNoteFromDB( dataFromDB ), _uiux };

        //     entries.forEach( x => x._uiux.status = {} );

        //     return { ...state, entries };

        // } case 'UPDATE_RESPONSE_ERROR': {
        //     const { entries } = state;
        //     const { index } = action.payload;
        //     const { _uiux, _saved } = entries[ index ];
        //     entries[ index ] = { ..._saved, _uiux };
        //     entries.forEach( x => x._uiux.status = {} );

        //     return { ...state, entries };

        // } case 'DELETE_RESPONSE_OK': {
        //     const entries = [ ...state.entries ];
        //     const { index } = action.payload;
        //     entries.splice( index, 1 );
        //     entries.forEach( x => x._uiux.status = {} );

        //     return { ...state, entries };

        // } case 'DELETE_RESPONSE_ERROR': {
        //     const { entries } = state;
        //     const { index } = action.payload;
        //     entries[ index ]._uiux.mode = {};
        //     entries[ index ]._uiux.form = {};
        //     entries.forEach( x => x._uiux.status = {} );

        //     return { ...state, entries };

        // } 
        case 'RETRIEVE_MANY_RESPONSE_OK_AFTER': {
            const { schema, parseFromDB, sort } = action.payload;
            let _uiux = { ...state._uiux };
            const { dataFromDB, genres, funds } = _uiux;
            dataFromDB.sort( sort );

            const entries = [];
            for ( const entryFromDB of dataFromDB ) {
                entryFromDB.genres = genres;
                entryFromDB.funds = funds;
                const entry = parseFromDB( entryFromDB );
                entries.push( { ...schema(), ...entry } );
            }
            entries.push( schema() );

            _uiux.status = { isResponseOkAfter: true };
            // delete _uiux.dataFromDB;
            // delete _uiux.genres;
            // delete _uiux.funds;

            return { ...state, entries, _uiux };

        } default: {
            return undefined;
        }
    }
}

export { entriesReducer };
