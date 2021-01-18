import { UPDATE_RESPONSE_OK_AFTER } from '../../core/assets/types/update';

const settingsReducer = ( state, action ) => {

    switch ( action.type ) {

        case UPDATE_RESPONSE_OK_AFTER: {
            const { settings } = state;
            const { _uiux } = settings;

            delete settings._uiux;
            localStorage.setItem( 'settings', JSON.stringify( settings ) );
            _uiux.status = {};
            settings._uiux = _uiux;

            settings._uiux.mode = {};
            settings._uiux.form = {};
            settings._uiux.status = { isResponseOkAfter: true };

            return { ...state, settings };

        } default: {
            return undefined;
        }
    }
}

export { settingsReducer }; 
