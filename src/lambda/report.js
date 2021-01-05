import { createHandler, auth } from './common/handler';

const getMethod = async ( event, db, collectionName, payload ) => {
    const { 
        type, 
        dateFrom, 
        dateTill,
    } = event.queryStringParameters;

    const filters = { 
        type: { $eq: type },
        date: { $gte: dateFrom, $lte: dateTill },
    };

    const collection = db.collection( collectionName );
    const result = await collection.find( filters ).toArray();
    return result;
}

exports.handler = createHandler( {
    collectionName: 'entries',
    auth,
    getMethod
} );
