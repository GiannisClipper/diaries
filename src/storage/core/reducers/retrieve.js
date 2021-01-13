const retrieveManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { namespace } = action.payload; 
            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isRequestBefore: true } );

            const { _uiux } = state;
            _uiux.status = { isRequestBefore: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const { namespace } = action.payload; 
            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.mode = { isRetrieveMany: true } );
            _items.forEach( x => x._uiux.status = { isRequest: true } );

            const { _uiux } = state;
            _uiux.mode = { isRetrieveMany: true };
            _uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { namespace } = action.payload; 
            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isResponseWaiting: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseWaiting: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { namespace, schema, parseFromDB, sort, dataFromDB } = action.payload;
            const _items = [];
            dataFromDB.forEach( x => _items.push( { ...schema(), ...parseFromDB( x ) } ) );
            if ( sort ) _items.sort( sort );
            _items.push( schema() );
            _items.forEach( x => x._uiux.status = { isResponseOk: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK_AFTER': {
            const { namespace } = action.payload; 
            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isResponseOkAfter: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { namespace, error } = action.payload;
            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isResponseError: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseError: true };
            _uiux.error = error;

            return { ...state, [ namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR_AFTER': {
            const { namespace } = action.payload; 
            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isResponseErrorAfter: true } );
    
            const { _uiux } = state;
            _uiux.status = { isResponseErrorAfter: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } default: {
            return undefined;
        }    
    }
}

export { retrieveManyReducer }; 
