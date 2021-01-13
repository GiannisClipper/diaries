import { entrySchema } from '../schemas';
import { parseNoteFromDB } from '../note/parsers';
import { parsePaymentFromDB } from '../payment/parsers';
import { daysBetween, shiftDate, dateToYYYYMMDD } from '../../helpers/dates'; 

const datesReducer = ( state, action ) => {

    switch ( action.type ) {

        // case 'RETRIEVE_MANY_REQUEST_BEFORE': {
        //     const { dates, _uiux } = state;
        //     dates.forEach( x => x._uiux.process = { isRequestBefore: true } );
        //     _uiux.process = { isRequestBefore: true };

        //     return { ...state, _uiux };

        // } case 'RETRIEVE_MANY_REQUEST': {
        //     const { dates, _uiux } = state;
        //     dates.forEach( x => x._uiux.mode = { isRetrieveMany: true } );
        //     dates.forEach( x => x._uiux.process = { isRequest: true } );
        //     _uiux.mode = { isRetrieveMany: true };
        //     _uiux.process = { isRequest: true };

        //     return { ...state, dates, _uiux };

        // } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
        //     const { dates, _uiux } = state;
        //     dates.forEach( x => x._uiux.process = { isResponseWaiting: true } );
        //     _uiux.process = { isResponseWaiting: true };

        //     return { ...state, dates, _uiux };

        case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;
            const { dates } = state;
            let _uiux = { ...state._uiux };
            dates.forEach( x => x._uiux.process = { isResponseWaiting: true } );
            _uiux.process = { isResponseOk: true };
            _uiux.dataFromDB = dataFromDB;

            return { ...state, dates, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { error } = action.payload;
            const { dates, _uiux } = state;
            dates.forEach( date => { 
                date.entries.forEach( entry => entry._uiux.process = { isResponseErrorAfter: true } );
                date._uiux.process = { isResponseError: true };
            } );
            _uiux.process = { isResponseError: true };
            _uiux.error = error;

            //_uiux._error = action.payload.error;

            return { ...state, dates, _uiux };

         } case 'RETRIEVE_MANY_RESPONSE_OK_AFTER': {

            const { genres, funds } = action.payload;

            if ( genres && funds ) {
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

                    const _uiux = { 
                        ...dates[ i ]._uiux, 
                        dataFromDB: partFromDB, 
                        genres, 
                        funds,
                        process: { isResponseOk: true }
                    };

                    dates[ i ]._uiux = _uiux;
                }

                _uiux.process = { isResponseOkAfter: true };
                delete _uiux.dataFromDB;

                console.log( dates )
                return { ...state, dates, _uiux };
            }

            return state;

        } case 'RETRIEVE_MANY_RESPONSE_ERROR_AFTER': {
            const { dates, _uiux } = state;
            dates.forEach( date => { 
                date._uiux.process = { isResponseErrorAfter: true };
                date.entries.forEach( entry => entry._uiux.process = { isResponseErrorAfter: true } );
            } );
            _uiux.process = { isResponseError: true };

            //_uiux._error = action.payload.error;

            return { ...state, dates, _uiux };

        } default: {
            return undefined;
        }
    }
}

export { datesReducer };
