import { convertFieldTo, reduceField } from '../core/stages';
import { matchPayments, groupFund, lookupFund, sortFund } from './paymentsStages';

const paymentsGroupByFund = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } ) => {

    const matchDocuments = matchPayments( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            fund_id: convertFieldTo( 'type_specs.fund_id', 'objectId' ),
            expense: convertFieldTo( 'type_specs.expense', 'decimal' ),
            revenue: convertFieldTo( 'type_specs.revenue', 'decimal' ),
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            fund_code: reduceField( 'fund_.code' ),
            fund_name: reduceField( 'fund_.name' ),
            expense: convertFieldTo( 'expense', 'double' ),
            revenue: convertFieldTo( 'revenue', 'double' ),
            count: 1
        }
    }
    
    const stages = [ 
        matchDocuments,
        projectFields1,
        groupFund,
        lookupFund,
        projectFields2,
        sortFund,
    ];

    return stages;
}

export default paymentsGroupByFund;
export { paymentsGroupByFund };