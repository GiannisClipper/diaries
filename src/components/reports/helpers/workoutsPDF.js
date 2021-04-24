import { YYYYMMDDToRepr } from '../../core/helpers/dates';

import workoutsReport from '../layouts/workouts';
// import workoutsGroupByMonthReport from '../layouts/workoutsGroupByMonth';
// import workoutsGroupByWeekReport from '../layouts/workoutsGroupByWeek';
// import workoutsGroupByGenreReport from '../layouts/workoutsGroupByGenre';
// import workoutsGroupByFundReport from '../layouts/workoutsGroupByFund';

import { reportPDF } from './reportPDF';

const workoutsPDF = ( { lexicon, username, diary_title, type, descr, groupBy, dateFrom, dateTill, genre_name, equip_name, result } ) => {

    const overHeader = diary_title;

    const header = `${ descr }`;

    const underHeader = 
        (
            `[ ${ lexicon.reports.dateFrom }: ${ YYYYMMDDToRepr( dateFrom ) } ` +
            `${ lexicon.reports.dateTill }: ${ YYYYMMDDToRepr( dateTill ) } ]`
        ) +

        ( genre_name 
            ? ` [ ${ lexicon.workouts.genre_name }: ${ genre_name } ]`
            : '' 
        ) +

        ( equip_name
            ? ` [ ${ lexicon.workouts.equip_name }: ${ equip_name } ]`
            : '' 
        );
    
    const reportModule = 
        // groupBy === 'month' ? workoutsGroupByMonthReport :
        // groupBy === 'week' ? workoutsGroupByWeekReport :
        // groupBy === 'genre' ? workoutsGroupByGenreReport :
        // groupBy === 'equip' ? workoutsGroupByFundReport :
        workoutsReport;

    const cols = reportModule.cols;

    const labels = reportModule.labels( lexicon );

    let totals = reportModule.calculateTotals( { result } );

    result = reportModule.normalizeRows( { lexicon, result, totals } );

    totals = reportModule.normalizeTotals( { totals, lexicon } );

    const footer = `${ username }, ${ ( new Date() ).toLocaleString() }, ${ lexicon.reports.page }: `;

    reportPDF( { overHeader, header, underHeader, cols, labels, result, totals, footer } );
}

export  { workoutsPDF };