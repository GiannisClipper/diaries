import { createHandler, auth } from './common/handler';

const getMethod = async ( event, db, collectionName, payload ) => {
    const { 
        diary_id,
        type, 
        dateFrom, 
        dateTill,
    } = event.queryStringParameters;

    const collection = db.collection( collectionName );

    // const filters = { 
    //     diary_id: { $eq: diary_id },
    //     type: { $eq: type },
    //     date: { $gte: dateFrom, $lte: dateTill },
    // };

    // const result = await collection.find( filters ).toArray();

    const selectDocuments = { 
        $match: {
            diary_id,
            type,
            date: { 
                $gte: dateFrom, 
                $lte: dateTill
            }
        }
    };
    
    const selectFields = { 
        $project: {
            _id: 0,
            date: 1,
            type: 1,
            remark: 1,
            expense: 1,
            revenue: 1,
            genre_id: 1,
            fund_id: 1
        }
    }
    
    const convertGenreId = {
        $addFields: {
            genre_id: { $toObjectId: '$genre_id' }
        }
    }
    
    const convertFundId = {
        $addFields: {
            fund_id: { $toObjectId: '$fund_id' }
        }
    }
    
    const lookupGenre = {
        $lookup: {
            from: 'payments_genres', 
            localField: 'genre_id', 
            foreignField: '_id', 
            as: 'genre_'
        }
    }
    
    const lookupFund = {
        $lookup: {
            from: 'payments_funds', 
            localField: 'fund_id', 
            foreignField: '_id', 
            as: 'fund_'
        }
    }
    
    const selectFields2 = { 
        $project: {
            date: 1,
            type: 1,
            remark: 1,
            expense: 1,
            revenue: 1,
            genre_name: {
                $reduce: {
                    input: '$genre_.name',
                    initialValue: "",
                    in: { $concat : [ "$$value", "$$this" ] }
                }
            },
            fund_name: {
                $reduce: {
                    input: '$fund_.name',
                    initialValue: "",
                    in: { $concat : [ "$$value", "$$this" ] }
                }
            }
        }
    }
    
    const result = collection.aggregate( [ 
        selectDocuments,
        selectFields,
        convertGenreId,
        lookupGenre,
        convertFundId,
        lookupFund,
        selectFields2,
    ] ).toArray();

    return result;
    
}

exports.handler = createHandler( {
    collectionName: 'entries',
    auth,
    getMethod
} );
