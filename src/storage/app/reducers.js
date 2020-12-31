import { signinReducer, signoutReducer } from '../sign/reducers';
import { settingsReducer } from '../settings/reducers';
import { paymentGenresReducer, paymentGenreReducer } from '../payment/genreReducers';
import { paymentFundsReducer, paymentFundReducer } from '../payment/fundReducers';

const appReducer = ( state, action ) => {

    switch ( action.namespace ) {

        case 'signin': {
            return signinReducer( state, action );

        } case 'signout': {
            return signoutReducer( state, action );

        } case 'settings': {
            return settingsReducer( state, action );

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