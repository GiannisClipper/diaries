import { convertFieldTo, reduceField } from '../core/stages';
import { matchPayments, lookupGenre, lookupFund, sortDate } from './paymentsStages';

const payments = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } ) => {

    const matchDocuments = matchPayments( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
    
    const selectFields1 = { 
        $project: {
            _id: 0,
            date: 1,
            index: 1,
            type: 1,
            remark: '$type_specs.remark',
            expense: '$type_specs.expense',
            revenue: '$type_specs.revenue',
            genre_id: convertFieldTo( 'type_specs.genre_id', 'objectId' ),
            fund_id: convertFieldTo( 'type_specs.fund_id', 'objectId' )
        }
    }
    
    const selectFields2 = { 
        $project: {
            date: 1,
            index: 1,
            type: 1,
            remark: 1,
            expense: 1,
            revenue: 1,
            genre_name: reduceField( 'genre_.name' ),
            fund_name: reduceField( 'fund_.name' )
        }
    }
    
    const stages = [ 
        matchDocuments,
        selectFields1,
        lookupGenre,
        lookupFund,
        selectFields2,
        sortDate,
    ];

    return stages;
}

export default payments;
export { payments };