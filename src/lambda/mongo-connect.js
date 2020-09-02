import { MongoClient } from 'mongodb';

exports.handler = async function( event, context, callback ) {

    try {
        const URI = process.env.DB_URI;
        const client = new MongoClient( URI, { useNewUrlParser: true, useUnifiedTopology: true } );

        await client.connect();
        const db = client.db( 'diaries' );
        const collection = db.collection( 'entries' );
        const data = await collection.find( {} ).toArray();

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
        await client.close();
    }
}
