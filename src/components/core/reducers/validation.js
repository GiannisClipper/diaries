import { 
    VALIDATION,
    VALIDATION_OK,
    VALIDATION_ERROR,
} from '../assets/types/validation';

const validationOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case VALIDATION: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.status = { isValidation: true };

            return { ...state, [ namespace ]: _item };

        } case VALIDATION_OK: {
            const { data, assets } = action.payload;
            const { namespace } = assets;

            let _item = state[ namespace ];

            _item = { ..._item, ...data };
            _item._uiux.status = { isValidationOk: true };

            return { ...state, [ namespace ]: _item };

        } case VALIDATION_ERROR: {
            const { errors, assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.error.result = errors;
            _item._uiux.status = { isValidationError: true };

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const validationOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case VALIDATION: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace];

            _items[ index ]._uiux.status = { isValidation: true };

            return { ...state, [ namespace ]: _items };

        } case VALIDATION_OK: {
            const { index, data, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace];

            _items[ index ] = { ..._items[ index ], ...data };
            _items[ index ]._uiux.status = { isValidationOk: true };

            return { ...state, [ namespace ]: _items };

        } case VALIDATION_ERROR: {
            const { index, errors, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace];

            _items[ index ]._uiux.error.result = errors;
            _items[ index ]._uiux.status = { isValidationError: true };

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

export { validationOneReducer, validationOneOfManyReducer };