import { initPayments } from '../schemas';
import { parseGenreFromDB } from './parsers';

const genresReducer = ( data, action ) => {

    switch ( action.type ) {

        case 'INITIALIZE_LIST': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];

            genres = [ initPayments.genre() ];
            genres[ 0 ].uiux.mode = { isRetrieveAll: true };
            genres[ 0 ].uiux.db = { isOnRequest: true };

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'RETRIEVE_ALL_REQUEST_DONE': {
            let payments = { ...data.payments };
            const { dataFromDB } = action.payload;

            const genres = [];
            dataFromDB.forEach( x=> {
                genres.push( initPayments.genre() );
                genres[ genres.length - 1 ].data = parseGenreFromDB( x );
            } );
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'RETRIEVE_ALL_REQUEST_ERROR': {
            let payments = { ...data.payments };

            const genres = [];
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'OPEN_FORM': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index, mode } = action.payload;

            genres[ index ].uiux.form = { isOpen: true };
            genres[ index ].uiux.mode = mode;

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'CLOSE_FORM': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.db = {};
            genres[ index ].uiux.form = {};
            genres[ index ].uiux.mode = {};

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'DO_REQUEST': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.db = { isOnRequest: true };

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'CREATE_REQUEST_DONE': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index, dataFromDB } = action.payload;

            genres[ index ].data = parseGenreFromDB( dataFromDB );
            genres[ index ].uiux.db = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};
            genres.push( initPayments.genre() );

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'CREATE_REQUEST_ERROR': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ] = initPayments.genre();

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'UPDATE_REQUEST_DONE': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index, dataFromDB } = action.payload;

            genres[ index ] = initPayments.genre();

            genres[ index ].data = parseGenreFromDB( dataFromDB );
            genres[ index ].uiux.db = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'UPDATE_REQUEST_ERROR': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index, saved } = action.payload;

            genres[ index ].data = { ...saved.genre.data };
            genres[ index ].uiux.db = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'DELETE_REQUEST_DONE': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres.splice( index, 1 );

            payments = { ...payments, genres };
            return { ...data, payments };

        } case 'DELETE_REQUEST_ERROR': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            const { index } = action.payload;

            genres[ index ].uiux.db = {};
            genres[ index ].uiux.mode = {};
            genres[ index ].uiux.form = {};

            payments = { ...payments, genres };
            return { ...data, payments };

        } default: {
            throw new Error();
        }
    }
}

export default genresReducer;