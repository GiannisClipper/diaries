import {
    OPEN_FORM,
    CLOSE_FORM,
} from '../types/form';

const formOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_FORM: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];
            _item._uiux.form = { isOpen: true };

            return { ...state, [ namespace ]: _item };

        } case CLOSE_FORM: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];
            _item._uiux.form = {};
            // _item._uiux.status = {};
            // _item._uiux.mode = {};

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const formOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_FORM: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items[ index ]._uiux.form = { isOpen: true };

            return { ...state, [ namespace ]: _items };

        } case CLOSE_FORM: {
            const { assets, index } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items[ index ]._uiux.form = {};

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

export { formOneReducer, formOneOfManyReducer };