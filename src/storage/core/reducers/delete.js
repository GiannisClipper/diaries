const deleteOneReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'DELETE_REQUEST': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _item };

        } case 'DELETE_RESPONSE_OK': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _item };

        } case 'DELETE_RESPONSE_OK_AFTER': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _item };

        } case 'DELETE_RESPONSE_ERROR': {
            const { namespace, error } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isResponseError: true };
            _item._uiux.error = error;

            return { ...state, [ namespace ]: _item };

        } case 'DELETE_RESPONSE_ERROR_AFTER': {
            const { namespace, pahema } = action.payload;
            const _item = pahema();

            _item._uiux.status = { isResponseErrorAfter: true };

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }
    }
}

const deleteOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DELETE_REQUEST': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case 'DELETE_RESPONSE_OK': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } case 'DELETE_RESPONSE_OK_AFTER': {
            const { namespace, index } = action.payload;
            const _items = [ ...state[ namespace ] ];

            _items.splice( index, 1 );

            return { ...state, [ namespace ]: _items };

        } case 'DELETE_RESPONSE_ERROR': {
            const { namespace, index, error } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseError: true }
            _items[ index ]._uiux.error = error;

            return { ...state, [ namespace ]: _items };

        } case 'DELETE_RESPONSE_ERROR_AFTER': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isResponseErrorAfter: true }

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { deleteOneReducer, deleteOneOfManyReducer };
