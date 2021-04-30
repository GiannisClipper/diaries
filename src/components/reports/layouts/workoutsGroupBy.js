import { stringToTime, timeToSeconds, secondsToTime, timeToString } from '../../core/helpers/times';
import { pace, speed } from '../../workouts/helpers/speedAndPace';

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
        count: 0,
        duration: 0,
        distance: 0,
    };

    result.forEach( row => {
        const count = parseFloat( row.count );
        const distance = parseFloat( row.distance );
        const duration = parseFloat( row.duration );
        totals.count += isNaN( count ) ? 0 : count;
        totals.distance += isNaN( distance ) ? 0 : distance;
        totals.duration += isNaN( duration ) ? 0 : duration;
    } );

    return totals;
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

const normalizeTotals = ( { totals, lexicon } ) => {
    totals.count = totals.count.toFixed( 0 );
    totals.duration = secondsToTime( totals.duration );
    totals.duration = timeToString( totals.duration );
    totals.distance = totals.distance.toFixed( 3 );

    return totals;
}

export default { normalizeResult, calculateTotals, normalizeRowAmounts, normalizeTotals };
export { normalizeResult, calculateTotals, normalizeRowAmounts, normalizeTotals };