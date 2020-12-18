import { initDate, initEntry } from './schemas';

const initDates = ( dates, dateFrom, dateTill, entriesMode ) => {
    
    return dates.map( x => {
        const centralDate = dates.length === 1 ? dates[ 0 ] : null;
        const date = initDate();
        date.data.date = x;
        date.uiux.process = { isRequest: true };
        date.uiux.isTheCentral = centralDate && date.data.date.getTime() === centralDate.getTime() ? true : false;
        date.data.entries.push( initEntry() );
        date.data.entries[ 0 ].uiux.status = { isWaiting: true };

        if ( x === dateFrom ) {
            date.data.entries[ 0 ].uiux.mode = entriesMode;
            date.data.entries[ 0 ].uiux.process = { isRequestBefore: true };
            date.data.entries[ 0 ].uiux.dateFrom = dateFrom;
            date.data.entries[ 0 ].uiux.dateTill = dateTill;
        }

        return date;
    } );
}

const datesReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_INIT': {

            const { init } = state.uiux;
            const { mode } = action.payload;
            init.dates.mode = mode;
            init.dates.process = { isOnInit: true };

            return { ...state, uiux: { ...state.uiux, init } };

        } case 'INIT_DATES': {

            const { prevDates, centralDate, nextDates, dateFrom, dateTill, entriesMode } = action.payload;
            const dates = [ 
                ...initDates( prevDates, dateFrom, dateTill, entriesMode ), 
                ...initDates( [ centralDate ], dateFrom, dateTill, entriesMode ),
                ...initDates( nextDates, dateFrom, dateTill, entriesMode )
            ];

            const { init } = state.uiux;
            init.dates.process = entriesMode.isRetrieveMany 
                ? { isResponseOk: true }
                : { isWaiting: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, dates } };

        } case 'INIT_PREV_DATES': {

            const { prevDates, dateFrom, dateTill, entriesMode } = action.payload;
            const dates = [
                ...initDates( prevDates, dateFrom, dateTill, entriesMode ),
                ...state.data.dates
            ];

            const { init } = state.uiux;
            init.dates.process = { isResponseOk: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, dates } };

        } case 'INIT_NEXT_DATES': {

            const { nextDates, dateFrom, dateTill, entriesMode } = action.payload;
            const dates = [
                ...state.data.dates,
                ...initDates( nextDates, dateFrom, dateTill, entriesMode )
            ];

            const { init } = state.uiux;
            init.dates.process = { isResponseOk: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, dates } };

        } default: {
            throw new Error();
        }
    }
}

export default datesReducer;
