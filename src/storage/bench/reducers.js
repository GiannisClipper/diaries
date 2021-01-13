import { benchSchema, datesSchema, entriesSchema, entrySchema } from '../../storage/schemas';
import { shiftDate } from '../../helpers/dates';

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
        entry._uiux.process = { isResponseWaiting: true };
        date.entries.push( entry );

        return date;
    } );
}

const benchReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_INIT': {
            const { _uiux } = state;
            const { mode } = action.payload;
            _uiux.mode = mode;
            _uiux.process = { isInit: true };

            return { ...state, _uiux };

        } case 'INIT_START_PERIOD': {
            const { _uiux } = state;
            const { startDate, days } = action.payload;
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
            _uiux.process = {};

            return { ...state, periods, _uiux };

        } case 'INIT_PREV_PERIOD': {
            let { periods, _uiux } = state;
            const { days } = action.payload;
            const firstPeriod = periods[ 0 ];
            const firstDate = firstPeriod.dates[ 0 ].date;
            const prevDates = calcDates( firstDate, -days );
            const dates = [ ...initDates( prevDates ) ];
            const period = datesSchema();
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
            const period = datesSchema();
            period.dates = dates;
            periods = [ ...periods, period ];
            _uiux.process = {};

            return { ...state, periods, _uiux };

        } default: {
            return undefined;
        }
    }
}

export { benchReducer };
