import { YYYYMMDDToRepr } from '../../core/helpers/dates';
import { stringToTime, timeToSeconds, secondsToTime, timeToString } from '../../core/helpers/times';
import { pace, speed } from '../../workouts/helpers/speedAndPace';

const cols = {
    sn: { width: 10, align: 'center' },
    date: { width: 20, align: 'center' },
    genre_name: { width: 50, align: 'left' },
    distance: { width: 20, align: 'right' },
    duration: { width: 20, align: 'right' },
    pace: { width: 20, align: 'right' },
    speed: { width: 20, align: 'right' },
    equip_name: { width: 50, align: 'left' },
    remark: { width: 70, align: 'left' },
};

const labels = ( lexicon ) => ( {
    sn: lexicon.reports.sn,
    date: lexicon.entries.date,
    genre_name: lexicon.workouts.genre_name,
    distance: lexicon.workouts.distance,
    duration: lexicon.workouts.duration,
    pace: lexicon.workouts.pace,
    speed: lexicon.workouts.speed,
    equip_name: lexicon.workouts.equip_name,
    remark: lexicon.workouts.remark,
} )

const calculateTotals = ( { result } ) => {
    
    const totals = {
        duration: 0,
        distance: 0,
    };

    result.forEach( x => {
        let duration = stringToTime( x.duration );
        duration = duration ? timeToSeconds( duration ) : 0;
        let distance = parseFloat( x.distance );
        totals.duration += isNaN( duration ) ? 0 : duration;
        totals.distance += isNaN( distance ) ? 0 : distance;
    } );

    return totals;
}

const normalizeRows = ( { result } ) => {

    let sn = 0;

    result.forEach( row => {
        row.sn = ++sn;
        row.date = YYYYMMDDToRepr( row.date );
        row.pace = pace( { duration: row.duration, distance: row.distance } );
        row.speed = speed( { duration: row.duration, distance: row.distance } );
    } );

    return result;
}

const normalizeTotals = ( { totals, lexicon } ) => {
    totals.duration = secondsToTime( totals.duration );
    totals.duration = timeToString( totals.duration );
    totals.distance = totals.distance.toFixed( 3 );

    return totals;
}

export default { cols, labels, calculateTotals, normalizeRows, normalizeTotals };
export { cols, labels, calculateTotals, normalizeRows, normalizeTotals };