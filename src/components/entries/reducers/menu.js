import { OPEN_MENU } from '../../core/assets/types/menu';

const menuOneOfManyEntryReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_MENU: {
            const { index, assets, menuOptionCoords } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.menu = { isOpen: true };
            _items[ index ]._uiux.menuOptionCoords = menuOptionCoords;

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { menuOneOfManyEntryReducer };
