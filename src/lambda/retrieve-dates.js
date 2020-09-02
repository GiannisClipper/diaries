import { connectDB } from './connectDB';

exports.handler = async function( event, context, callback ) {
    // Allows to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const [ client ] = await connectDB();
        const db = client.db( 'diaries' );
        const collection = db.collection( 'entries' );

        //console.log('event.queryStringParameters', event.queryStringParameters)
        let [ dateFrom, dateTill ] = event.queryStringParameters[ 'range' ].split( '-' );
        const data = await collection.find( { date: { $gte: dateFrom, $lte: dateTill } } ).toArray();

        console.log( data ); // output to netlify function log
        callback( null, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            statusCode: 200,
            body: JSON.stringify( data )
        } );

    } catch ( err ) {
        console.log( err ); // output to netlify function log
        callback( null, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            statusCode: 500,
            body: JSON.stringify( { err: err.message } )
        } );

    } finally {
        // await client.close();
    }
}
