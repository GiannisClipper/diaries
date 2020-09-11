import { initPayments } from './schemas';

const paymentsReducer = ( data, action ) => {

    switch ( action.type ) {

        case 'INITIALIZE_GENRE_LIST': {
            let payments = { ...data.payments };
            let genres = [ ...payments.genres ];
            genres = [ initPayments.genre() ];
            payments = { ...payments, genres };
            return { ...data, payments };

        } default: {
            throw new Error();
        }
    }
}

export default paymentsReducer;