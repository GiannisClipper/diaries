const oneFormReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { _namespace, mode } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.form = { isOpen: true };
            _item._uiux.mode = mode;

            return { ...state, [ _namespace ]: _item };

        } case 'CLOSE_FORM': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = {};
            _item._uiux.form = {};
            _item._uiux.mode = {};

            return { ...state, [ _namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const oneValidationReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_VALIDATION': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = { isValidation: true };

            return { ...state, [ _namespace ]: _item };

        } case 'VALIDATION_OK': {
            const { _namespace, data } = action.payload;
            let _item = state[ _namespace ];

            _item = { ..._item, ...data };
            _item._uiux.process = { isValidationOk: true };

            return { ...state, [ _namespace ]: _item };

        } case 'VALIDATION_ERROR': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = {};

            return { ...state, [ _namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const oneRequestReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'DO_REQUEST': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = { isRequest: true };

            return { ...state, [ _namespace ]: _item };

        } case 'CREATE_RESPONSE_OK': {
            const { _namespace, dataFromDB, _parseFromDB } = action.payload;
            let _item = state[ _namespace ];

            _item = { ..._item, ..._parseFromDB( dataFromDB ) };
            _item._uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _item };

        } case 'CREATE_RESPONSE_ERROR': {
            const { _namespace, _schema } = action.payload;
            const _item = _schema();

            return { ...state, [ _namespace ]: _item };

        } case 'CREATE_RESPONSE_AFTER': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = {};
            _item._uiux.mode = {};
            _item._uiux.form = {};

            return { ...state, [ _namespace ]: _item };

        } case 'UPDATE_RESPONSE_OK': {
            const { _namespace, dataFromDB, _parseFromDB } = action.payload;
            let _item = state[ _namespace ];

            _item = { ..._item, ..._parseFromDB( dataFromDB ) };
            _item._uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _item };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { _namespace, _saved } = action.payload;
            let _item = state[ _namespace ];

            _item = { ..._item, ..._saved };
            _item._uiux.process = {};
            _item._uiux.mode = {};
            _item._uiux.form = {};

            return { ...state, [ _namespace ]: _item };

        } case 'UPDATE_RESPONSE_AFTER': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = {};
            _item._uiux.mode = {};
            _item._uiux.form = {};

            return { ...state, [ _namespace ]: _item };

        } case 'DELETE_RESPONSE_OK': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _item };

        } case 'DELETE_RESPONSE_ERROR': {
            const { _namespace, _schema } = action.payload;
            const _item = _schema();

            return { ...state, [ _namespace ]: _item };

        } case 'DELETE_RESPONSE_AFTER': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = {};

            return { ...state, [ _namespace ]: _item };

        } default: {
            return undefined;
        }
    }
}

export { oneFormReducer, oneValidationReducer, oneRequestReducer }; 
