import { connectDB } from './common/connectDB';
import { responseOnSuccess, responseOnError } from './common/responses';

exports.handler = async function( event, context, callback ) {
    // Allows to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const [ client ] = await connectDB();
        const db = client.db( 'diaries' );
        const collection = db.collection( 'entries' );

        //console.log('event.queryStringParameters', event.queryStringParameters)
        const [ dateFrom, dateTill ] = event.queryStringParameters[ 'range' ].split( '-' );
        const result = await collection.find( { date: { $gte: dateFrom, $lte: dateTill } } ).toArray();

        const res = responseOnSuccess( result );
        console.log( res ); // output to netlify function log
        return callback( null, res );

    } catch ( err ) {
        const res = responseOnError( err );
        console.log( res ); // output to netlify function log
        return callback( null, res );

    } finally {
        // await client.close();
    }
}
