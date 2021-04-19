import { YYYYMMDDToRepr } from '../../core/helpers/dates';

import paymentsReport from '../layouts/payments';
import paymentsGroupByMonthReport from '../layouts/paymentsGroupByMonth';
import paymentsGroupByWeekReport from '../layouts/paymentsGroupByWeek';
import paymentsGroupByGenreReport from '../layouts/paymentsGroupByGenre';
import paymentsGroupByFundReport from '../layouts/paymentsGroupByFund';

import { reportPDF } from './reportPDF';

const paymentsPDF = ( { lexicon, username, diary_title, type, descr, groupBy, dateFrom, dateTill, genre_name, fund_name, result } ) => {

    const overHeader = diary_title;

    const header = `${ descr }`;

    const underHeader = 
        (
            `[ ${ lexicon.reports.dateFrom }: ${ YYYYMMDDToRepr( dateFrom ) } ` +
            `${ lexicon.reports.dateTill }: ${ YYYYMMDDToRepr( dateTill ) } ]`
        ) +

        ( genre_name 
            ? ` [ ${ lexicon.payments.genre_name }: ${ genre_name } ]`
            : '' 
        ) +

        ( fund_name
            ? ` [ ${ lexicon.payments.fund_name }: ${ fund_name } ]`
            : '' 
        );
    
    const reportModule = 
        groupBy === 'month' ? paymentsGroupByMonthReport :
        groupBy === 'week' ? paymentsGroupByWeekReport :
        groupBy === 'genre' ? paymentsGroupByGenreReport :
        groupBy === 'fund' ? paymentsGroupByFundReport :
        paymentsReport;

    const cols = reportModule.cols;

    const labels = reportModule.labels( lexicon );

    let totals = reportModule.calculateTotals( { result } );

    result = reportModule.normalizeRows( { lexicon, result, totals } );

    totals = reportModule.normalizeTotals( { totals, lexicon } );

    const footer = `${ username }, ${ ( new Date() ).toLocaleString() }, ${ lexicon.reports.page }: `;

    reportPDF( { overHeader, header, underHeader, cols, labels, result, totals, footer } );
}

export  { paymentsPDF };