import { convertFieldTo } from '../core/stages';
import { matchPayments, groupMonth, sortMonth } from './stages';

const paymentsGroupByFund = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } ) => {

    const matchDocuments = matchPayments( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            month: { $substr: [ "$date", 0, 6 ] },
            expense: convertFieldTo( 'type_specs.expense', 'decimal' ),
            revenue: convertFieldTo( 'type_specs.revenue', 'decimal' ),
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            month: 1,
            expense: convertFieldTo( 'expense', 'double' ),
            revenue: convertFieldTo( 'revenue', 'double' ),
            count: 1
        }
    }
    
    const stages = [ 
        matchDocuments,
        projectFields1,
        groupMonth,
        projectFields2,
        sortMonth,
    ];

    return stages;
}

export default paymentsGroupByFund;
export { paymentsGroupByFund };