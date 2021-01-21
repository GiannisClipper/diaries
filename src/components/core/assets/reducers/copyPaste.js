import {
    CUT_OK,
    PASTE,
    PASTE_OK,
    PASTE_ERROR,
} from '../types/copyPaste';

const copyPasteReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case CUT_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 1 );

            return { ...state, [ namespace ]: _items };

        } case PASTE: {
            const { index, assets, data } = action.payload;
            const { namespace, schema } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 0, { ...schema(), ...data } );   // insert at index while deleting 0 items first
            const { mode } = _items[ index ]._uiux;
            _items[ index ]._uiux.mode = { ...mode, isPaste: true };
            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: _items };

        } case PASTE_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items[ index ]._uiux.mode.isPaste = false;

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

export { copyPasteReducer };