import {
    splitWeeks,
    YYYYMMDDToDate,
    dateToYYYYMMDD,
} from '../../components/core/helpers/dates';

import {
    convertFieldTo,
    groupWeek,
    sortWeek,
} from './aggregation';

const paymentsGroupByWeek = ( { diary_id, type, dateFrom, dateTill } ) => {

    // let tempDate = YYYYMMDDToDate( dateFrom );
    // const dayOfWeek = tempDate.getDay();
    // const days = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    // tempDate = shiftDate( tempDate, -days );

    // const weeks = [];
    // while ( dateToYYYYMMDD( tempDate ) <= dateTill ) {
    //     const date1 = dateToYYYYMMDD( tempDate );
    //     const date2 = dateToYYYYMMDD( shiftDate( tempDate, 6 ) );
    //     weeks.push( `${ date1 }-${ date2 }` );
    //     tempDate = shiftDate( tempDate, 7 );
    // }

    const weeks = splitWeeks( YYYYMMDDToDate( dateFrom ), YYYYMMDDToDate( dateTill ) );
    const lastDate = weeks[ weeks.length - 1 ].dateTill;
    weeks.push( { dateFrom: lastDate, dateTill: lastDate } );  // to support the operation of `bucket.boundaries` in `groupWeek` stage
    weeks.forEach( ( x, i ) => weeks[ i ] = `${ dateToYYYYMMDD( x.dateFrom ) }-${ dateToYYYYMMDD( x.dateTill ) }` );

    // for ( let i = 0; i < weeks.length ; i++ ) {
    //     weeks[ i ] = `${weeks[ i ].dateFrom}-${weeks[ i ].dateTill}`;
    // }

    const matchDocuments = { 
        $match: {
            diary_id,
            type,
            date: { 
                $gte: dateFrom, 
                $lte: dateTill
            }
        }
    };
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            date: "$date",
            expense: convertFieldTo( 'expense', 'decimal' ),
            revenue: convertFieldTo( 'revenue', 'decimal' ),
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