import { YYYYMMDDToRepr } from '../../../core/helpers/dates';

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
    sn: lexicon.report.sn,
    date: lexicon.entry.date,
    genre_name: lexicon.payment.genre_name,
    revenue: lexicon.payment.revenue,
    expense: lexicon.payment.expense,
    fund_name: lexicon.payment.fund_name,
    remark: lexicon.payment.remark,
} )

const normalizeRows = ( { result } ) => {

    let sn = 0;

    result.forEach( x => {
        x.sn = `${ ++sn }`;
        x.date = YYYYMMDDToRepr( x.date );
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
    totals.remark = `${ lexicon.report.difference } = ${ ( totals.revenue - totals.expense ).toFixed( 2 ) }`;
    totals.revenue = totals.revenue.toFixed( 2 );
    totals.expense = totals.expense.toFixed( 2 );

    return totals;
}

export default { cols, labels, normalizeRows, calculateTotals, normalizeTotals };
export { cols, labels, normalizeRows, calculateTotals, normalizeTotals };