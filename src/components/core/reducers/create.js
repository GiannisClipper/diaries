import {
    CREATE_REQUEST,
    CREATE_RESPONSE_OK,
    CREATE_RESPONSE_ERROR,
    CREATE_RESPONSE_OK_AFTER, 
    CREATE_RESPONSE_ERROR_AFTER, 
} from '../assets/types/create';

const createOneReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case CREATE_REQUEST: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case CREATE_RESPONSE_OK: {
            const { dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            let _item = state[ namespace ];

            _item = { ..._item, ...parseFromDB( dataFromDB ) };
            _item._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _item };

        } case CREATE_RESPONSE_OK_AFTER: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.mode = {};
            _item._uiux.form = {};
            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case CREATE_RESPONSE_ERROR: {
            const { error, assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case CREATE_RESPONSE_ERROR_AFTER: {
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

const createOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case CREATE_REQUEST: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case CREATE_RESPONSE_OK: {
            const { index, dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            const _items = state[ namespace ];

            _items[ index ] = { ..._items[ index ], ...parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case CREATE_RESPONSE_OK_AFTER: {
            const { index, assets } = action.payload;
            const { namespace, schema, sorter } = assets;

            const _items = [ ...state[ namespace ] ];

            _items[ index ]._uiux.mode = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.status = { isResponseOkAfter: true };

            if ( index === _items.length - 1 ) {  // excluding copy-paste new entries  
                if ( sorter ) _items.sort( sorter );
                _items.push( schema() );
            }

            return { ...state, [ namespace ]: _items };

        } case CREATE_RESPONSE_ERROR: {
            const { index, error, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.error = error;
            _items[ index ]._uiux.status = { isResponseError: true };

            return { ...state, [ namespace ]: _items };

        } case CREATE_RESPONSE_ERROR_AFTER: {
            const { index, assets } = action.payload;
            const { namespace, schema } = assets;

            const _items = state[ namespace ];

            const { _uiux } = _items[ index ];
            _items[ index ] = { ...schema(), _uiux };

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

export { createOneReducer, createOneOfManyReducer };