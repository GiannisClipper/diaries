import { 
    OPEN_MENU, 
    CLOSE_MENU 
} from '../assets/types/menu';

const menuOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_MENU: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.menu = { isOpen: true };

            return { ...state, [ namespace ]: _item };

        } case CLOSE_MENU: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _item = state[ namespace ];

            _item._uiux.menu = {};

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const menuOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_MENU: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.menu = { isOpen: true };

            return { ...state, [ namespace ]: _items };

        } case CLOSE_MENU: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            _items[ index ]._uiux.menu = {};

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

export { menuOneReducer, menuOneOfManyReducer };