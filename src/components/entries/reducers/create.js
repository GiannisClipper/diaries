import {
    CREATE_REQUEST,
    CREATE_RESPONSE_OK,
} from '../../core/assets/types/create';

const createOneOfManyEntryReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case CREATE_REQUEST: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            const indexes = _items
            .map( ( x, i ) => ( { id: x.id, old_index: x.index, new_index: i } ) )
            .filter( x => x.id && x.old_index !== x.new_index )
            .map( x => ( { id: x.id, index: x.new_index } ) );

            _items[ index ].indexes = indexes;
            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case CREATE_RESPONSE_OK: {
            const { index, dataFromDB, assets } = action.payload;
            const { namespace, parseFromDB } = assets;

            const _items = state[ namespace ];

            const { indexes } = _items[ index ];
            indexes.forEach( x => 
                _items.forEach( y => 
                    y.index = x.id === y.id ? x.index : y.index
                )
            );

            _items[ index ] = { ..._items[ index ], ...parseFromDB( dataFromDB ) };
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { createOneOfManyEntryReducer };