import {
    DELETE_REQUEST,
    DELETE_RESPONSE_OK,
    DELETE_RESPONSE_ERROR,
    DELETE_RESPONSE_OK_AFTER, 
    DELETE_RESPONSE_ERROR_AFTER, 
} from '../assets/types/delete';

const deleteOneReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case DELETE_REQUEST: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case DELETE_RESPONSE_OK: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _item };

        } case DELETE_RESPONSE_OK_AFTER: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case DELETE_RESPONSE_ERROR: {
            const { error, assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case DELETE_RESPONSE_ERROR_AFTER: {
            const { assets } = action.payload;
            const { namespace, schema } = assets;

            let _item = state[ namespace ];
            const { error } = _item._uiux;
            _item = schema();

            _item._uiux.status = error.statusCode !== 500
                ? { isResponseErrorAfter: true }
                : { isSuspended: true };

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }
    }
}

const deleteOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case DELETE_REQUEST: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case DELETE_RESPONSE_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case DELETE_RESPONSE_OK_AFTER: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = [ ...state[ namespace ] ];

            _items.splice( index, 1 );

            return { ...state, [ namespace ]: _items };

        } case DELETE_RESPONSE_ERROR: {
            const { index, error, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseError: true };
            _items[ index ]._uiux.error = error;

            return { ...state, [ namespace ]: _items };

        } case DELETE_RESPONSE_ERROR_AFTER: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            const { error } = _items[ index ]._uiux;
            _items[ index ]._uiux.status = error.statusCode !== 500
                ? { isResponseErrorAfter: true }
                : { isSuspended: true };

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { deleteOneReducer, deleteOneOfManyReducer };
