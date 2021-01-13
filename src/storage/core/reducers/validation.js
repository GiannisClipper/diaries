const validationOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'VALIDATION': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = { isValidation: true };

            return { ...state, [ namespace ]: _item };

        } case 'VALIDATION_OK': {
            const { namespace, data } = action.payload;
            let _item = state[ namespace ];

            _item = { ..._item, ...data };
            _item._uiux.status = { isValidationOk: true };

            return { ...state, [ namespace ]: _item };

        } case 'VALIDATION_ERROR': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.status = {};

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const validationOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'VALIDATION': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace];

            _items[ index ]._uiux.status = { isValidation: true };

            return { ...state, [ namespace ]: _items };

        } case 'VALIDATION_OK': {
            const { namespace, index, data } = action.payload;
            const _items = state[ namespace];

            _items[ index ] = { ..._items[ index ], ...data };
            _items[ index ]._uiux.status = { isValidationOk: true };

            return { ...state, [ namespace ]: _items };

        } case 'VALIDATION_ERROR': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace];

            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

export { validationOneReducer, validationOneOfManyReducer };