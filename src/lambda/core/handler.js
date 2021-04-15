import { ObjectId } from 'mongodb';
import { verifyToken } from './token';
import { connectDB } from './connectDB';
import { responseOnSuccess, responseOnError } from './responses';

const auth = event => {
    let token = event.headers.authorization;
    const payload =  verifyToken( token );
    if ( payload.error ) {
        throw new Error( `No authorization (${payload.error}).` );
    }
    return payload;
}

const getMethod = async ( event, db, collectionName, payload ) => {
    const collection = db.collection( collectionName );
    const result = await collection.find( {} ).toArray();
    return result;
}

const postMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body )
    const data = body.data;
    const collection = db.collection( collectionName );
    const result = await collection.insertOne( data );
    return result;
}

const putMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const body = JSON.parse( event.body );
    const data = body.data;
    const collection = db.collection( collectionName );
    const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );
    return result;
}

const deleteMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const collection = db.collection( collectionName );
    const result = await collection.deleteOne( { _id: ObjectId( id ) } );
    return result;
}

function createHandler( { auth, collectionName, getMethod, postMethod, putMethod, deleteMethod } ) {

    auth = auth || ( () => ( {} ) );

    return async function( event, context, callback ) {
        // Allows to freeze open connections to a database
        context.callbackWaitsForEmptyEventLoop = false;

        try {
            const payload =  auth( event );

            const [ client ] = await connectDB();
            const db = client.db( 'diaries' );

            if ( event.httpMethod === 'GET' && getMethod ) {

                const result = await getMethod( event, db, collectionName, payload );
                console.log( result );
                callback( null, responseOnSuccess( result ) );

            } else if ( event.httpMethod === 'POST' && postMethod ) {

                const result = await postMethod( event, db, collectionName, payload );
                console.log( result );
                callback( null, responseOnSuccess( result ) );

            } else if ( event.httpMethod === 'PUT' && putMethod ) {

                const result = await putMethod( event, db, collectionName, payload );
                console.log( result );
                callback( null, responseOnSuccess( result ) );

            } else if ( event.httpMethod === 'DELETE' && deleteMethod ) {

                const result = await deleteMethod( event, db, collectionName, payload );
                console.log( result );
                callback( null, responseOnSuccess( result ) );
        
            } else {
                throw new Error( `${ event.httpMethod } method not supported.` );
            }

        } catch ( err ) {
            console.log( err ); // output to netlify function log
            callback( null, responseOnError( err ) );

        } finally {
            // await client.close();
        }
    }
}
export { 
    createHandler,
    auth,
    getMethod, 
    postMethod, 
    putMethod, 
    deleteMethod
};