const calculateTotals = ( { result } ) => {
    
    const totals = {
        count: 0,
        revenue: 0,
        expense: 0,
    };

    result.forEach( x => {
        const count = parseFloat( x.count );
        const revenue = parseFloat( x.revenue );
        const expense = parseFloat( x.expense );
        totals.count += isNaN( count ) ? 0 : count;
        totals.revenue += isNaN( revenue ) ? 0 : revenue;
        totals.expense += isNaN( expense ) ? 0 : expense;
    } );

    return totals;
}

const normalizeRowAmounts = ( { row, totals } ) => {
    row.revenue100 = row.revenue !== 0 ? ( 100 / ( totals.revenue / row.revenue ) ) : 0;
    row.expense100 = row.expense !== 0 ? ( 100 / ( totals.expense / row.expense ) ) : 0;

    row.revenue100 = row.revenue100.toFixed( 1 );
    row.expense100 = row.expense100.toFixed( 1 );

    row.difference = ( row.revenue - row.expense ).toFixed( 2 );

    return row;
}

const normalizeTotals = ( { totals } ) => {
    totals.count = totals.count.toFixed( 0 );
    totals.difference = ( totals.revenue - totals.expense ).toFixed( 2 );
    totals.revenue = totals.revenue.toFixed( 2 );
    totals.expense = totals.expense.toFixed( 2 );

    return totals;
}

export default { calculateTotals, normalizeRowAmounts, normalizeTotals };
export { calculateTotals, normalizeRowAmounts, normalizeTotals };