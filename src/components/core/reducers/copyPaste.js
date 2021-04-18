import {
    CUT_BEFORE,
    CUT,
    CUT_OK,
    CUT_ERROR,
    PASTE_BEFORE,
    PASTE,
    PASTE_OK,
    PASTE_ERROR,
} from '../assets/types/copyPaste';

const copyPasteReducer = ( state, action ) => {

    switch ( action.type ) {

        case CUT_BEFORE: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.forEach( x => x._uiux.copyPaste = {} );
            _items[ index ]._uiux.copyPaste = { isCutBefore: true };

            return { ...state, [ namespace ]: _items };

        } case CUT: {
                const { index, assets } = action.payload;
                const { namespace, schema } = assets;
    
                const _items = [ ...state[ namespace ] ];
                _items[ index ] = schema();
                _items[ index ]._uiux.copyPaste = { isCut: true };
    
                return { ...state, [ namespace ]: _items };
        
        } case CUT_OK: {
            const { assets } = action.payload;
            const { namespace } = assets;

            let _items = [ ...state[ namespace ] ];
            _items = _items.filter( x => ! x._uiux.copyPaste.isCut );

            return { ...state, [ namespace ]: [ ..._items ] };

        } case CUT_ERROR: {
            const { index, assets, data } = action.payload;
            const { namespace, schema } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 0, { ...schema(), ...data } );  // insert at index while deleting 0 items first
            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: [ ..._items ] };

        } case PASTE_BEFORE: {
            const { index, assets, data } = action.payload;
            const { namespace, schema } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.splice( index, 0, { ...schema(), ...data } );  // insert at index while deleting 0 items first
            _items[ index ]._uiux.copyPaste = { isPasteBefore: true };
            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: [ ..._items ] };

        } case PASTE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _items = [ ...state[ namespace ] ];
            _items.forEach( x => x._uiux.copyPaste = x._uiux.copyPaste.isPasteBefore ? { isPaste: true } : x._uiux.copyPaste );

            return { ...state, [ namespace ]: _items };

        } case PASTE_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items[ index ]._uiux.copyPaste = {};
            _items[ index ]._uiux.status = {};

            return { ...state, [ namespace ]: _items };

        } case PASTE_ERROR: {
            const { assets } = action.payload;
            const { namespace } = assets;

            let _items = [ ...state[ namespace ] ];
            _items = _items.filter( x => ! x._uiux.copyPaste.isPaste );

            return { ...state, [ namespace ]: [ ..._items ] };

        } default: {
            return undefined;
        }
    }
}

export { copyPasteReducer };