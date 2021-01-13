import { signinSchema, settingsSchema } from '../schemas';
import { parseSigninFromDB } from './parsers';
import { parseSettingsFromDB } from '../settings/parsers';

const signinReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'SIGNIN_REQUEST': {
            const { signin } = state;
            signin._uiux.status = { isRequest: true };

            return { ...state, signin };

        } case 'SIGNIN_RESPONSE_OK': {
            const { dataFromDB } = action.payload;
            const signin = { ...signinSchema(), ...parseSigninFromDB( dataFromDB ) };
            const settings = { ...settingsSchema(), ...parseSettingsFromDB( dataFromDB ) };

            if ( ! signin.token ) {
                throw new Error( 'Τα στοιχεία εισόδου είναι λανθασμένα.' );
            }

            const signin_uiux = signin._uiux;
            const settings_uiux = settings._uiux;
            delete signin._uiux;
            delete settings._uiux;
            localStorage.setItem( 'signin', JSON.stringify( signin ) );
            localStorage.setItem( 'settings', JSON.stringify( settings ) );
            signin._uiux = signin_uiux;
            settings._uiux = settings_uiux;

            return { ...state, signin, settings };

        } case 'SIGNIN_RESPONSE_ERROR': {
            localStorage.removeItem( 'settings' );
            const settings = settingsSchema();

            localStorage.removeItem( 'signin' );
            const signin = signinSchema();

            return { ...state, signin, settings };

        } default: {
            return state;
        }
    }
}

const signoutReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'SIGNOUT_PROCESS': {
            // localStorage.removeItem( 'settings' );
            // const settings = settingsSchema();

            localStorage.removeItem( 'signin' );
            const signin = signinSchema();

            return { ...state, signin };

        } default: {
            throw new Error();
        }
    }
}

export { signinReducer, signoutReducer };
