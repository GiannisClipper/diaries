import { YYYYMMDDToRepr } from '../../core/helpers/dates';
import { getFromList } from '../../core/helpers/getFromList';

import { reportPDF } from './reportPDF';

const paymentsPDF = ( { lexicon, descr, dateFrom, dateTill, result, genres, funds } ) => {

    const title = `${ descr } (${ YYYYMMDDToRepr( dateFrom ) }-${ YYYYMMDDToRepr( dateTill ) })`;

    const cols = {
        date: { width: 20, align: 'center' },
        genre_name: { width: 70, align: 'left' },
        revenue: { width: 20, align: 'right' },
        expense: { width: 20, align: 'right' },
        fund_name: { width: 70, align: 'left' },
        remark: { width: 70, align: 'left' },
    };

    const labels = {
        date: lexicon.entry.date,
        genre_name: lexicon.payment.genre_name,
        revenue: lexicon.payment.revenue,
        expense: lexicon.payment.expense,
        fund_name: lexicon.payment.fund_name,
        remark: lexicon.payment.remark,
    };

    result.forEach( x => x.date = YYYYMMDDToRepr( x.date ) );

    const totals = {
        revenue: 0,
        expense: 0,
        remark: `${ lexicon.report.difference } = `,
    };

    result.forEach( x => {
        let revenue = parseFloat( x.revenue );
        let expense = parseFloat( x.expense );
        totals.revenue += isNaN( revenue ) ? 0 : revenue;
        totals.expense += isNaN( expense ) ? 0 : expense;
    } );

    totals.remark += ( totals.revenue - totals.expense ).toFixed( 2 );
    totals.revenue = totals.revenue.toFixed( 2 );
    totals.expense = totals.expense.toFixed( 2 );

    result.forEach( x => {
        x.genre_name = x.genre_id
            ? getFromList( genres, 'id', x.genre_id ).name
            : '';
        x.fund_name = x.fund_id
            ? getFromList( funds, 'id', x.fund_id ).name
            : '';
    } );

    reportPDF( { title, cols, labels, result, totals } );
}

export  { paymentsPDF };