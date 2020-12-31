import { parseSettingsFromDB } from './parsers';

const settingsReducer = ( state, action ) => {

    console.log( 'action.type', action.type)

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { settings } = state ;
            settings._uiux.form = { isOpen: true };
            settings._uiux.mode = { isUpdate: true };

            return { ...state, settings };

        } case 'CLOSE_FORM': {
            const { settings } = state ;
            settings._uiux.process = {};
            settings._uiux.form = {};

            return { ...state, settings };

        } case 'DO_VALIDATION': {
            const { settings } = state ;
            settings._uiux.process = { isValidation: true };

            return { ...state, settings };

        } case 'VALIDATION_OK': {
            const { data } = action.payload;
            const settings = { ...state.settings, ...data };
            settings._uiux.process = { isValidationOk: true };

            return { ...state, settings };

        } case 'VALIDATION_ERROR': {
            const { settings } = state ;
            settings._uiux.process = {};

            return { ...state, settings };

        } case 'DO_REQUEST': {
            const { settings } = state ;
            settings._uiux.process = { isRequest: true };

            return { ...state, settings };

        } case 'UPDATE_RESPONSE_OK': {
            const { dataFromDB } = action.payload;
            const settings = { ...state.settings, ...parseSettingsFromDB( dataFromDB ) };
            const { _uiux } = settings;
            _uiux.process = {};
            _uiux.form = {};
            delete settings._uiux;
            localStorage.setItem( 'settings', JSON.stringify( settings ) );
            settings._uiux = _uiux;

            return { ...state, settings };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { _saved } = action.payload;
            const settings = { ...state.settings, ..._saved };

            return { ...state, settings };

        } default: {
            throw new Error();
        }
    }
}

export { settingsReducer }; 
