const comboReducer = ( ...reducers ) => {

    return ( state, action ) => {
        reducers.forEach( reducer => state = reducer( state, action ) );
        return state;
    }
}

const getItem = ( state, namespace, index ) => {

    return Number.isInteger( index )
        ? state[ namespace ][ index ]
        : state[ namespace ];
}

const setItem = ( state, namespace, index, _item ) => {

    if ( Number.isInteger( index ) ) {
        state[ namespace ][ index ] = _item

    } else {
        state[ namespace ] = _item
    }
}

const formReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { namespace, index, mode } = action.payload;
            const _item = getItem( state, namespace, index );

            _item._uiux.form = { isOpen: true };
            _item._uiux.mode = mode;

            setItem( state, namespace, index, _item );
            return { ...state };

        } case 'CLOSE_FORM': {
            const { namespace, index } = action.payload;
            const _item = getItem( state, namespace, index );

            _item._uiux.process = {};
            _item._uiux.form = {};
            _item._uiux.mode = {};

            setItem( state, namespace, index, _item );
            return { ...state };

        } default: {
            return state;
        }    
    }
}

const validationReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_VALIDATION': {
            const { namespace, index } = action.payload;
            const _item = getItem( state, namespace, index );

            _item._uiux.process = { isValidation: true };

            setItem( state, namespace, index, _item );
            return { ...state };

        } case 'VALIDATION_OK': {
            const { namespace, index, data } = action.payload;
            let _item = getItem( state, namespace, index );

            _item = { ..._item, ...data };
            _item._uiux.process = { isValidationOk: true };

            setItem( state, namespace, index, _item );
            return { ...state };

        } case 'VALIDATION_ERROR': {
            const { namespace, index } = action.payload;
            const _item = getItem( state, namespace, index );

            _item._uiux.process = {};

            setItem( state, namespace, index, _item );
            return { ...state };

        } default: {
            return state;
        }    
    }
}

export { 
    comboReducer,
    formReducer,
    validationReducer,
}; 
