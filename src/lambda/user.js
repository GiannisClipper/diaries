import { ObjectId } from 'mongodb';
import { createHandler, auth, getMethod, deleteMethod } from './common/handler';

const bcrypt = require( 'bcryptjs' );

const postMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body )
    const data = body.data;
    data.password = bcrypt.hashSync( data.password, bcrypt.genSaltSync( 8 ) );
    const collection = db.collection( collectionName );
    const result = await collection.insertOne( data );
    return result;
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
    return result;
}

exports.handler = createHandler( {
    collectionName: 'users',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
