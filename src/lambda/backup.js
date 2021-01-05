import { verifyToken } from './common/token';
import { connectDB } from './common/connectDB';
import { responseOnSuccess, responseOnError } from './common/responses';

exports.handler = async function( event, context, callback ) {
    // Allows to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        let token = event.headers.authorization;
        const payload = verifyToken( token );
        if ( payload.error ) {
            throw new Error( `No authorization (${payload.error}).` );
        }

        const [ client ] = await connectDB();
        const db = client.db( 'diaries' );

        if ( event.httpMethod === 'GET' ) {
            //console.log('event.queryStringParameters', event.queryStringParameters)
            let collection = null;
            const result = {};

            collection = db.collection( 'users' );
            result.users = await collection.find( {} ).toArray();

            collection = db.collection( 'diaries' );
            result.diaries = await collection.find( {} ).toArray();

            result.payments = {};

            collection = db.collection( 'payments_genres' );
            result.payments.genres = await collection.find( {} ).toArray();

            collection = db.collection( 'payments_funds' );
            result.payments.funds = await collection.find( {} ).toArray();

            collection = db.collection( 'entries' );
            result.entries = await collection.find( {} ).toArray();

            console.log( result );
            callback( null, responseOnSuccess( result ) );

        } else {
            throw new Error( `${event.httpMethod} method not supported.` );
        }

    } catch ( err ) {
        console.log( err );
        callback( null, responseOnError( err ) );

    } finally {
        // await client.close();
    }
}
