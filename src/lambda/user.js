import { ObjectId } from 'mongodb';
import { connectDB } from './common/connectDB';
import { responseOnSuccess, responseOnError } from './common/responses';
const bcrypt = require( 'bcryptjs' );

exports.handler = async function( event, context, callback ) {
    // Allows to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const [ client ] = await connectDB();
        const db = client.db( 'diaries' );
        const collection = db.collection( 'users' );

        if ( event.httpMethod === 'GET' ) {
            const result = await collection.find( {} ).toArray();
            console.log( result );
            callback( null, responseOnSuccess( result ) );

        } else if ( event.httpMethod === 'POST' ) {
            const body = JSON.parse( event.body )
            const data = body.data;
            const result = await collection.insertOne( data );
            console.log( result );
            callback( null, responseOnSuccess( result ) );

        } else if ( event.httpMethod === 'PUT' ) {
            const id = event.queryStringParameters[ 'id' ];
            const body = JSON.parse( event.body );
            const data = body.data;

            if ( data.password !== undefined ) {
                data.password = !data.password ? data.password : bcrypt.hashSync( data.password, bcrypt.genSaltSync( 8 ) );
            }
            //Object.keys( data ).forEach( key => data[ key ] === undefined ? delete data[ key ] : null );
 
            const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );
            console.log( result );
            callback( null, responseOnSuccess( result ) );

        } else if ( event.httpMethod === 'DELETE' ) {
            const id = event.queryStringParameters[ 'id' ];
            const result = await collection.deleteOne( { _id: ObjectId( id ) } );
            console.log( result );
            callback( null, responseOnSuccess( result ) );
    
        } else {
            throw new Error( `${event.httpMethod} method not supported.` );
        }

    } catch ( err ) {
        console.log( err ); // output to netlify function log
        callback( null, responseOnError( err ) );

    } finally {
        // await client.close();
    }
}
