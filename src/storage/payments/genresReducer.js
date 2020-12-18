import { initPayments } from '../schemas';
import { parseGenreFromDB } from './parsers';

const genresReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, mode } = action.payload;

            genres[ index ].uiux.form = { isOpen: true };
            genres[ index ].uiux.mode = mode;

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'CLOSE_FORM': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.process = {};
            genres[ index ].uiux.form = {};
            genres[ index ].uiux.mode = {};

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'DO_VALIDATION': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.process = { isValidation: true };

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'VALIDATION_OK': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, data } = action.payload;

            genres[ index ].uiux.process = { isValidationOk: true };
            genres[ index ].data = { ...data };

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'VALIDATION_ERROR': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.process = {};

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'DO_REQUEST': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.process = { isRequest: true };

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'CREATE_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, dataFromDB } = action.payload;

            genres[ index ].data = parseGenreFromDB( dataFromDB );
            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};
            genres.sort( ( x, y ) => x.data.code > y.data.code );
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'CREATE_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ] = initPayments.genre();

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'UPDATE_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, dataFromDB } = action.payload;

            genres[ index ] = initPayments.genre();
            genres[ index ].data = parseGenreFromDB( dataFromDB );
            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};
            genres.pop();
            genres.sort( ( x, y ) => x.data.code > y.data.code );
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'UPDATE_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, _saved } = action.payload;

            genres[ index ].data = { ..._saved };
            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres.splice( index, 1 );

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { init } = state.uiux;
            init.payments.genres.process = { isRequestBefore: true };

            return { uiux: { ...state.uiux, init }, data: state.data };

        } case 'RETRIEVE_MANY_REQUEST': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];

            genres = [ initPayments.genre() ];
            genres[ 0 ].uiux.mode = { isRetrieveMany: true };
            genres[ 0 ].uiux.process = { isRequest: true };

            payments = { ...payments, genres };
            const { init } = state.uiux;
            init.payments.genres.process = { isRequest: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { init } = state.uiux;
            init.payments.genres.process = { isResponseWaiting: true };

            return { uiux: { ...state.uiux, init }, data: state.data };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            const { dataFromDB } = action.payload;

            const genres = [];
            dataFromDB.forEach( x=> {
                genres.push( initPayments.genre() );
                genres[ genres.length - 1 ].data = parseGenreFromDB( x );
            } );
            genres.sort( ( x, y ) => x.data.code > y.data.code ? 1 : -1 );
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            const { init } = state.uiux;
            init.payments.genres.process = { isResponseOk: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };

            const genres = [];
            const genre = initPayments.genre();
            genre.uiux.status = { isSuspended: true }
            genres.push( genre );

            payments = { ...payments, genres };
            const { init } = state.uiux;
            init.payments.genres.process = { isResponseError: true };
            init.error = action.payload.error;

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } default: {
            throw new Error();
        }
    }
}

export default genresReducer;