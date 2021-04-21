import { ObjectId } from 'mongodb';
import { createHandler, auth } from './core/handler';

const parseData = data => ( {
    theme: data.theme,
    language: data.language,
} );

const putMethod = async ( event, db, collectionName, payload ) => {
    const id = payload.user_id;
    const body = JSON.parse( event.body );
    const data = parseData( body.data || {} );

    const collection = db.collection( collectionName );
    const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );
    return { result };
}

exports.handler = createHandler( {
    collectionName: 'users',
    auth,
    putMethod
} );
