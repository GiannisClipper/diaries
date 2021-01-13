const menuOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_MENU': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.menu = { isOpen: true };

            return { ...state, [ namespace ]: _item };

        } case 'CLOSE_MENU': {
            const { namespace } = action.payload;
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

        case 'OPEN_MENU': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.menu = { isOpen: true };

            return { ...state, [ namespace ]: _items };

        } case 'CLOSE_MENU': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            console.log( namespace, index, _items )
            if ( index === undefined ) return state;

            _items[ index ]._uiux.menu = {};

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

export { menuOneReducer, menuOneOfManyReducer };