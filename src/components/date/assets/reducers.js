import { 
    RETRIEVE_MANY_RESPONSE_OK,
    RETRIEVE_MANY_RESPONSE_ERROR, 
    RETRIEVE_MANY_RESPONSE_OK_AFTER,
    RETRIEVE_MANY_RESPONSE_ERROR_AFTER, 
} from '../../core/assets/types/retrieveMany';

import { daysBetween, shiftDate, dateToYYYYMMDD } from '../../core/helpers/dates'; 

const datesReducer = ( state, action ) => {

    switch ( action.type ) {

        case RETRIEVE_MANY_RESPONSE_OK: {
            const { dataFromDB } = action.payload;
            const { dates } = state;
            let _uiux = { ...state._uiux };
            dates.forEach( x => x._uiux.status = { isResponseWaiting: true } );
            _uiux.status = { isResponseOk: true };
            _uiux.dataFromDB = dataFromDB;

            return { ...state, dates, _uiux };

        } case RETRIEVE_MANY_RESPONSE_ERROR: {
            const { error } = action.payload;
            const { dates, _uiux } = state;
            dates.forEach( date => { 
                date.entries.forEach( entry => entry._uiux.status = { isResponseErrorAfter: true } );
                date._uiux.status = { isResponseError: true };
            } );
            _uiux.status = { isResponseError: true };
            _uiux.error = error;

            return { ...state, dates, _uiux };

         } case RETRIEVE_MANY_RESPONSE_OK_AFTER: {

            let dates = [ ...state.dates ];
            let _uiux = { ...state._uiux };
            const { dataFromDB } = _uiux;

            const dateFrom = dates[ 0 ].date;
            const dateTill = dates[ dates.length - 1 ].date;
            const days = daysBetween( dateFrom, dateTill ) + 1;

            for ( let i = 0; i < days; i++ ) { 
                const date = shiftDate( dateFrom, i );
                const dateStr = dateToYYYYMMDD( date );
                const partFromDB = dataFromDB.filter( x => x.date === dateStr );

                dates[ i ]._uiux = { 
                    ...dates[ i ]._uiux, 
                    dataFromDB: partFromDB,
                    status: { isResponseOk: true }
                };
            }

            _uiux.status = { isResponseOkAfter: true };
            delete _uiux.dataFromDB;

            return { ...state, dates, _uiux };

        } case RETRIEVE_MANY_RESPONSE_ERROR_AFTER: {
            const { dates, _uiux } = state;
            dates.forEach( date => { 
                date._uiux.status = { isResponseErrorAfter: true };
                date.entries.forEach( entry => entry._uiux.status = { isResponseErrorAfter: true } );
            } );
            _uiux.status = { isResponseErrorAfter: true };

            return { ...state, dates, _uiux };

        } default: {
            return undefined;
        }
    }
}

export { datesReducer };