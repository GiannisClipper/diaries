import { calculateTotals } from './payments';

const cols = {
    count: { width: 20, align: 'center' },
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

const normalizeAmounts = ( { row, totals } ) => {
    row.revenue100 = row.revenue !== 0 ? ( 100 / ( totals.revenue / row.revenue ) ) : 0;
    row.expense100 = row.expense !== 0 ? ( 100 / ( totals.expense / row.expense ) ) : 0;

    row.revenue100 = row.revenue100.toFixed( 1 );
    row.expense100 = row.expense100.toFixed( 1 );

    row.difference = ( row.revenue - row.expense ).toFixed( 2 );

    return row;
}

const normalizeRows = ( { lexicon, result, totals } ) => {
    result.forEach( row => {
        const year = row.month.substring( 0, 4 );
        const month = lexicon.core.months[ parseInt( row.month.substring( 4, 6 ) ) - 1 ];

        row.month = `${ month } ${ year }`;

        row = normalizeAmounts( { row, totals } );
    } );

    return result;
}

const normalizeTotals = ( { totals } ) => {
    totals.difference = ( totals.revenue - totals.expense ).toFixed( 2 );
    totals.revenue = totals.revenue.toFixed( 2 );
    totals.expense = totals.expense.toFixed( 2 );

    return totals;
}

export default { cols, labels, normalizeAmounts, normalizeRows, calculateTotals, normalizeTotals };
export { cols, labels, normalizeAmounts, normalizeRows, calculateTotals, normalizeTotals };