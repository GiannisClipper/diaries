import comboReducer from '../../helpers/comboReducer';
import { oneFormReducer, oneValidationReducer, oneRequestReducer } from '../core/oneReducers';
import { signinReducer, signoutReducer } from '../sign/reducers';
import { settingsReducer } from '../settings/reducers';

const appReducer = ( state, action ) => {

    switch ( action.namespace ) {

        case 'signin': {
            return comboReducer( oneValidationReducer, signinReducer )( state, action );

        } case 'signout': {
            return signoutReducer( state, action );

        } case 'settings': {
            return comboReducer( oneFormReducer, oneValidationReducer, settingsReducer, oneRequestReducer )( state, action );

        } default: {
            throw new Error();
        }
    }
}

export { appReducer };