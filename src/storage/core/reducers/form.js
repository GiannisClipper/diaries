const formOneReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { namespace, mode } = action.payload;
            const _item = state[ namespace ];

            const _saved = { ..._item };
            delete _saved._uiux;
            _item._uiux.form = { isOpen: true };
            _item._uiux.mode = mode;
            _item._uiux._saved = _saved;

            return { ...state, [ namespace ]: _item };

        } case 'CLOSE_FORM': {
            const { namespace } = action.payload;
            const _item = state[ namespace ];

            _item._uiux.process = {};
            _item._uiux.form = {};
            _item._uiux.mode = {};
            delete _item._saved;

            return { ...state, [ namespace ]: _item };

        } default: {
            return undefined;
        }    
    }
}

const formOneOfManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { namespace, index, mode } = action.payload;
            const _items = state[ namespace ];

            const _saved = { ..._items[ index ] };
            delete _saved._uiux;
            _items[ index ]._uiux.form = { isOpen: true };
            _items[ index ]._uiux.mode = mode;
            _items[ index ]._uiux._saved = _saved;

            return { ...state, [ namespace ]: _items };

        } case 'CLOSE_FORM': {
            const { namespace, index } = action.payload;
            const _items = state[ namespace ];

            _items[ index ]._uiux.process = {};
            _items[ index ]._uiux.form = {};
            _items[ index ]._uiux.mode = {};
            delete _items[ index ]._saved;

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }    
    }
}

export { formOneReducer, formOneOfManyReducer };