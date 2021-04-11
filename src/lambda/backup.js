import { createHandler, auth } from './common/handler';

const getMethod = async ( event, db, collectionName, payload ) => {
    //console.log('event.queryStringParameters', event.queryStringParameters)
    let collection = null;
    const result = {};

    collection = db.collection( 'users' );
    result.users = await collection.find( {} ).toArray();

    collection = db.collection( 'diaries' );
    result.diaries = await collection.find( {} ).toArray();

    result.payment = {};

    collection = db.collection( 'payment_genres' );
    result.payment.genres = await collection.find( {} ).toArray();

    collection = db.collection( 'payment_funds' );
    result.payment.funds = await collection.find( {} ).toArray();

    result.workout = {};

    collection = db.collection( 'workout_genres' );
    result.workout.genres = await collection.find( {} ).toArray();

    collection = db.collection( 'workout_equips' );
    result.workout.equips = await collection.find( {} ).toArray();

    collection = db.collection( 'entries' );
    result.entries = await collection.find( {} ).toArray();

    return result;
}

exports.handler = createHandler( {
    auth,
    getMethod
} );
