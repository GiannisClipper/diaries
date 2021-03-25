import { calculateTotals } from './payments';

const cols = {
    count: { width: 20, align: 'right' },
    month: { width: 70, align: 'left' },
    revenue: { width: 20, align: 'right' },
    revenue100: { width: 10, align: 'right' },
    expense: { width: 20, align: 'right' },
    expense100: { width: 10, align: 'right' },
    difference: { width: 20, align: 'right' },
};

const labels = ( lexicon ) => ( {
    count: lexicon.report.count,
    month: lexicon.report.month,
    revenue: lexicon.payment.revenue,
    revenue100: lexicon.report.revenue100,
    expense: lexicon.payment.expense,
    expense100: lexicon.report.expense100,
    difference: lexicon.report.difference,
} )

const normalizeRows = ( { result, totals } ) => {
    result.forEach( x => {
        x.count = `${ x.count }`;
        x.revenue100 = ( 100 / ( totals.revenue / x.revenue ) ).toFixed( 1 );
        x.expense100 = ( 100 / ( totals.expense / x.expense ) ).toFixed( 1 );
        x.difference = ( x.revenue - x.expense ).toFixed( 2 );
        x.revenue = `${ x.revenue }`;
        x.expense = `${ x.expense }`;
    } );

    return result;
}

const normalizeTotals = ( { totals } ) => {
    totals.difference = ( totals.revenue - totals.expense ).toFixed( 2 );
    totals.revenue = totals.revenue.toFixed( 2 );
    totals.expense = totals.expense.toFixed( 2 );

    return totals;
}

export default { cols, labels, normalizeRows, calculateTotals, normalizeTotals };
export { cols, labels, normalizeRows, calculateTotals, normalizeTotals };