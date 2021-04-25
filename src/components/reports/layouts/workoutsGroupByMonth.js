import { normalizeTotals } from './workouts';
import { stringToTime, timeToSeconds, secondsToTime, timeToString } from '../../core/helpers/times';
import { pace, speed } from '../../workouts/helpers/speedAndPace';

const cols = {
    count: { width: 20, align: 'center' },
    month: { width: 70, align: 'left' },
    distance: { width: 20, align: 'right' },
    distance100: { width: 10, align: 'right' },
    duration: { width: 20, align: 'right' },
    duration100: { width: 10, align: 'right' },
    pace: { width: 20, align: 'right' },
    speed: { width: 20, align: 'right' },
};

const labels = ( lexicon ) => ( {
    count: lexicon.reports.count,
    month: lexicon.reports.month,
    distance: lexicon.workouts.distance,
    distance100: lexicon.reports.distance100,
    duration: lexicon.workouts.duration,
    duration100: lexicon.reports.duration100,
    pace: lexicon.workouts.pace,
    speed: lexicon.workouts.speed,
} )

const normalizeResult = ( { result } ) => {
    result.forEach( row => {
        let durations = row.duration;
        durations = durations.map( x => stringToTime( x ) );
        durations = durations.map( x => x ? timeToSeconds( x ) : 0 );
        row.duration = durations.reduce( ( total, x ) => total + x, 0 );
    } );

    return result;
}

const calculateTotals = ( { result } ) => {
    
    const totals = {
        duration: 0,
        distance: 0,
    };

    result.forEach( row => {
        let distance = parseFloat( row.distance );
        let duration = parseFloat( row.duration );
        totals.distance += isNaN( distance ) ? 0 : distance;
        totals.duration += isNaN( duration ) ? 0 : duration;
    } );

    return totals;
}

const normalizeRows = ( { lexicon, result, totals } ) => {
    result.forEach( row => {
        const year = row.month.substring( 0, 4 );
        const month = lexicon.core.months[ parseInt( row.month.substring( 4, 6 ) ) - 1 ];
        row.month = `${ month } ${ year }`;

        row = normalizeRowAmounts( { row, totals } );
    } );

    return result;
}

const normalizeRowAmounts = ( { row, totals } ) => {
    row.distance100 = row.distance !== 0 ? ( 100 / ( totals.distance / row.distance ) ) : 0;
    row.duration100 = row.duration !== 0 ? ( 100 / ( totals.duration / row.duration ) ) : 0;

    row.distance100 = row.distance100.toFixed( 1 );
    row.duration100 = row.duration100.toFixed( 1 );

    row.duration = secondsToTime( row.duration );
    row.duration = timeToString( row.duration );

    row.pace = pace( { duration: row.duration, distance: row.distance } );
    row.speed = speed( { duration: row.duration, distance: row.distance } );

    return row;
}

export default { cols, labels, normalizeResult, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };
export { cols, labels, normalizeResult, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };