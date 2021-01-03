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
            _item._uiux.mode = {};
            _item._uiux.form = {};

            return { ...state, [ _namespace ]: _item };

        } case 'CREATE_RESPONSE_ERROR': {
            const { _namespace, _schema } = action.payload;
            const _item = _schema();

            return { ...state, [ _namespace ]: _item };

        } case 'CREATE_RESPONSE_AFTER': {
            const { _namespace } = action.payload;
            const _item = state[ _namespace ];

            _item._uiux.process = {};

            return { ...state, [ _namespace ]: _item };

        } case 'UPDATE_RESPONSE_OK': {
            const { _namespace, dataFromDB, _parseFromDB } = action.payload;
            let _item = state[ _namespace ];

            _item = { ..._item, ..._parseFromDB( dataFromDB ) };
            _item._uiux.process = { isResponseOk: true };
            _item._uiux.mode = {};
            _item._uiux.form = {};

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
            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};

            return { ...state, [ _namespace ]: _items };

        } case 'CREATE_RESPONSE_ERROR': {
            const { _namespace, index, _schema } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ] = _schema();

            return { ...state, [ _namespace ]: _items };

        } case 'CREATE_RESPONSE_AFTER': {
            const { _namespace, index, _schema, _sort } = action.payload;
            const _items = [ ...state[ _namespace ] ];

            _items[ index ]._uiux.process = {};
            if ( _sort ) _items.sort( _sort );
            _items.push( _schema() );

            return { ...state, [ _namespace ]: _items };

        } case 'UPDATE_RESPONSE_OK': {
            const { _namespace, index, dataFromDB, _parseFromDB } = action.payload;
            const _items = state[ _namespace ];

            _items[ index ] = { ..._items[ index ], ..._parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.process = { isResponseOk: true };
            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};

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

            _items[ index ]._uiux.process = {};
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

const manyRequestReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const { _namespace, _schema } = action.payload; 
            const _items = [ _schema() ];
            _items[ 0 ]._uiux.mode = { isRetrieveMany: true };
            _items[ 0 ]._uiux.process = { isRequest: true };

            const { _uiux } = state;
            _uiux.process = { isRequest: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { _namespace, _schema, _parseFromDB, _sort, dataFromDB } = action.payload; 
            const { _uiux } = state;

            const _items = [];
            dataFromDB.forEach( x => _items.push( { ..._schema(), ..._parseFromDB( x ) } ) );
            if ( _sort ) _items.sort( _sort );
            _items.push( _schema() );

            _items.forEach( x => x._uiux.process = { isResponseOk: true } );
            _uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { _namespace, _schema } = action.payload; 
            const _items = [ _schema() ];
            _items[ 0 ]._uiux.process = { isResponseError: true }

            const { _uiux } = state;
            _uiux.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_AFTER': {
            const { _namespace } = action.payload; 
            const _items = state[ _namespace ];
            const { _uiux } = state;

            _items.forEach( x => x._uiux.process = { isResponseAfter: true } );
            _uiux.process = { isResponseAfter: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } default: {
            return undefined;
        }    
    }
}

export { manyRequestReducer }; 
