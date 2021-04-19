import { YYYYMMDDToRepr } from '../../core/helpers/dates';

const cols = {
    sn: { width: 10, align: 'center' },
    date: { width: 20, align: 'center' },
    genre_name: { width: 70, align: 'left' },
    revenue: { width: 20, align: 'right' },
    expense: { width: 20, align: 'right' },
    fund_name: { width: 70, align: 'left' },
    remark: { width: 70, align: 'left' },
};

const labels = ( lexicon ) => ( {
    sn: lexicon.reports.sn,
    date: lexicon.entries.date,
    genre_name: lexicon.payments.genre_name,
    revenue: lexicon.payments.revenue,
    expense: lexicon.payments.expense,
    fund_name: lexicon.payments.fund_name,
    remark: lexicon.payments.remark,
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
        revenue: 0,
        expense: 0,
    };

    result.forEach( x => {
        let revenue = parseFloat( x.revenue );
        let expense = parseFloat( x.expense );
        totals.revenue += isNaN( revenue ) ? 0 : revenue;
        totals.expense += isNaN( expense ) ? 0 : expense;
    } );

    return totals;
}

const normalizeTotals = ( { totals, lexicon } ) => {
    totals.remark = `${ lexicon.reports.difference } = ${ ( totals.revenue - totals.expense ).toFixed( 2 ) }`;
    totals.revenue = totals.revenue.toFixed( 2 );
    totals.expense = totals.expense.toFixed( 2 );

    return totals;
}

export default { cols, labels, normalizeRows, calculateTotals, normalizeTotals };
export { cols, labels, normalizeRows, calculateTotals, normalizeTotals };