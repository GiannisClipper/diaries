import {
    splitWeeks,
    YYYYMMDDToDate,
    dateToYYYYMMDD,
} from '../../components/core/helpers/dates';

import {
    matchPayments,
    convertFieldTo,
    groupWeek,
    sortWeek,
} from './aggregation';

const paymentsGroupByWeek = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } ) => {

    const weeks = splitWeeks( YYYYMMDDToDate( dateFrom ), YYYYMMDDToDate( dateTill ) );
    const lastDate = weeks[ weeks.length - 1 ].dateTill;
    weeks.push( { dateFrom: lastDate, dateTill: lastDate } );  // to support the operation of `bucket.boundaries` in `groupWeek` stage
    weeks.forEach( ( x, i ) => weeks[ i ] = `${ dateToYYYYMMDD( x.dateFrom ) }-${ dateToYYYYMMDD( x.dateTill ) }` );

    const matchDocuments = matchPayments( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );

    const projectFields1 = { 
        $project: {
            _id: 0,
            date: "$date",
            expense: convertFieldTo( 'type_specs.expense', 'decimal' ),
            revenue: convertFieldTo( 'type_specs.revenue', 'decimal' ),
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            week: "$_id",
            expense: convertFieldTo( 'expense', 'double' ),
            revenue: convertFieldTo( 'revenue', 'double' ),
            count: 1
        }
    }
    
    const stages = [ 
        matchDocuments,
        projectFields1,
        groupWeek( weeks ),
        projectFields2,
        sortWeek,
    ];

    return stages;
}

export default paymentsGroupByWeek;
export { paymentsGroupByWeek };