import { calculateTotals, normalizeRowAmounts, normalizeTotals } from './paymentsGroupBy';

const cols = {
    count: { width: 20, align: 'center' },
    genre_code: { width: 30, align: 'left' },
    genre_name: { width: 70, align: 'left' },
    revenue: { width: 20, align: 'right' },
    revenue100: { width: 10, align: 'right' },
    expense: { width: 20, align: 'right' },
    expense100: { width: 10, align: 'right' },
    difference: { width: 20, align: 'right' },
};

const labels = ( lexicon ) => ( {
    count: lexicon.reports.count,
    genre_code: lexicon.payment_genres.code,
    genre_name: lexicon.payment_genres.name,
    revenue: lexicon.payments.revenue,
    revenue100: lexicon.reports.revenue100,
    expense: lexicon.payments.expense,
    expense100: lexicon.reports.expense100,
    difference: lexicon.reports.difference,
} )

const normalizeRows = ( { lexicon, result, totals } ) => {
    result.forEach( row => {
        row = normalizeRowAmounts( { row, totals } );
    } );

    return result;
}

export default { cols, labels, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };
export { cols, labels, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };