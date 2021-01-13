const createOneReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'CREATE_REQUEST': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_OK': {
            const { namespace, dataFromDB, parseFromDB } = action.payload;
            let _item = state[ namespace ];

            _item = { ..._item, ...parseFromDB( dataFromDB ) };
            _item._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_OK_AFTER': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.mode = {};
            _item._uiux.form = {};
            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_ERROR': {
            const { namespace, error } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_ERROR_AFTER': {
            const { namespace, schema } = action.payload;
            const _item = schema();

            _item._uiux.status = { isResponseErrorAfter: true };

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }
    }
}

const createOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'CREATE_REQUEST': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_OK': {
            const { namespace, index, dataFromDB, parseFromDB } = action.payload;
            const _items = state[ namespace ];

            _items[ index ] = { ..._items[ index ], ...parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_OK_AFTER': {
            const { namespace, index, schema, sort } = action.payload;
            const _items = [ ...state[ namespace ] ];

            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.status = { isResponseOkAfter: true };

            if ( sort ) _items.sort( sort );
            _items.push( schema() );

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_ERROR': {
            const { namespace, index, error } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.error = error;
            _items[ index ]._uiux.status = { isResponseError: true }

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_ERROR_AFTER': {
            const { namespace, index, schema } = action.payload;
            const _items = state[ namespace ];

            const { _uiux } = _items[ index ];
            _items[ index ] = { ...schema(), _uiux };
            _items[ index ]._uiux.status = { isResponseErrorAfter: true }

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { createOneReducer, createOneOfManyReducer };