import { paymentGenreSchema } from '../../schemas';
import { parseGenreFromDB } from './parsers';

const genresReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const genres = [ paymentGenreSchema() ];
            genres[ 0 ]._uiux.mode = { isRetrieveMany: true };
            genres[ 0 ]._uiux.process = { isRequest: true };

            const { _uiux } = state;
            _uiux.process = { isRequest: true };

            return { ...state, genres, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;

            const genres = [];
            dataFromDB.forEach( x => genres.push( { ...paymentGenreSchema(), ...parseGenreFromDB( x ) } ) );
            genres.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            genres.push( paymentGenreSchema() );

            const { _uiux } = state;
            _uiux.process = { isResponseOk: true };

            return { ...state, genres, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const genres = [ paymentGenreSchema() ];
            genres[ 0 ]._uiux.process = { isResponseError: true }

            const { _uiux } = state;
            _uiux.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, genres, _uiux };

        } case 'OPEN_FORM': {
            const { index, mode } = action.payload;
            const { genres } = state;
            genres[ index ]._uiux.form = { isOpen: true };
            genres[ index ]._uiux.mode = mode;

            return { ...state, genres };

        } case 'CLOSE_FORM': {
            const { index } = action.payload;
            const { genres } = state;
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.form = {};
            genres[ index ]._uiux.mode = {};

            return { ...state, genres };

        } case 'DO_VALIDATION': {
            const { index } = action.payload;
            const { genres } = state;
            genres[ index ]._uiux.process = { isValidation: true };

            return { ...state, genres };

        } case 'VALIDATION_OK': {
            const { index, data } = action.payload;
            const { genres } = state;
            genres[ index ] = { ...genres[ index ], ...data };
            genres[ index ]._uiux.process = { isValidationOk: true };

            return { ...state, genres };

        } case 'VALIDATION_ERROR': {
            const { index } = action.payload;
            const { genres } = state;
            genres[ index ]._uiux.process = {};

            return { ...state, genres };

        } case 'DO_REQUEST': {
            const { index } = action.payload;
            const { genres } = state;
            genres[ index ]._uiux.process = { isRequest: true };

            return { ...state, genres };

        } case 'CREATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const genres = [ ...state.genres ];
            genres[ index ] = { ...genres[ index ], ...parseGenreFromDB( dataFromDB ) };
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};
            genres.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            genres.push( paymentGenreSchema() );

            return { ...state, genres };

        } case 'CREATE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { genres } = state;
            genres[ index ] = paymentGenreSchema();

            return { ...state, genres };

        } case 'UPDATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const genres = [ ...state.genres ];
            genres[ index ] = { ...paymentGenreSchema(), ...parseGenreFromDB( dataFromDB ) };
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};
            genres.pop();
            genres.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            genres.push( paymentGenreSchema() );

            return { ...state, genres };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { index, _saved } = action.payload;
            const { genres } = state ;
            genres[ index ] = { ...genres[ index ], ..._saved };
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};

            return { ...state, genres };

        } case 'DELETE_RESPONSE_OK': {
            const { index } = action.payload;
            const genres = [ ...state.genres ];
            genres.splice( index, 1 );

            return { ...state, genres };

        } case 'DELETE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { genres } = state ;
            genres[ index ]._uiux.process = {};
            genres[ index ]._uiux.mode = {};
            genres[ index ]._uiux.form = {};

            return { ...state, genres };

        } default: {
            throw new Error();
        }
    }
}

export { genresReducer };