import { 
    SIGNIN_REQUEST,
    SIGNIN_RESPONSE_OK,
    SIGNIN_RESPONSE_ERROR,
    SIGNOUT,
} from '../../core/assets/types/signin';

import { signinSchema } from '../assets/schemas';
import { parseSigninFromDB } from '../assets/parsers';

import { settingsSchema } from '../../settings/assets/schemas';
import { parseSettingsFromDB } from '../../settings/assets/parsers';

const signinReducer = ( state, action ) => {

    switch ( action.type ) {

        case SIGNIN_REQUEST: {
            const { signin } = state;
            signin._uiux.status = { isRequest: true };

            return { ...state, signin };

        } case SIGNIN_RESPONSE_OK: {
            const { dataFromDB } = action.payload;

            const signin = { ...signinSchema(), ...parseSigninFromDB( dataFromDB ) };
            localStorage.setItem( 'signin', JSON.stringify( parseSigninFromDB( signin ) ) );

            const settings = { ...settingsSchema(), ...parseSettingsFromDB( dataFromDB ) };
            localStorage.setItem( 'settings', JSON.stringify( parseSettingsFromDB( settings ) ) );

            return { ...state, signin, settings };

        } case SIGNIN_RESPONSE_ERROR: {
            const { error } = action.payload;

            const settings = settingsSchema();
            localStorage.removeItem( 'settings' );

            const signin = signinSchema();
            localStorage.removeItem( 'signin' );

            signin._uiux.status = { isResponseError: true };
            signin._uiux.error = error;

            return { ...state, signin, settings };

        } case SIGNOUT: {
            // not remove settings (theme, language) from localstorage
            // due to be available on signin

            const signin = signinSchema();
            localStorage.removeItem( 'signin' );

            return { ...state, signin };

        } default: {
            return state;
        }
    }
}

export { signinReducer };
