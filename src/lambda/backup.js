import { createHandler, auth } from './common/handler';

const getMethod = async ( event, db, collectionName, payload ) => {
    //console.log('event.queryStringParameters', event.queryStringParameters)
    let collection = null;
    const result = {};

    collection = db.collection( 'users' );
    result.users = await collection.find( {} ).toArray();

    collection = db.collection( 'diaries' );
    result.diaries = await collection.find( {} ).toArray();

    result.payments = {};

    collection = db.collection( 'payments_genres' );
    result.payments.genres = await collection.find( {} ).toArray();

    collection = db.collection( 'payments_funds' );
    result.payments.funds = await collection.find( {} ).toArray();

    collection = db.collection( 'entries' );
    result.entries = await collection.find( {} ).toArray();

    return result;
}

exports.handler = createHandler( {
    auth,
    getMethod
} );
