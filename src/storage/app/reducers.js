import { signinReducer, signoutReducer } from '../sign/reducers';
import { settingsReducer } from '../settings/reducers';

const appReducer = ( state, action ) => {

    switch ( action.namespace ) {

        case 'signin': {
            return signinReducer( state, action );

        } case 'signout': {
            return signoutReducer( state, action );

        } case 'settings': {
            return settingsReducer( state, action );

        } default: {
            throw new Error();
        }
    }
}

export { appReducer };