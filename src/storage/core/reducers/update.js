const updateOneReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'UPDATE_REQUEST': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case 'UPDATE_RESPONSE_OK': {
            const { namespace, dataFromDB, parseFromDB } = action.payload;
            let _item = state[ namespace ];
            console.log( 'UPDATE_RESPONSE_OK')
            _item = { ..._item, ...parseFromDB( dataFromDB ) };
            _item._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _item };

        } case 'UPDATE_RESPONSE_OK_AFTER': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.mode = {};
            _item._uiux.form = {};
            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { namespace, error } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case 'UPDATE_RESPONSE_ERROR_AFTER': {
            const { namespace } = action.payload;
            let _item = state[ namespace ];

            const { _saved } = _item._uiux;
            _item = { ..._item, ..._saved };
            _item._uiux.status = { isResponseErrorAfter: true };

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }
    }
}

const updateOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'UPDATE_REQUEST': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case 'UPDATE_RESPONSE_OK': {
            const { namespace, index, dataFromDB, parseFromDB } = action.payload;
            const _items = state[ namespace ];

            _items[ index ] = { ..._items[ index ], ...parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case 'UPDATE_RESPONSE_OK_AFTER': {
            const { namespace, index, schema, sort } = action.payload;
            const _items = [ ...state[ namespace ] ];

            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.status = { isResponseOkAfter: true };

            if ( sort ) {
                _items.pop();
                 _items.sort( sort );
                _items.push( schema() );
            }

            return { ...state, [ namespace ]: _items };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { namespace, index, error } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseError: true }
            _items[ index ]._uiux.error = error;

            return { ...state, [ namespace ]: _items };

        } case 'UPDATE_RESPONSE_ERROR_AFTER': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            const { _saved } = _items[ index ]._uiux;
            _items[ index ] = { ..._items[ index ], ..._saved };
            _items[ index ]._uiux.status = { isResponseErrorAfter: true }

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { updateOneReducer, updateOneOfManyReducer };