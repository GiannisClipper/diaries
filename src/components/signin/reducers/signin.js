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
            const settings = { ...settingsSchema(), ...parseSettingsFromDB( dataFromDB ) };

            if ( ! signin.token ) {
                throw new Error( 'Τα στοιχεία εισόδου είναι λανθασμένα.' );
            }

            localStorage.setItem( 'signin', JSON.stringify( parseSigninFromDB( signin ) ) );
            localStorage.setItem( 'settings', JSON.stringify( parseSettingsFromDB( settings ) ) );

            return { ...state, signin, settings };

        } case SIGNIN_RESPONSE_ERROR: {
            localStorage.removeItem( 'settings' );
            const settings = settingsSchema();

            localStorage.removeItem( 'signin' );
            const signin = signinSchema();

            return { ...state, signin, settings };

        } case SIGNOUT: {
            // localStorage.removeItem( 'settings' );
            // const settings = settingsSchema();

            localStorage.removeItem( 'signin' );
            const signin = signinSchema();

            return { ...state, signin };

        } default: {
            return state;
        }
    }
}

export { signinReducer };
