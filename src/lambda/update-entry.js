import { ObjectId } from 'mongodb';
import { connectDB } from './common/connectDB';
import { responseOnSuccess, responseOnError } from './common/responses';

exports.handler = async function( event, context, callback ) {
    // Allows to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const [ client ] = await connectDB();
        const db = client.db( 'diaries' );
        const collection = db.collection( 'entries' );

        const id = event.queryStringParameters[ 'id' ];
        console.log( 'idddddddd?', id )
        const body = JSON.parse( event.body );
        const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: body } );

        console.log( result ); // output to netlify function log
        callback( null, responseOnSuccess( result ) );

    } catch ( err ) {
        console.log( err ); // output to netlify function log
        callback( null, responseOnError( err ) );

    } finally {
        // await client.close();
    }
}