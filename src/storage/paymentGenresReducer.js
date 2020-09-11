import { initPaymentGenre } from './schemas';

const paymentGenresReducer = ( data, action ) => {

    switch ( action.type ) {

        case 'INITIALIZE_LIST': {
            let paymentGenres = [ ...data.paymentGenres ];
            paymentGenres = [ initPaymentGenre() ];
            return { ...data, paymentGenres };

        } default: {
            throw new Error();
        }
    }
}

export default paymentGenresReducer;