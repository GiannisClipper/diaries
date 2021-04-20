import { ObjectId } from 'mongodb';
import { createHandler, auth } from './core/handler';
import {
    isEmptyDiary_id,
    isEmptyName,
    isExistsName,
    isExistsCode,
    isUsedByEntries 
} from './workout_genres/validators';

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
    const result = await collection.find( filters ).toArray();

    return { result };    
}

const postMethod = async ( event, db, collectionName ) => {
    const body = JSON.parse( event.body )
    const data = body.data;

    let errors = [];
    errors.push( await isEmptyDiary_id( { db, data } ) );
    errors.push( await isEmptyName( { db, data } ) );
    errors.push( await isExistsName( { db, data } ) );
    errors.push( await isExistsCode( { db, data } ) );
    errors = errors.filter( x => x !== null );

    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    const result = await collection.insertOne( data );
    return { result, statusCode: 201 };
}

const putMethod = async ( event, db, collectionName ) => {
    const id = event.queryStringParameters[ 'id' ];
    const body = JSON.parse( event.body );
    const data = body.data;

    let errors = [];
    errors.push( await isEmptyDiary_id( { db, data } ) );
    errors.push( await isEmptyName( { db, data } ) );
    errors.push( await isExistsName( { db, data, id } ) );
    errors.push( await isExistsCode( { db, data, id } ) );
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

    errors = errors.filter( x => x !== null );    
    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    const result = await collection.deleteOne( { _id: ObjectId( id ) } );
    return { result };
}

exports.handler = createHandler( { 
    collectionName: 'workout_genres',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
