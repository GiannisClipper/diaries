const manyRequestReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const { _namespace, _schema } = action.payload; 
            const _items = [ _schema() ];
            _items[ 0 ]._uiux.mode = { isRetrieveMany: true };
            _items[ 0 ]._uiux.process = { isRequest: true };

            const { _uiux } = state;
            _uiux.process = { isRequest: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { _namespace, _schema, _parseFromDB, _sort, dataFromDB } = action.payload; 
            const { _uiux } = state;

            const _items = [];
            dataFromDB.forEach( x => _items.push( { ..._schema(), ..._parseFromDB( x ) } ) );
            if ( _sort ) _items.sort( _sort );
            _items.push( _schema() );

            _items.forEach( x => x._uiux.process = { isResponseOk: true } );
            _uiux.process = { isResponseOk: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { _namespace, _schema } = action.payload; 
            const _items = [ _schema() ];
            _items[ 0 ]._uiux.process = { isResponseError: true }

            const { _uiux } = state;
            _uiux.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, [ _namespace ]: _items, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_AFTER': {
            const { _namespace } = action.payload; 
            const _items = state[ _namespace ];
            const { _uiux } = state;

            _items.forEach( x => x._uiux.process = { isResponseAfter: true } );
            _uiux.process = { isResponseAfter: true };

            return { ...state, [ _namespace ]: _items, _uiux };

        } default: {
            return undefined;
        }    
    }
}

export { manyRequestReducer }; 
