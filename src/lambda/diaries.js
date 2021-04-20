import { ObjectId } from 'mongodb';
import { createHandler, auth, postMethod, putMethod } from './core/handler';
import { deleteValidation } from './diaries/validations';

const getMethod = async ( event, db, collectionName, payload ) => {

    const user_id = event.queryStringParameters[ 'user_id' ];

    const collection = db.collection( collectionName );
    const result = await collection.find( { user_id: { $eq: user_id } } ).toArray();

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
