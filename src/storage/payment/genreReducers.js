import { paymentGenreSchema } from '../schemas';
import { parseGenreFromDB } from './parsers';

const paymentGenresReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.payments.genres.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const genres = [ paymentGenreSchema() ];
            genres[ 0 ]._uiux.mode = { isRetrieveMany: true };
            genres[ 0 ]._uiux.process = { isRequest: true };

            const { payments } = state;
            payments.genres = genres;

            const { _uiux } = state;
            _uiux.payments.genres.process = { isRequest: true };

            return { ...state, payments, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.payments.genres.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;

            const genres = [];
            dataFromDB.forEach( x => genres.push( { ...paymentGenreSchema(), ...parseGenreFromDB( x ) } ) );
            genres.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            genres.push( paymentGenreSchema() );

            const { payments } = state;
            payments.genres = genres;

            const { _uiux } = state;
            _uiux.payments.genres.process = { isResponseOk: true };

            return { ...state, payments, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const genres = [ paymentGenreSchema() ];
            genres[ 0 ]._uiux.process = { isResponseError: true }

            const { payments } = state;
            payments.genres = genres;

            const { _uiux } = state;
            _uiux.payments.genres.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, payments, _uiux };

        } default: {
            throw new Error();
        }
    }
}

const paymentGenreReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { index, mode } = action.payload;
            const { payments } = state ;
            const { genres } = payments;
            genres[ index ]._uiux.form = { isOpen: true };
            genres[ index ]._uiux.mode = mode;
            payments.genres = genres;

            return { ...state, payments };

        } case 'CLOSE_FORM': {
            const { index } = action.payload;
            const { payments } = state ;
            const { genres } = payments;
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.form = {};
            genres[ index ]._uiux.mode = {};
            payments.genres = genres;

            return { ...state, payments };

        } case 'DO_VALIDATION': {
            const { index } = action.payload;
            const { payments } = state ;
            const { genres } = payments;
            genres[ index ]._uiux.process = { isValidation: true };
            payments.genres = genres;

            return { ...state, payments };

        } case 'VALIDATION_OK': {
            const { index, data } = action.payload;
            const { payments } = state ;
            const { genres } = payments;
            genres[ index ] = { ...genres[ index ], ...data };
            genres[ index ]._uiux.process = { isValidationOk: true };
            payments.genres = genres;

            return { ...state, payments };

        } case 'VALIDATION_ERROR': {
            const { index } = action.payload;
            const { payments } = state ;
            const { genres } = payments;
            genres[ index ]._uiux.process = {};
            payments.genres = genres;

            return { ...state, payments };

        } case 'DO_REQUEST': {
            const { index } = action.payload;
            const { payments } = state ;
            const { genres } = payments;
            genres[ index ]._uiux.process = { isRequest: true };
            payments.genres = genres;

            return { ...state, payments };

        } case 'CREATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const genres = [ ...state.payments.genres ];
            genres[ index ] = { ...genres[ index ], ...parseGenreFromDB( dataFromDB ) };
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};
            genres.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            genres.push( paymentGenreSchema() );
            const payments = { ...state.payments, genres };

            return { ...state, payments };

        } case 'CREATE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { payments } = state ;
            const { genres } = payments;
            genres[ index ] = paymentGenreSchema();
            payments.genres = genres;

            return { ...state, payments };

        } case 'UPDATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const genres = [ ...state.payments.genres ];
            genres[ index ] = { ...paymentGenreSchema(), ...parseGenreFromDB( dataFromDB ) };
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};
            genres.pop();
            genres.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            genres.push( paymentGenreSchema() );
            const payments = { ...state.payments, genres };

            return { ...state, payments };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { index, _saved } = action.payload;
            const { payments } = state ;
            const { genres } = payments ;
            genres[ index ] = { ...genres[ index ], ..._saved };
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};
            payments.genres = genres;

            return { ...state, payments };

        } case 'DELETE_RESPONSE_OK': {
            const { index } = action.payload;
            const genres = [ ...state.payments.genres ];
            genres.splice( index, 1 );
            const payments = { ...state.payments, genres };

            return { ...state, payments };

        } case 'DELETE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { payments } = state ;
            const { genres } = payments ;
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};
            payments.genres = genres;

            return { ...state, payments };

        } default: {
            throw new Error();
        }
    }
}

export { paymentGenresReducer, paymentGenreReducer };