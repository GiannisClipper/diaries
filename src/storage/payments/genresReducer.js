import { initPayments } from '../schemas';
import { parseGenreFromDB } from './parsers';

const genresReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'INITIALIZE_LIST': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];

            genres = [ initPayments.genre() ];
            genres[ 0 ].uiux.mode = { isRetrieveAll: true };
            genres[ 0 ].uiux.process = { isOnRequest: true };

            payments = { ...payments, genres };
            const { init } = state.uiux;
            init.payments.genres = { isBeforeRequest: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'INITIALIZE_LIST_AFTER_REQUEST': {
            const { init } = state.uiux;
            init.payments.genres = { isAfterRequest: true };

            return { uiux: { ...state.uiux, init }, data: state.data };

        } case 'RETRIEVE_ALL_REQUEST_DONE': {
            let payments = { ...state.data.payments };
            const { dataFromDB } = action.payload;

            const genres = [];
            dataFromDB.forEach( x=> {
                genres.push( initPayments.genre() );
                genres[ genres.length - 1 ].data = parseGenreFromDB( x );
            } );
            genres.sort( ( x, y ) => x.data.code - y.data.code );
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            const { init } = state.uiux;
            init.payments.genres = { isDone: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'RETRIEVE_ALL_REQUEST_ERROR': {
            let payments = { ...state.data.payments };

            const genres = [];
            const genre = initPayments.genre();
            genre.uiux.status = { isSuspended: true }
            genres.push( genre );

            payments = { ...payments, genres };
            const { init } = state.uiux;
            init.payments.genres = { isError: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'OPEN_FORM': {
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

            genres[ index ].uiux.process = { isOnValidation: true };

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'VALIDATION_DONE': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.process = { isOnValidationDone: true };

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

            genres[ index ].uiux.process = { isOnRequest: true };

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'CREATE_REQUEST_DONE': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, dataFromDB } = action.payload;

            genres[ index ].data = parseGenreFromDB( dataFromDB );
            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};
            genres.sort( ( x, y ) => x.data.code - y.data.code );
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'CREATE_REQUEST_ERROR': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ] = initPayments.genre();

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'UPDATE_REQUEST_DONE': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, dataFromDB } = action.payload;

            genres[ index ] = initPayments.genre();
            genres[ index ].data = parseGenreFromDB( dataFromDB );
            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};
            genres.pop();
            genres.sort( ( x, y ) => x.data.code - y.data.code );
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'UPDATE_REQUEST_ERROR': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index, saved } = action.payload;

            genres[ index ].data = { ...saved.genre.data };
            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_REQUEST_DONE': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres.splice( index, 1 );

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_REQUEST_ERROR': {
            let payments = { ...state.data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.process = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};

            payments = { ...payments, genres };
            return { ...state, data: { ...state.data, payments } };

        } default: {
            throw new Error();
        }
    }
}

export default genresReducer;