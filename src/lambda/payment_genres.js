import { ObjectId } from 'mongodb';
import { createHandler, auth } from './core/handler';
import { createValidation, updateValidation, deleteValidation } from './payment_genres/validations';

const parseData = data => ( {
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
    type: data.type,
} );

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
    const data = parseData( body.data || {} );

    const errors = await createValidation( { db, data } );
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
    collectionName: 'payment_genres',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
