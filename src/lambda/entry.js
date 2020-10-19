import { ObjectId } from 'mongodb';
import { verifyToken } from './common/token';
import { connectDB } from './common/connectDB';
import { updateSequence } from './common/updateSequence';
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
            //console.log('event.queryStringParameters', event.queryStringParameters)
            const [ dateFrom, dateTill ] = event.queryStringParameters[ 'range' ].split( '-' );
            const result = await collection.find( { date: { $gte: dateFrom, $lte: dateTill } } ).toArray();
            console.log( result );
            callback( null, responseOnSuccess( result ) );

        } else if ( event.httpMethod === 'POST' ) {
            const body = JSON.parse( event.body )
            const data = body.data;
            const result = await collection.insertOne( data );
            console.log( result );

            const id = result.insertedId;
            const { date, inSequence } = body.newSaved;
            await updateSequence( collection, id, date, inSequence, 1 );
    
            callback( null, responseOnSuccess( result ) );

        } else if ( event.httpMethod === 'PUT' ) {
            const id = event.queryStringParameters[ 'id' ];
            const body = JSON.parse( event.body );
            const data = body.data;
            const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );

            const oldDate = body.oldSaved.date;
            const oldInSequence = body.oldSaved.inSequence;
            const newDate = body.newSaved.date;
            const newInSequence = body.newSaved.inSequence;
    
            if ( oldDate + oldInSequence !== newDate + newInSequence ) {
                await updateSequence( collection, id, oldDate, oldInSequence, -1 );
                await updateSequence( collection, id, newDate, newInSequence, 1 );
            }
    
            console.log( result );
            callback( null, responseOnSuccess( result ) );

        } else if ( event.httpMethod === 'DELETE' ) {
            const id = event.queryStringParameters[ 'id' ];
            const result = await collection.deleteOne( { _id: ObjectId( id ) } );
            console.log( result );

            const body = JSON.parse( event.body );
            const { date, inSequence } = body.oldSaved;
            await updateSequence( collection, id, date, inSequence, -1 );
    
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
