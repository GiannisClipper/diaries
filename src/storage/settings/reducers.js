const settingsReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'UPDATE_RESPONSE_AFTER': {
            const { settings } = state;
            const { _uiux } = settings;

            delete settings._uiux;
            localStorage.setItem( 'settings', JSON.stringify( settings ) );
            _uiux.process = {};
            settings._uiux = _uiux;

            return { ...state, settings };

        } default: {
            return undefined;
        }
    }
}

export { settingsReducer }; 
