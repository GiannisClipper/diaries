
import {
    convertFieldTo,
    reduceField,
    lookupGenre,
    lookupFund
} from './aggregation';

const payments = ( { diary_id, type, dateFrom, dateTill } ) => {

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
    
    const selectFields1 = { 
        $project: {
            _id: 0,
            date: 1,
            type: 1,
            remark: 1,
            expense: 1,
            revenue: 1,
            genre_id: convertFieldTo( 'genre_id', 'objectId' ),
            fund_id: convertFieldTo( 'fund_id', 'objectId' )
        }
    }
    
    const selectFields2 = { 
        $project: {
            date: 1,
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
    ];

    return stages;
}

export default payments;
export { payments };