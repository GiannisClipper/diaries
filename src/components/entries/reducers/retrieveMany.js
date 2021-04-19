import { RETRIEVE_MANY_RESPONSE_OK_AFTER } from '../../core/assets/types/retrieveMany';
import { dateToYYYYMMDD } from '../../core/helpers/dates'; 

const retrieveManyEntryReducer = ( state, action ) => {

    switch ( action.type ) {

        case RETRIEVE_MANY_RESPONSE_OK_AFTER: {
            const { schema, parseFromDB, sorter } = action.payload.assets;
            
            const { date, _uiux } = state;
            const { dataFromDB } = _uiux;
            dataFromDB.sort( sorter );

            const entries = [];
            for ( const entryFromDB of dataFromDB ) {
                const entry = parseFromDB( entryFromDB );
                entries.push( { ...schema(), ...entry } );
            }
            entries.push( { ...schema(), date: dateToYYYYMMDD( date ) } );

            _uiux.status = { isResponseOkAfter: true };
            // delete _uiux.dataFromDB;

            return { ...state, entries, _uiux };

        } default: {
            return undefined;
        }
    }
}

export { retrieveManyEntryReducer };
