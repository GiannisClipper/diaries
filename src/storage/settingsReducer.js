import { parseSettingsFromDB } from './parsers';

const settingsReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            let settings = { ...state.data.settings };
            const { mode } = action.payload;

            settings.uiux.form = { isOpen: true };
            settings.uiux.mode = mode;

            return { ...state, data: { ...state.data, settings } };

        } case 'CLOSE_FORM': {
            let settings = { ...state.data.settings };

            settings.uiux.process = {};
            settings.uiux.form = {};
            settings.uiux.mode = {};

            return { ...state, data: { ...state.data, settings } };

        } case 'DO_VALIDATION': {
            let settings = { ...state.data.settings };

            settings.uiux.process = { isValidation: true };

            return { ...state, data: { ...state.data, settings } };

        } case 'VALIDATION_OK': {
            let settings = { ...state.data.settings };

            settings.uiux.process = { isValidationOk: true };

            return { ...state, data: { ...state.data, settings } };

        } case 'VALIDATION_ERROR': {
            let settings = { ...state.data.settings };

            settings.uiux.process = {};

            return { ...state, data: { ...state.data, settings } };

        } case 'DO_REQUEST': {
            let settings = { ...state.data.settings };

            settings.uiux.process = { isRequest: true };

            return { ...state, data: { ...state.data, settings } };

        } case 'UPDATE_RESPONSE_OK': {
            let settings = { ...state.data.settings };
            const { dataFromDB } = action.payload;

            settings.data = { ...parseSettingsFromDB( dataFromDB ) };
            settings.uiux.process = {};
            settings.uiux.mode = {};
            settings.uiux.form = {};

            localStorage.setItem( 'settings', JSON.stringify( settings.data ) );
            return { ...state, data: { ...state.data, settings } };

        } case 'UPDATE_RESPONSE_ERROR': {
            let settings = { ...state.data.settings };
            const { saved } = action.payload;

            settings.data = { ...saved.data };
            settings.uiux.process = {};
            settings.uiux.mode = {};
            settings.uiux.form = {};

            return { ...state, data: { ...state.data, settings } };

        } default: {
            throw new Error();
        }
    }
}

export default settingsReducer;