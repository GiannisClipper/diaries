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

        //console.log('event.queryStringParameters', event.queryStringParameters)
        const body = JSON.parse( event.body );
        const result = await collection.insertOne( body );
        console.log( result ); // output to netlify function log

        const id = result.insertedId;
        const { date, inSequence } = JSON.parse( event.body );
        await updateSequence( collection, id, date, inSequence, 1 );

        callback( null, responseOnSuccess( result ) );

    } catch ( err ) {
        console.log( err ); // output to netlify function log
        callback( null, responseOnError( err ) );

    } finally {
        // await client.close();
    }
}
