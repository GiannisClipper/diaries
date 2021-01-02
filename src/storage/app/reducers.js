import { comboReducer, formReducer, validationReducer } from '../core/reducers';
import { signinReducer, signoutReducer } from '../sign/reducers';
import { settingsReducer } from '../settings/reducers';

const appReducer = ( state, action ) => {

    switch ( action.namespace ) {

        case 'signin': {
            return comboReducer( validationReducer, signinReducer )( state, action );

        } case 'signout': {
            return signoutReducer( state, action );

        } case 'settings': {
            return comboReducer( formReducer, validationReducer, settingsReducer )( state, action );

        } default: {
            throw new Error();
        }
    }
}

export { appReducer };