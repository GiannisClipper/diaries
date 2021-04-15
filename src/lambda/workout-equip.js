import {
    createHandler,
    auth,
    postMethod,
    putMethod,
    deleteMethod
}
from './core/handler';

const getMethod = async ( event, db, collectionName, payload ) => {

    const diary_id = event.queryStringParameters[ 'diary_id' ];

    const collection = db.collection( collectionName );
    const result = await collection.find( { diary_id: { $eq: diary_id } } ).toArray();

    return result;            
}

exports.handler = createHandler( { 
    collectionName: 'workout_equips',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );