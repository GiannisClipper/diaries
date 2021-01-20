import {
    CUT_PROCESS,
    CUT_PROCESS_OK,
    CUT_PROCESS_ERROR,
    COPY_PROCESS,
    COPY_PROCESS_OK,
    COPY_PROCESS_ERROR,
    PASTE_PROCESS,
    PASTE_PROCESS_OK,
    PASTE_PROCESS_ERROR,
} from '../types/copyPaste';

const copyPasteReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case CUT_PROCESS: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isCut: true };

            return { ...state, [ namespace ]: _items };

        } case CUT_PROCESS_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = [ ...state[ namespace ] ];

            _items.splice( index, 1 );

            return { ...state, [ namespace ]: _items };

        } case CUT_PROCESS_ERROR: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isCutError: true };

            return { ...state, [ namespace ]: _items };

        } case COPY_PROCESS: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isCopy: true };

            return { ...state, [ namespace ]: _items };

        } case COPY_PROCESS_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isCopyOk: true };

            return { ...state, [ namespace ]: _items };

        } case COPY_PROCESS_ERROR: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isCopyError: true };

            return { ...state, [ namespace ]: _items };

        } case PASTE_PROCESS: {
            const { index, assets, data } = action.payload;
            const { namespace, schema } = assets;

            const _items = [ ...state[ namespace ] ];

            _items.splice( index, 0, { ...schema(), ...data, index } );   // insert at index while deleting 0 items first
            _items[ index ]._uiux.status = { isPaste: true };

            return { ...state, [ namespace ]: _items };

        } case PASTE_PROCESS_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.status = { isPasteOk: true };

            return { ...state, [ namespace ]: _items };

        } case PASTE_PROCESS_ERROR: {
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