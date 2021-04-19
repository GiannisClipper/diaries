import { calculateTotals } from './payments';
import { normalizeAmounts, normalizeTotals } from './paymentsGroupByMonth';

const cols = {
    count: { width: 20, align: 'center' },
    fund_code: { width: 30, align: 'left' },
    fund_name: { width: 70, align: 'left' },
    revenue: { width: 20, align: 'right' },
    revenue100: { width: 10, align: 'right' },
    expense: { width: 20, align: 'right' },
    expense100: { width: 10, align: 'right' },
    difference: { width: 20, align: 'right' },
};

const labels = ( lexicon ) => ( {
    count: lexicon.reports.count,
    fund_code: lexicon.paymentFunds.code,
    fund_name: lexicon.paymentFunds.name,
    revenue: lexicon.payments.revenue,
    revenue100: lexicon.reports.revenue100,
    expense: lexicon.payments.expense,
    expense100: lexicon.reports.expense100,
    difference: lexicon.reports.difference,
} )

const normalizeRows = ( { lexicon, result, totals } ) => {
    result.forEach( row => {
        row = normalizeAmounts( { row, totals } );
    } );

    return result;
}

export default { cols, labels, normalizeAmounts, normalizeRows, calculateTotals, normalizeTotals };
export { cols, labels, normalizeAmounts, normalizeRows, calculateTotals, normalizeTotals };