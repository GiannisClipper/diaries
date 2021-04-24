import { YYYYMMDDToRepr } from '../../core/helpers/dates';

const cols = {
    sn: { width: 10, align: 'center' },
    date: { width: 20, align: 'center' },
    genre_name: { width: 70, align: 'left' },
    duration: { width: 20, align: 'right' },
    distance: { width: 20, align: 'right' },
    equip_name: { width: 70, align: 'left' },
    remark: { width: 70, align: 'left' },
};

const labels = ( lexicon ) => ( {
    sn: lexicon.reports.sn,
    date: lexicon.entries.date,
    genre_name: lexicon.workouts.genre_name,
    duration: lexicon.workouts.duration,
    distance: lexicon.workouts.distance,
    equip_name: lexicon.workouts.equip_name,
    remark: lexicon.workouts.remark,
} )

const normalizeRows = ( { result } ) => {

    let sn = 0;

    result.forEach( row => {
        row.sn = ++sn;
        row.date = YYYYMMDDToRepr( row.date );
    } );

    return result;
}

const calculateTotals = ( { result } ) => {
    
    const totals = {
        duration: 0,
        distance: 0,
    };

    result.forEach( x => {
        let duration = parseFloat( x.duration );
        let distance = parseFloat( x.distance );
        totals.duration += isNaN( duration ) ? 0 : duration;
        totals.distance += isNaN( distance ) ? 0 : distance;
    } );

    return totals;
}

const normalizeTotals = ( { totals, lexicon } ) => {
    totals.duration = totals.duration.toFixed( 0 );
    totals.distance = totals.distance.toFixed( 3 );

    return totals;
}

export default { cols, labels, normalizeRows, calculateTotals, normalizeTotals };
export { cols, labels, normalizeRows, calculateTotals, normalizeTotals };