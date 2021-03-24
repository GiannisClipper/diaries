import {
    convertFieldTo,
    groupMonth,
    sortMonth,
} from './aggregation';

const paymentsGroupByFund = ( { diary_id, type, dateFrom, dateTill } ) => {

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
            month: { $substr: [ "$date", 0, 6 ] },
            expense: convertFieldTo( 'expense', 'decimal' ),
            revenue: convertFieldTo( 'revenue', 'decimal' ),
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