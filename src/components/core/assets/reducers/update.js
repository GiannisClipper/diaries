import {
    UPDATE_REQUEST,
    UPDATE_RESPONSE_OK,
    UPDATE_RESPONSE_ERROR,
    UPDATE_RESPONSE_OK_AFTER, 
    UPDATE_RESPONSE_ERROR_AFTER, 
} from '../types/update';

const updateOneReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case UPDATE_REQUEST: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case UPDATE_RESPONSE_OK: {
            const { dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            let _item = state[ namespace ];

            _item = { ..._item, ...parseFromDB( dataFromDB ) };
            _item._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _item };

        } case UPDATE_RESPONSE_OK_AFTER: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.mode = {};
            _item._uiux.form = {};
            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case UPDATE_RESPONSE_ERROR: {
            const { error, assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case UPDATE_RESPONSE_ERROR_AFTER: {
            const { assets } = action.payload;
            const { namespace } = assets;

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
            
        case UPDATE_REQUEST: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case UPDATE_RESPONSE_OK: {
            const { index, dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            const _items = state[ namespace ];

            _items[ index ] = { ..._items[ index ], ...parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case UPDATE_RESPONSE_OK_AFTER: {
            const { index, assets } = action.payload;
            const { namespace, schema, sorter } = assets;

            const _items = [ ...state[ namespace ] ];

            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.status = { isResponseOkAfter: true };

            if ( sorter ) {
                _items.pop();
                 _items.sort( sorter );
                _items.push( schema() );
            }

            return { ...state, [ namespace ]: _items };

        } case UPDATE_RESPONSE_ERROR: {
            const { index, error, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseError: true }
            _items[ index ]._uiux.error = error;

            return { ...state, [ namespace ]: _items };

        } case UPDATE_RESPONSE_ERROR_AFTER: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

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