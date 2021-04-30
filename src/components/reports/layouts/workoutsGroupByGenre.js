import { normalizeResult, calculateTotals, normalizeRowAmounts, normalizeTotals } from './workoutsGroupBy';

const cols = {
    count: { width: 20, align: 'center' },
    genre_code: { width: 30, align: 'left' },
    genre_name: { width: 70, align: 'left' },
    distance: { width: 20, align: 'right' },
    distance100: { width: 10, align: 'right' },
    duration: { width: 20, align: 'right' },
    duration100: { width: 10, align: 'right' },
    pace: { width: 20, align: 'right' },
    speed: { width: 20, align: 'right' },
};

const labels = ( lexicon ) => ( {
    count: lexicon.reports.count,
    genre_code: lexicon.workout_genres.code,
    genre_name: lexicon.workout_genres.name,
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
