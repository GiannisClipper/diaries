import { YYYYMMDDToRepr } from '../../core/helpers/dates';

import paymentsReport from '../assets/reports/payments';
import paymentsGroupByMonthReport from '../assets/reports/paymentsGroupByMonth';

import { reportPDF } from './reportPDF';

const paymentsPDF = ( { lexicon, username, diary_title, type, descr, dateFrom, dateTill, groupBy, result } ) => {

    const overTitle = `${ username } > ${ diary_title }`;

    const title = `${ descr } (${ YYYYMMDDToRepr( dateFrom ) }-${ YYYYMMDDToRepr( dateTill ) })`;

    const underTitle = 'filters goes here';

    const reportModule = 
        ( groupBy === 'month' ) ? paymentsGroupByMonthReport :
        // ( type === 'payment' && groupBy === 'week' ) ? paymentsGroupByWeekReport :
        // ( type === 'payment' && groupBy === 'genre' ) ? paymentsGroupByGenreReport :
        // ( type === 'payment' && groupBy === 'fund' ) ? paymentsGroupByFundReport :
        ( type === 'payment' ) ? paymentsReport : undefined;

    const cols = reportModule.cols;

    const labels = reportModule.labels( lexicon );

    let totals = reportModule.calculateTotals( { result } );

    result = reportModule.normalizeRows( { result, totals } );

    totals = reportModule.normalizeTotals( { totals, lexicon } );

    console.log( cols )
    console.log( labels )
    console.log( result )
    console.log( totals )
    reportPDF( { title, cols, labels, result, totals } );
}

export  { paymentsPDF };