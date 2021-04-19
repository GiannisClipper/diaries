import { 
    START_PAGE,
    PREV_PAGE,
    NEXT_PAGE,
} from '../../core/assets/types/page';

import { datesSchema } from '../../date/assets/schemas';
import { entriesSchema, entrySchema } from '../../entries/assets/schemas';

import { shiftDate } from '../../core/helpers/dates';

const calcDates = ( dateFrom, days ) => {
    dateFrom = days < 0
        ? shiftDate( dateFrom, days )
        : shiftDate( dateFrom, 1 );

    const dates = new Array( Math.abs( days ) )
        .fill( undefined )
        .map( ( x, index ) => shiftDate( dateFrom, index ) );

    return dates;
}

const initDates = dates => {
    
    return dates.map( x => {
        const central = dates.length === 1 ? dates[ 0 ] : null;
        const date = entriesSchema();

        date.date = x;
        date._uiux.isStartDate = central && date.date.getTime() === central.getTime() ? true : false;

        const entry = entrySchema();
        entry._uiux.status = { isResponseWaiting: true };
        date.entries.push( entry );

        return date;
    } );
}

const pageBenchReducer = ( state, action ) => {

    switch ( action.type ) {

        case START_PAGE: {
            const { assets } = action.payload;
            const { startDate, days } = assets;

            const { _uiux } = state;
            const prevDates = calcDates( startDate, -days );
            const nextDates = calcDates( startDate, days );
            const dates = [
                ...initDates( prevDates ),
                ...initDates( [ startDate ] ),
                ...initDates( nextDates )
            ];
            const period = datesSchema();
            period.dates = dates;

            const periods = [ period ];
            _uiux.page = { isStart: true };

            return { ...state, periods, _uiux };

        } case PREV_PAGE: {
            const { assets } = action.payload;
            const { days } = assets;

            let { periods, _uiux } = state;
            const firstPeriod = periods[ 0 ];
            const firstDate = firstPeriod.dates[ 0 ].date;
            const prevDates = calcDates( firstDate, -days );
            const dates = [ ...initDates( prevDates ) ];
            const period = datesSchema();
            period.dates = dates;

            periods = [ period, ...periods ];
            _uiux.page = { isPrev: true };

            return { ...state, periods, _uiux };

        } case NEXT_PAGE: {
            const { assets } = action.payload;
            const { days } = assets;

            let { periods, _uiux } = state;
            const lastPeriod = periods[ periods.length -1 ];
            const lastDate = lastPeriod.dates[ lastPeriod.dates.length - 1 ].date;
            const nextDates = calcDates( lastDate, days );
            const dates = [ ...initDates( nextDates ) ];
            const period = datesSchema();
            period.dates = dates;

            periods = [ ...periods, period ];
            _uiux.status = { isNext: true };

            return { ...state, periods, _uiux };

        } default: {
            return undefined;
        }
    }
}

export { pageBenchReducer };