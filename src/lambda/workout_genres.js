import { ObjectId } from 'mongodb';
import { createHandler, auth, postMethod, putMethod } from './core/handler';
import { deleteValidation } from './workout_genres/validations';

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
    collectionName: 'workout_genres',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
