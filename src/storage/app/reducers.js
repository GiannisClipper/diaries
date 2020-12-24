import { usersReducer, userReducer } from '../user/reducers';
import { paymentGenresReducer, paymentGenreReducer } from '../payment/genreReducers';
import { paymentFundsReducer, paymentFundReducer } from '../payment/fundReducers';

const appReducer = ( state, action ) => {

    switch ( action.namespace ) {

        case 'users': {
            return usersReducer( state, action );

        } case 'user': {
            return userReducer( state, action );

        } case 'paymentGenres': {
            return paymentGenresReducer( state, action );

        } case 'paymentGenre': {
            return paymentGenreReducer( state, action );

        } case 'paymentFunds': {
            return paymentFundsReducer( state, action );

        } case 'paymentFund': {
            return paymentFundReducer( state, action );

        } default: {
            throw new Error();
        }
    }
}

export { appReducer };