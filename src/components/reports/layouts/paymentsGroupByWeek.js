import { dateToYYYYMMDD, YYYYMMDDToDate, YYYYMMDDToRepr, shiftDate } from '../../core/helpers/dates';
import { calculateTotals, normalizeRowAmounts, normalizeTotals } from './paymentsGroupBy';

const cols = {
    count: { width: 20, align: 'center' },
    week: { width: 70, align: 'left' },
    revenue: { width: 20, align: 'right' },
    revenue100: { width: 10, align: 'right' },
    expense: { width: 20, align: 'right' },
    expense100: { width: 10, align: 'right' },
    difference: { width: 20, align: 'right' },
};

const labels = ( lexicon ) => ( {
    count: lexicon.reports.count,
    week: lexicon.reports.week,
    revenue: lexicon.payments.revenue,
    revenue100: lexicon.reports.revenue100,
    expense: lexicon.payments.expense,
    expense100: lexicon.reports.expense100,
    difference: lexicon.reports.difference,
} )

const normalizeRows = ( { lexicon, result, totals } ) => {
    result.forEach( row => {
        let dateFrom = YYYYMMDDToDate( row.week );
        let dateTill = shiftDate( dateFrom, 6 );
        dateFrom = YYYYMMDDToRepr( dateToYYYYMMDD( dateFrom ) );
        dateTill = YYYYMMDDToRepr( dateToYYYYMMDD( dateTill ) );
        row.week = `${ dateFrom } - ${ dateTill }`;

        row = normalizeRowAmounts( { row, totals } );
    } );

    return result;
}

export default { cols, labels, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };
export { cols, labels, calculateTotals, normalizeRows, normalizeRowAmounts, normalizeTotals };