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
        const collection = db.collection( 'entries' );

        if ( event.httpMethod === 'GET' ) {
            const { type, dateFrom, dateTill } = event.queryStringParameters;
            const filters = { 
                type: { $eq: type },
                date: { $gte: dateFrom, $lte: dateTill },
            };
            const result = await collection.find( filters ).toArray();
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
