import { calculateTotals } from './payments';
import { normalizeAmounts, normalizeTotals } from './paymentsGroupByMonth';

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
    count: lexicon.report.count,
    genre_code: lexicon.paymentGenre.code,
    genre_name: lexicon.paymentGenre.name,
    revenue: lexicon.payment.revenue,
    revenue100: lexicon.report.revenue100,
    expense: lexicon.payment.expense,
    expense100: lexicon.report.expense100,
    difference: lexicon.report.difference,
} )

const normalizeRows = ( { lexicon, result, totals } ) => {
    result.forEach( row => {
        row = normalizeAmounts( { row, totals } );
    } );

    return result;
}

export default { cols, labels, normalizeAmounts, normalizeRows, calculateTotals, normalizeTotals };
export { cols, labels, normalizeAmounts, normalizeRows, calculateTotals, normalizeTotals };