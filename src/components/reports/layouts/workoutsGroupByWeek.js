import { normalizeTotals } from './workouts';
import { normalizeResult, calculateTotals, normalizeRowAmounts } from './workoutsGroupByMonth';

const cols = {
    count: { width: 20, align: 'center' },
    week: { width: 70, align: 'left' },
    distance: { width: 20, align: 'right' },
    distance100: { width: 10, align: 'right' },
    duration: { width: 20, align: 'right' },
    duration100: { width: 10, align: 'right' },
    pace: { width: 20, align: 'right' },
    speed: { width: 20, align: 'right' },
};

const labels = ( lexicon ) => ( {
    count: lexicon.reports.count,
    week: lexicon.reports.week,
    distance: lexicon.workouts.distance,
    distance100: lexicon.reports.distance100,
    duration: lexicon.workouts.duration,
    duration100: lexicon.reports.duration100,
    pace: lexicon.workouts.pace,
    speed: lexicon.workouts.speed,
} )

const normalizeRows = ( { lexicon, result, totals } ) => {
    result.forEach( row => {
        row = normalizeRowAmounts( { row, totals } );
    } );

    return result;
}

export default { cols, labels, normalizeResult, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };
export { cols, labels, normalizeResult, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };
