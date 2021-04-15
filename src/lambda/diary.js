import {
    createHandler,
    auth,
    postMethod,
    putMethod,
    deleteMethod
}
from './core/handler';

const getMethod = async ( event, db, collectionName, payload ) => {

    const user_id = event.queryStringParameters[ 'user_id' ];

    const collection = db.collection( collectionName );
    const result = await collection.find( { user_id: { $eq: user_id } } ).toArray();

    return result;            
}

exports.handler = createHandler( {
    collectionName: 'diaries',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
