import {
    matchPayments,
    convertFieldTo,
    reduceField,
    groupGenre,
    lookupGenre,
    sortGenre,    
} from './aggregation';

const paymentsGroupByGenre = ( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } ) => {

    const matchDocuments = matchPayments( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } );
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            genre_id: convertFieldTo( 'genre_id', 'objectId' ),
            expense: convertFieldTo( 'expense', 'decimal' ),
            revenue: convertFieldTo( 'revenue', 'decimal' ),
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