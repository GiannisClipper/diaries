import {
    RETRIEVE_MANY_REQUEST_BEFORE,
    RETRIEVE_MANY_REQUEST,
    RETRIEVE_MANY_RESPONSE_WAITING,
    RETRIEVE_MANY_RESPONSE_OK,
    RETRIEVE_MANY_RESPONSE_ERROR,
    RETRIEVE_MANY_RESPONSE_OK_AFTER, 
    RETRIEVE_MANY_RESPONSE_ERROR_AFTER, 
} from '../types/retrieveMany';

const retrieveManyReducer = ( state, action ) => {

    switch ( action.type ) {

        case RETRIEVE_MANY_REQUEST_BEFORE: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isRequestBefore: true } );

            const { _uiux } = state;
            _uiux.status = { isRequestBefore: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case RETRIEVE_MANY_REQUEST: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.mode = { isRetrieveMany: true } );
            _items.forEach( x => x._uiux.status = { isRequest: true } );

            const { _uiux } = state;
            _uiux.mode = { isRetrieveMany: true };
            _uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case RETRIEVE_MANY_RESPONSE_WAITING: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isResponseWaiting: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseWaiting: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case RETRIEVE_MANY_RESPONSE_OK: {
            const { dataFromDB, assets } = action.payload;
            const { namespace, schema, parseFromDB, sorter } = assets;

            const _items = [];
            dataFromDB.forEach( x => _items.push( { ...schema(), ...parseFromDB( x ) } ) );
            if ( sorter ) _items.sort( sorter );
            _items.push( schema() );
            _items.forEach( x => x._uiux.status = { isResponseOk: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case RETRIEVE_MANY_RESPONSE_OK_AFTER: {
            const { assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isResponseOkAfter: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseOkAfter: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case RETRIEVE_MANY_RESPONSE_ERROR: {
            const { error, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];
            _items.forEach( x => x._uiux.status = { isResponseError: true } );

            const { _uiux } = state;
            _uiux.status = { isResponseError: true };
            _uiux.error = error;

            return { ...state, [ namespace ]: _items, _uiux };

        } case RETRIEVE_MANY_RESPONSE_ERROR_AFTER: {
            const { assets } = action.payload;
            const { namespace } = assets;

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
