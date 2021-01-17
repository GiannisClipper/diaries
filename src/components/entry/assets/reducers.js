import { dateToYYYYMMDD } from '../../core/helpers/dates'; 

const entriesReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_RESPONSE_OK_AFTER': {
            const { schema, parseFromDB, sorter } = action.payload.assets;
            
            const { date } = state;
            let _uiux = { ...state._uiux };
            const { dataFromDB, genres, funds } = _uiux;
            dataFromDB.sort( sorter );

            const entries = [];
            for ( const entryFromDB of dataFromDB ) {
                entryFromDB.genres = genres;
                entryFromDB.funds = funds;
                const entry = parseFromDB( entryFromDB );
                entries.push( { ...schema(), ...entry } );
            }
            entries.push( { ...schema(), date: dateToYYYYMMDD( date ) } );

            _uiux.status = { isResponseOkAfter: true };
            // delete _uiux.dataFromDB;
            // delete _uiux.genres;
            // delete _uiux.funds;

            return { ...state, entries, _uiux };

        } default: {
            return undefined;
        }
    }
}

export { entriesReducer };
