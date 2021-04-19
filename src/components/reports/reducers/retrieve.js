import { RETRIEVE_RESPONSE_OK } from '../../core/assets/types/retrieve';

const retrieveOneOfManyReportReducer = ( state, action ) => {

    switch ( action.type ) {

        case RETRIEVE_RESPONSE_OK: {
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

export { retrieveOneOfManyReportReducer };