import { convertFieldTo, reduceField } from '../core/stages';
import { matchPayments, groupGenre, lookupGenre, sortGenre } from './paymentsStages';

const paymentsGroupByGenre = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } ) => {

    const matchDocuments = matchPayments( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            genre_id: convertFieldTo( 'type_specs.genre_id', 'objectId' ),
            expense: convertFieldTo( 'type_specs.expense', 'decimal' ),
            revenue: convertFieldTo( 'type_specs.revenue', 'decimal' ),
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            genre_code: reduceField( 'genre_.code' ),
            genre_name: reduceField( 'genre_.name' ),
            expense: convertFieldTo( 'expense', 'double' ),
            revenue: convertFieldTo( 'revenue', 'double' ),
            count: 1
        }
    }
    
    const stages = [ 
        matchDocuments,
        projectFields1,
        groupGenre,
        lookupGenre,
        projectFields2,
        sortGenre,
    ];

    return stages;
}

export default paymentsGroupByGenre;
export { paymentsGroupByGenre };