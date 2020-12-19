import { initDate, initEntry } from './schemas';

const initDates = ( dates, dateFrom, dateTill ) => {
    
    return dates.map( x => {
        const centralDate = dates.length === 1 ? dates[ 0 ] : null;
        const date = initDate();

        date.data.date = x;
        date.uiux.isTheCentral = centralDate && date.data.date.getTime() === centralDate.getTime() ? true : false;

        date.data.entries.push( initEntry() );

        if ( x === dateFrom ) {
            // this entry will make a db request for all the corresponded dates
            date.data.entries[ 0 ].uiux.dateFrom = dateFrom;
            date.data.entries[ 0 ].uiux.dateTill = dateTill;
            date.data.entries[ 0 ].uiux.mode = { isRetrieveMany: true };
            date.data.entries[ 0 ].uiux.process = { isRequestBefore: true }

        } else {
            date.data.entries[ 0 ].uiux.process = { isResponseWaiting: true };
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
            init.dates.process = { isInit: true };

            return { ...state, uiux: { ...state.uiux, init } };

        } case 'INIT_START_DATES': {

            const { prevDates, centralDate, nextDates, dateFrom, dateTill } = action.payload;
            const dates = [ 
                ...initDates( prevDates, dateFrom, dateTill ), 
                ...initDates( [ centralDate ], dateFrom, dateTill ),
                ...initDates( nextDates, dateFrom, dateTill )
            ];

            const { init } = state.uiux;
            init.dates.process = {};

            return { uiux: { ...state.uiux, init }, data: { ...state.data, dates } };

        } case 'INIT_PREV_DATES': {

            const { prevDates, dateFrom, dateTill } = action.payload;
            const dates = [
                ...initDates( prevDates, dateFrom, dateTill ),
                ...state.data.dates
            ];

            const { init } = state.uiux;
            init.dates.process = {};

            return { uiux: { ...state.uiux, init }, data: { ...state.data, dates } };

        } case 'INIT_NEXT_DATES': {

            const { nextDates, dateFrom, dateTill } = action.payload;
            const dates = [
                ...state.data.dates,
                ...initDates( nextDates, dateFrom, dateTill )
            ];

            const { init } = state.uiux;
            init.dates.process = {};

            return { uiux: { ...state.uiux, init }, data: { ...state.data, dates } };

        } default: {
            throw new Error();
        }
    }
}

export default datesReducer;
