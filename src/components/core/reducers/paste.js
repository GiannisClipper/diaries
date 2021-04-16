import {
    CUT_OK,
    CUT_ERROR,
    PASTE,
    PASTE_OK,
    PASTE_ERROR,
} from '../assets/types/paste';

const pasteReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case CUT_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 1 );

            return { ...state, [ namespace ]: _items };

        } case CUT_ERROR: {
            console.log('CUT_ERROR')
            const { index, assets, data } = action.payload;
            const { namespace, schema } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 0, { ...schema(), ...data } );   // insert at index while deleting 0 items first
            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: _items };

        } case PASTE: {
            const { index, assets, data } = action.payload;
            const { namespace, schema } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 0, { ...schema(), ...data } );   // insert at index while deleting 0 items first
            _items[ index ]._uiux.paste = { isPaste: true };
            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: _items };

        } case PASTE_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items[ index ]._uiux.paste = {};
            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: _items };

        } case PASTE_ERROR: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 1 );

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { pasteReducer };