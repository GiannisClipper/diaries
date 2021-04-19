import {
    DELETE_REQUEST,
    DELETE_RESPONSE_OK,
} from '../../core/assets/types/delete';

const deleteOneOfManyEntryReducer = ( state, action ) => {

    switch ( action.type ) {

        case DELETE_REQUEST: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            const indexes = _items
            .filter( x => x.id !== _items[ index ].id )
            .map( ( x, i ) => ( { id: x.id, old_index: x.index, new_index: i } ) )
            .filter( x => x.id && x.old_index !== x.new_index )
            .map( x => ( { id: x.id, index: x.new_index } ) );

            _items[ index ].indexes = indexes;
            _items[ index ]._uiux.status = { isRequest: true };

            return { ...state, [ namespace ]: _items };

        } case DELETE_RESPONSE_OK: {
            const { index, assets } = action.payload;
            const { namespace } = assets;

            const _items = state[ namespace ];

            const { indexes } = _items[ index ];
            indexes.forEach( x => 
                _items.forEach( y => 
                    y.index = x.id === y.id ? x.index : y.index
                )
            );

            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { deleteOneOfManyEntryReducer };
