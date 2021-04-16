import {
    RETRIEVE_REQUEST,
    RETRIEVE_RESPONSE_OK,
    RETRIEVE_RESPONSE_ERROR,
    RETRIEVE_RESPONSE_OK_AFTER, 
    RETRIEVE_RESPONSE_ERROR_AFTER, 
} from '../assets/types/retrieve';

const retrieveOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case RETRIEVE_REQUEST: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case RETRIEVE_RESPONSE_OK: {
            const { assets, dataFromDB } = action.payload;
            const { namespace } = assets;

            const { _uiux } = state[ namespace ];
            _uiux.status = { isResponseOk: true };
            const _item = { ...dataFromDB, _uiux };

            return { ...state, [ namespace ]: _item };

        } case RETRIEVE_RESPONSE_OK_AFTER: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case RETRIEVE_RESPONSE_ERROR: {
            const { error, assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case RETRIEVE_RESPONSE_ERROR_AFTER: {
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

const retrieveOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case RETRIEVE_REQUEST: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case RETRIEVE_RESPONSE_OK: {
            const { index, dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            const _items = state[ namespace ];

            _items[ index ] = { ..._items[ index ], ...parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case RETRIEVE_RESPONSE_OK_AFTER: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _items };

        } case RETRIEVE_RESPONSE_ERROR: {
            const { index, error, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseError: true }
            _items[ index ]._uiux.error = error;

            return { ...state, [ namespace ]: _items };

        } case RETRIEVE_RESPONSE_ERROR_AFTER: {
            const { index, assets } = action.payload;
            const { namespace, schema } = assets;

            const _items = state[ namespace ];

            _items[ index ] = schema();
            _items[ index ]._uiux.status = { isResponseErrorAfter: true }

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { retrieveOneReducer, retrieveOneOfManyReducer };
