const manyRequestReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.status = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const { _namespace, _schema } = action.payload; 
            const _items = [ _schema() ];
            _items[ 0 ]._uiux.mode = { isRetrieveMany: true };
            _items[ 0 ]._uiux.status = { isRequest: true };

            const { _uiux } = state;
            _uiux.status = { isRequest: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.status = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { _namespace, _schema, _parseFromDB, _sort, dataFromDB } = action.payload; 
            const { _uiux } = state;

            const _items = [];
            dataFromDB.forEach( x => _items.push( { ..._schema(), ..._parseFromDB( x ) } ) );
            if ( _sort ) _items.sort( _sort );
            _items.push( _schema() );

            _items.forEach( x => x._uiux.status = { isResponseOk: true } );
            _uiux.status = { isResponseOk: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK_AFTER': {
            const { _namespace } = action.payload; 
            const _items = state[ _namespace ];
            const { _uiux } = state;

            _items.forEach( x => x._uiux.status = { isResponseOkAfter: true } );
            _uiux.status = { isResponseOkAfter: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { _namespace, _schema, error } = action.payload;
            const _items = [ _schema() ];
            _items[ 0 ]._uiux.status = { isResponseError: true }

            const { _uiux } = state;
            _uiux.status = { isResponseError: true };
            _uiux.error = error;

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR_AFTER': {
            const { _namespace } = action.payload; 
            const _items = state[ _namespace ];
            const { _uiux } = state;

            _items.forEach( x => x._uiux.status = { isResponseErrorAfter: true } );
            _uiux.status = { isResponseErrorAfter: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } default: {
            return undefined;
        }    
    }
}

export { manyRequestReducer }; 
