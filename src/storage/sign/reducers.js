import { appSchema, signinSchema, settingsSchema } from '../schemas';
import { parseSigninFromDB } from './parsers';
import { parseSettingsFromDB } from '../settings/parsers';

const signinReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_REQUEST': {
            const { signin } = state;
            signin._uiux.process = { isRequest: true };
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

            return { ...appSchema(), signin, settings };

        } case 'SIGNIN_RESPONSE_ERROR': {
            localStorage.removeItem( 'settings' );
            localStorage.removeItem( 'signin' );
            return { ...appSchema() };

        } default: {
            return state;
        }
    }
}

const signoutReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_SIGNOUT': {
            localStorage.removeItem( 'settings' );
            localStorage.removeItem( 'signin' );
            return { ...appSchema() };

        } default: {
            throw new Error();
        }
    }
}

export { signinReducer, signoutReducer };
