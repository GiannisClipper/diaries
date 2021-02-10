import { connectDB } from './common/connectDB';
import { responseOnSuccess, responseOnError } from './common/responses';

exports.handler = async function( event, context, callback ) {
    // Allows to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const [ client ] = await connectDB();
        const db = client.db( 'diaries' );
        let collection = null;
        let result = {};

        //collection = db.collection( 'entries' );
        //result = await collection.updateMany( {}, { $set: { type: 'note' } } );
        //result = await collection.updateMany( {}, { $rename: { "inSequence": "index" } } );
        //result = await collection.updateMany( {}, { $set: { diary_id: '5ff4a9f0a71aef59a8695134' } } );
        //result = await collection.updateMany( {}, { $rename: { "inSequence": "index" } } );
        //result = await collection.updateMany( {}, { $rename: { "incoming": "revenue", "outgoing": "expense" } } );

        // collection = db.collection( 'payments_funds' );
        // result.funds = await collection.updateMany( {}, { $set: { diary_id: '5ff4a9f0a71aef59a8695134' } } );
        collection = db.collection( 'payments_genres' );
        // result.genres = await collection.updateMany( {}, { $set: { diary_id: '5ff4a9f0a71aef59a8695134' } } );
        result = await collection.updateMany( {}, { $rename: { "isIncoming": "isRevenue", "isOutgoing": "isExpense" } } );

        console.log( result ); // output to netlify function log
        callback( null, responseOnSuccess( result ) );

    } catch ( err ) {
        console.log( err ); // output to netlify function log
        callback( null, responseOnError( err ) );

    } finally {
        // await client.close();
    }
}
