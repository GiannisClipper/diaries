const createOneReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'CREATE_REQUEST': {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_OK': {
            const { dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            let _item = state[ namespace ];

            _item = { ..._item, ...parseFromDB( dataFromDB ) };
            _item._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_OK_AFTER': {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.mode = {};
            _item._uiux.form = {};
            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_ERROR': {
            const { error, assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case 'CREATE_RESPONSE_ERROR_AFTER': {
            const { assets } = action.payload;
            const { namespace, schema } = assets;

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
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_OK': {
            const { index, dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            const _items = state[ namespace ];

            _items[ index ] = { ..._items[ index ], ...parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_OK_AFTER': {
            const { index, assets } = action.payload;
            const { namespace, schema, sorter } = assets;

            const _items = [ ...state[ namespace ] ];

            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.status = { isResponseOkAfter: true };

            if ( sorter ) _items.sort( sorter );
            _items.push( schema() );

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_ERROR': {
            const { index, error, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.error = error;
            _items[ index ]._uiux.status = { isResponseError: true }

            return { ...state, [ namespace ]: _items };

        } case 'CREATE_RESPONSE_ERROR_AFTER': {
            const { index, assets } = action.payload;
            const { namespace, schema } = assets;

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