import { calcWeeksOfRange, calcDateByDaysAddition, setDateStr } from '@giannisclipper/date';
import { convertFieldTo } from '../core/stages';
import { matchPayments, groupWeek, sortWeek } from './paymentsStages';

const paymentsGroupByWeek = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } ) => {

    const weeks = calcWeeksOfRange( dateFrom, dateTill );
    let lastDate = weeks[ weeks.length - 1 ][ 1 ];
    lastDate = calcDateByDaysAddition( lastDate, 1 );
    weeks.push( [ lastDate, lastDate ] );  // due the way that works `bucket.boundaries` in `groupWeek` stage
    weeks.forEach( ( x, i ) => weeks[ i ] = `${ setDateStr( x[ 0 ] ) }` );

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