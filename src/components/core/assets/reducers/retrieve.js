import {
    RETRIEVE_REQUEST,
    RETRIEVE_RESPONSE_OK,
    RETRIEVE_RESPONSE_ERROR,
    RETRIEVE_RESPONSE_OK_AFTER, 
    RETRIEVE_RESPONSE_ERROR_AFTER, 
} from '../types/retrieve';

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

export { retrieveOneReducer };
