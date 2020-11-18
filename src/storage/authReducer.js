import { initState } from '../storage/schemas';
import { parseSigninFromDB, parseSettingsFromDB } from './parsers';

const authReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_VALIDATION': {
            const signin = state.data.signin;
            signin.uiux.process = { isOnValidation: true };
            return { ...state, data: { ...state.data, signin } };

        } case 'VALIDATION_DONE': {
            const signin = state.data.signin;
            signin.uiux.process = { isOnValidationDone: true };
            return { ...state, data: { ...state.data, signin } };

        } case 'VALIDATION_ERROR': {
            const signin = state.data.signin;
            signin.uiux.process = {};
            return { ...state, data: { ...state.data, signin } };

        } case 'DO_REQUEST': {
            const signin = state.data.signin;
            signin.uiux.process = { isOnRequest: true };
            return { ...state, data: { ...state.data, signin } };

        } case 'SIGNIN_REQUEST_DONE': {
            const initialState = initState();
            const { signin, settings } = initialState.data; //state.data;
            signin.uiux.process = {};
            signin.data = parseSigninFromDB( action.payload );
            settings.data = parseSettingsFromDB( action.payload );
            localStorage.setItem( 'signin', JSON.stringify( signin.data ) );
            localStorage.setItem( 'settings', JSON.stringify( settings.data ) );
            return { ...initialState, data: { ...initialState.data, signin, settings } };

        } case 'SIGNIN_REQUEST_ERROR': {
            localStorage.removeItem( 'settings' );
            localStorage.removeItem( 'signin' );
            return { ...initState() };

        } case 'DO_SIGNOUT': {
            localStorage.removeItem( 'settings' );
            localStorage.removeItem( 'signin' );
            return { ...initState() };

        } default: {
            throw new Error();
        }
    }
}

export default authReducer;