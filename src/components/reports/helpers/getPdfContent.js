import { YYYYMMDDToRepr } from '../../core/helpers/dates';

import paymentsReport from '../layouts/payments';
import paymentsGroupByMonthReport from '../layouts/paymentsGroupByMonth';
import paymentsGroupByWeekReport from '../layouts/paymentsGroupByWeek';
import paymentsGroupByGenreReport from '../layouts/paymentsGroupByGenre';
import paymentsGroupByFundReport from '../layouts/paymentsGroupByFund';

import workoutsReport from '../layouts/workouts';
// import workoutsGroupByMonthReport from '../layouts/workoutsGroupByMonth';
// import workoutsGroupByWeekReport from '../layouts/workoutsGroupByWeek';
// import workoutsGroupByGenreReport from '../layouts/workoutsGroupByGenre';
// import workoutsGroupByFundReport from '../layouts/workoutsGroupByFund';

const getPdfContent = ( { 
    lexicon, 
    username, 
    diary_title, 
    type, 
    descr, 
    groupBy, 
    dateFrom, 
    dateTill, 
    genre_name, 
    fund_name, 
    equip_name, 
    result 
} ) => {

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
        ) +

        ( equip_name
            ? ` [ ${ lexicon.payments.equip_name }: ${ equip_name } ]`
            : '' 
        );

    const reportModule = 
        type ==='payment' && groupBy === 'month' ? paymentsGroupByMonthReport :
        type ==='payment' && groupBy === 'week' ? paymentsGroupByWeekReport :
        type ==='payment' && groupBy === 'genre' ? paymentsGroupByGenreReport :
        type ==='payment' && groupBy === 'fund' ? paymentsGroupByFundReport :
        type ==='payment' ? paymentsReport :
        // type ==='workout' && groupBy === 'month' ? workoutsGroupByMonthReport :
        // type ==='workout' && groupBy === 'week' ? workoutsGroupByWeekReport :
        // type ==='workout' && groupBy === 'genre' ? workoutsGroupByGenreReport :
        // type ==='workout' && groupBy === 'equip' ? workoutsGroupByFundReport :
        type ==='workout' ? workoutsReport : null;

    const cols = reportModule.cols;

    const labels = reportModule.labels( lexicon );

    let totals = reportModule.calculateTotals( { result } );

    result = reportModule.normalizeRows( { lexicon, result, totals } );

    totals = reportModule.normalizeTotals( { totals, lexicon } );

    const footer = `${ username }, ${ ( new Date() ).toLocaleString() }, ${ lexicon.reports.page }: `;

    return { overHeader, header, underHeader, cols, labels, result, totals, footer };
}

export  { getPdfContent };