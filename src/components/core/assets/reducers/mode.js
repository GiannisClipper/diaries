import {
    CREATE_MODE, 
    RETRIEVE_MODE, 
    RETRIEVE_MANY_MODE,
    UPDATE_MODE, 
    DELETE_MODE, 
    NO_MODE,
} from '../types/mode';

const modeOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case CREATE_MODE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];
            _item._uiux.mode = { isCreate: true };

            return { ...state, [ namespace ]: _item };

        } case RETRIEVE_MODE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];
            _item._uiux.mode = { isRetrieve: true };

            return { ...state, [ namespace ]: _item };
        } case RETRIEVE_MANY_MODE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];
            _item._uiux.mode = { isRetrieveMany: true };

            return { ...state, [ namespace ]: _item };

        } case UPDATE_MODE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            const _saved = { ..._item };
            delete _saved._uiux;
            _item._uiux.mode = { isUpdate: true };
            _item._uiux._saved = _saved;

            return { ...state, [ namespace ]: _item };

        } case DELETE_MODE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];
            _item._uiux.mode = { isDelete: true };

            return { ...state, [ namespace ]: _item };

        } case NO_MODE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];
            _item._uiux.mode = {};

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const modeOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case CREATE_MODE: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.mode = { isCreate: true };

            return { ...state, [ namespace ]: _items };

        } case RETRIEVE_MODE: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.mode = { isRetrieve: true };

            return { ...state, [ namespace ]: _items };
    
        } case RETRIEVE_MANY_MODE: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.mode = { isRetrieveMany: true };

            return { ...state, [ namespace ]: _items };
    
        } case UPDATE_MODE: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            const _saved = { ..._items[ index ] };
            delete _saved._uiux;

            _items[ index ]._uiux.mode = { isUpdate: true };
            _items[ index ]._uiux._saved = _saved;

            return { ...state, [ namespace ]: _items };

        } case DELETE_MODE: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.mode = { isDelete: true };

            return { ...state, [ namespace ]: _items };

        } case NO_MODE: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.mode = {};

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

export { modeOneReducer, modeOneOfManyReducer };