import { ObjectId } from 'mongodb';
import { createHandler, auth } from './core/handler';
import { 
    isEmptyUser_id,
    isEmptyTitle,
    isExistsTitle,
    isUsedByEntries,
    isUsedByPaymentGenres,
    isUsedByPaymentFunds,
    isUsedByWorkoutGenres,
    isUsedByWorkoutEquips 
} from './diaries/validators';

const getMethod = async ( event, db, collectionName, payload ) => {

    const user_id = event.queryStringParameters[ 'user_id' ];

    const collection = db.collection( collectionName );
    const result = await collection.find( { user_id: { $eq: user_id } } ).toArray();

    return { result };            
}

const postMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body )
    const data = body.data;

    let errors = [];
    errors.push( isEmptyUser_id( { db, data } ) );
    errors.push( isEmptyTitle( { db, data } ) );
    errors.push( await isExistsTitle( { db, data } ) );
    errors = errors.filter( x => x !== null );

    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    const result = await collection.insertOne( data );
    return { result, statusCode: 201 };
}

const putMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const body = JSON.parse( event.body );
    const data = body.data;

    let errors = [];
    errors.push( isEmptyUser_id( { db, data } ) );
    errors.push( isEmptyTitle( { db, data } ) );
    errors.push( await isExistsTitle( { db, data, id } ) );
    errors = errors.filter( x => x !== null );

    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );
    return { result };
}

const deleteMethod = async ( event, db, collectionName ) => {
    const id = event.queryStringParameters[ 'id' ];

    let errors = [];
    errors.push( await isUsedByEntries( { db, id } ) );
    errors.push( await isUsedByPaymentGenres( { db, id } ) );
    errors.push( await isUsedByPaymentFunds( { db, id } ) );
    errors.push( await isUsedByWorkoutGenres( { db, id } ) );
    errors.push( await isUsedByWorkoutEquips( { db, id } ) );

    errors = errors.filter( x => x !== null );
    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    const result = await collection.deleteOne( { _id: ObjectId( id ) } );
    return { result };
}

exports.handler = createHandler( {
    collectionName: 'diaries',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
