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
    const name = event.queryStringParameters[ 'name' ];

    const filters = {
        diary_id: { $eq: diary_id }
    };

    if ( name ) {
        filters.name = { $regex: name, $options: '$i' };
    }

    const collection = db.collection( collectionName );
    const result = await collection.find( { diary_id: { $eq: diary_id } } ).toArray();

    return result;            
}

exports.handler = createHandler( { 
    collectionName: 'payment_funds',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
