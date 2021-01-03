const oneOfManyFormReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { _namespace, index, mode } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ]._uiux.form = { isOpen: true };
            _items[ index ]._uiux.mode = mode;

            return { ...state, [ _namespace ]: _items };

        } case 'CLOSE_FORM': {
            const { _namespace, index } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ]._uiux.process = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.mode = {};

            return { ...state, [ _namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

const oneOfManyValidationReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_VALIDATION': {
            const { _namespace, index } = action.payload;
            const _items = state[ _namespace];

            _items[ index ]._uiux.process = { isValidation: true };

            return { ...state, [ _namespace ]: _items };

        } case 'VALIDATION_OK': {
            const { _namespace, index, data } = action.payload;
            const _items = state[ _namespace];

            _items[ index ] = { ..._items[ index ], ...data };
            _items[ index ]._uiux.process = { isValidationOk: true };

            return { ...state, [ _namespace ]: _items };

        } case 'VALIDATION_ERROR': {
            const { _namespace, index } = action.payload;
            const _items = state[ _namespace];

            _items[ index ]._uiux.process = {};

            return { ...state, [ _namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

const oneOfManyRequestReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'DO_REQUEST': {
            const { _namespace, index } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ]._uiux.process = { isRequest: true };

            return { ...state, [ _namespace ]: _items };

        } case 'CREATE_RESPONSE_OK': {
            const { _namespace, index, dataFromDB, _parseFromDB } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ] = { ..._items[ index ], ..._parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _items };

        } case 'CREATE_RESPONSE_ERROR': {
            const { _namespace, index, _schema } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ] = _schema();

            return { ...state, [ _namespace ]: _items };

        } case 'CREATE_RESPONSE_AFTER': {
            const { _namespace, index, _schema, _sort } = action.payload;
            const _items = [ ...state[ _namespace ] ];

            _items[ index ]._uiux.process = { isResponseAfter: true };
            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};

            if ( _sort ) _items.sort( _sort );
            _items.push( _schema() );

            return { ...state, [ _namespace ]: _items };

        } case 'UPDATE_RESPONSE_OK': {
            const { _namespace, index, dataFromDB, _parseFromDB } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ] = { ..._items[ index ], ..._parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _items };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { _namespace, index, _saved } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ] = { ..._items[ index ], ..._saved };
            _items[ index ]._uiux.process = {};
            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};

            return { ...state, [ _namespace ]: _items };

        } case 'UPDATE_RESPONSE_AFTER': {
            const { _namespace, index, _schema, _sort } = action.payload;
            const _items = [ ...state[ _namespace ] ];

            _items[ index ]._uiux.process = { isResponseAfter: true };
            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};

            if ( _sort ) {
                _items.pop();
                 _items.sort( _sort );
                _items.push( _schema() );
            }

            return { ...state, [ _namespace ]: _items };

        } case 'DELETE_RESPONSE_OK': {
            const { _namespace, index } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ]._uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _items };

        } case 'DELETE_RESPONSE_ERROR': {
            const { _namespace, index } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ]._uiux.process = { isResponseOk: true };
            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};

            return { ...state, [ _namespace ]: _items };

        } case 'DELETE_RESPONSE_AFTER': {
            const { _namespace, index } = action.payload;
            const _items = [ ...state[ _namespace ] ];

            _items.splice( index, 1 );

            return { ...state, [ _namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { oneOfManyFormReducer, oneOfManyValidationReducer, oneOfManyRequestReducer }; 
