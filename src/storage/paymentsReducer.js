import { initPayments } from './schemas';

const paymentsReducer = ( data, action ) => {

    switch ( action.type ) {

        case 'INITIALIZE_GENRE_LIST': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            genres = [ initPayments.genre() ];
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

        } default: {
            throw new Error();
        }
    }
}

export default paymentsReducer;