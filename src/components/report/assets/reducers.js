import { OPEN_PAGE } from '../../core/assets/types/page';
import { RETRIEVE_RESPONSE_OK } from '../../core/assets/types/retrieve';

const reportsReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_PAGE: {
            const { assets, data } = action.payload;
            const { namespace, schema } = assets;
            const { _uiux } = state;

            const _items = data.map( x => ( { ...schema(), ...x } ) );
            _uiux.page = { isOpen: true };

            return { ...state, [ namespace ]: _items, _uiux };

        } case RETRIEVE_RESPONSE_OK: {
            const { index, dataFromDB, assets } = action.payload;
            const { namespace, sorter } = assets;

            const _items = state[ namespace ];

            if ( sorter ) dataFromDB.sort( sorter );

            _items[ index ].result = dataFromDB;
            _items[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, [ namespace ]: _items };

        } default: {
            return undefined;
        }
    }
}

export { reportsReducer };