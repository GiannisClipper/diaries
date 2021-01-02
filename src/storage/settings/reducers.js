import { parseSettingsFromDB } from './parsers';

const settingsReducer = ( state, action ) => {

    console.log( 'action.type', action.type)

    switch ( action.type ) {

        case 'DO_REQUEST': {
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
            return state;
        }
    }
}

export { settingsReducer }; 
