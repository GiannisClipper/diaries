import { ObjectId } from 'mongodb';
import { createHandler, auth, getMethod } from './core/handler';
import { deleteValidation } from './users/validations';

const bcrypt = require( 'bcryptjs' );

const postMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body )
    const data = body.data;
    data.password = bcrypt.hashSync( data.password, bcrypt.genSaltSync( 8 ) );
    const collection = db.collection( collectionName );
    const result = await collection.insertOne( data );
    return { result, statusCode: 201 };
}

const putMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const body = JSON.parse( event.body );
    const data = body.data;
    if ( data.password !== undefined ) {
        data.password = bcrypt.hashSync( data.password, bcrypt.genSaltSync( 8 ) );
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
    collectionName: 'users',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
