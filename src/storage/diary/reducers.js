import { periodSchema, dateSchema, entrySchema } from '../../storage/schemas';
import { shiftDate } from '../../helpers/dates';

const diariesReducer = ( state, action ) => {

    switch ( action.type ) {

        default: {
            throw new Error();
        }
    }
}

const calcDates = ( startDate, days ) => {
    startDate = days < 0
        ? shiftDate( startDate, days )
        : shiftDate( startDate, 1 );

    const dates = new Array( Math.abs( days ) )
        .fill( undefined )
        .map( ( x, index ) => shiftDate( startDate, index ) );

    return dates;
}

const initDates = dates => {
    
    return dates.map( x => {
        const central = dates.length === 1 ? dates[ 0 ] : null;
        const date = dateSchema();

        date.date = x;
        date._uiux.isTheCentral = central && date.date.getTime() === central.getTime() ? true : false;

        const entry = entrySchema();
        entry._uiux.process = { isResponseWaiting: true };
        date.entries.push( entry );

        // if ( x === dateFrom ) {
        //     // this entry will make a db request for all the corresponded dates
        //     date.entries[ 0 ]._uiux.dateFrom = dateFrom;
        //     date.entries[ 0 ]._uiux.dateTill = dateTill;
        //     date.entries[ 0 ]._uiux.mode = { isRetrieveMany: true };
        //     date.entries[ 0 ]._uiux.process = { isRequestBefore: true }

        // } else {
        //     date.entries[ 0 ]._uiux.process = { isResponseWaiting: true };
        // }

        return date;
    } );
}

const diaryReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_INIT': {
            const { _uiux } = state;
            const { mode } = action.payload;
            _uiux.mode = mode;
            _uiux.process = { isInit: true };

            return { ...state, _uiux };

        } case 'INIT_START_PERIOD': {
            const { _uiux } = state;
            const { centralDate, days } = action.payload;
            const prevDates = calcDates( centralDate, -days );
            const nextDates = calcDates( centralDate, days );
            const dates = [
                ...initDates( prevDates ),
                ...initDates( [ centralDate ] ),
                ...initDates( nextDates )
            ];
            const period = periodSchema();
            period.dates = dates;

            const periods = [ period ];
            _uiux.process = {};

            return { ...state, periods, _uiux };

        } case 'INIT_PREV_PERIOD': {
            let { periods, _uiux } = state;
            const { days } = action.payload;
            const firstPeriod = periods[ 0 ];
            const firstDate = firstPeriod.dates[ 0 ].date;
            const prevDates = calcDates( firstDate, -days );
            const dates = [ ...initDates( prevDates ) ];
            const period = periodSchema();
            period.dates = dates;
            periods = [ period, ...periods ];
            _uiux.process = {};

            return { ...state, periods, _uiux };

        } case 'INIT_NEXT_PERIOD': {
            let { periods, _uiux } = state;
            const { days } = action.payload;
            const lastPeriod = periods[ periods.length -1 ];
            const lastDate = lastPeriod.dates[ lastPeriod.dates.length - 1 ].date;
            const nextDates = calcDates( lastDate, days );
            const dates = [ ...initDates( nextDates ) ];
            const period = periodSchema();
            period.dates = dates;
            periods = [ ...periods, period ];
            _uiux.process = {};

            return { ...state, periods, _uiux };

        } default: {
            throw new Error();
        }
    }
}

export { diariesReducer, diaryReducer };
