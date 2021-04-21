import { ObjectId } from 'mongodb';
import { createHandler, auth } from './core/handler';
import { createValidation, updateValidation, deleteValidation } from './diaries/validations';

const parseData = data => ( {
    user_id: data.user_id,
    title: data.title,
    startDate: data.startDate,
} );

const getMethod = async ( event, db, collectionName, payload ) => {

    const user_id = event.queryStringParameters[ 'user_id' ];

    const collection = db.collection( collectionName );
    const result = await collection.find( { user_id: { $eq: user_id } } ).toArray();

    return { result };            
}

const postMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body )
    const data = parseData( body.data || {} );

    const errors = await createValidation( { db, data } );
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
    const data = parseData( body.data || {} );

    const errors = await updateValidation( { db, id, data } );
    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );
    return { result };
}

const deleteMethod = async ( event, db, collectionName ) => {
    const id = event.queryStringParameters[ 'id' ];

    const errors = await deleteValidation( { db, id } );
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
