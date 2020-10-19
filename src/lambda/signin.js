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

        if ( event.httpMethod === 'POST' ) {
            const body = JSON.parse( event.body );
            const data = body.data;
 
            let result = await collection.findOne( { username: data.username } );

            if ( !result || !bcrypt.compareSync( data.password, result.password ) ) {
                result = {};
            }

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
