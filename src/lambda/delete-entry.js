import { ObjectId } from 'mongodb';
import { connectDB } from './common/connectDB';
import { updateSequence } from './common/updateSequence';
import { responseOnSuccess, responseOnError } from './common/responses';

exports.handler = async function( event, context, callback ) {
    // Allows to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const [ client ] = await connectDB();
        const db = client.db( 'diaries' );
        const collection = db.collection( 'entries' );

        const id = event.queryStringParameters[ 'id' ];
        const result = await collection.deleteOne( { _id: ObjectId( id ) } );
        console.log( result ); // output to netlify function log

        const body = JSON.parse( event.body );
        const { date, inSequence } = body.oldSaved;
        await updateSequence( collection, id, date, inSequence, -1 );

        callback( null, responseOnSuccess( result ) );

    } catch ( err ) {
        console.log( err ); // output to netlify function log
        callback( null, responseOnError( err ) );

    } finally {
        // await client.close();
    }
}