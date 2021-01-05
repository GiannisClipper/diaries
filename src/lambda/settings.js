import { ObjectId } from 'mongodb';
import { createHandler, auth } from './common/handler';

const putMethod = async ( event, collection, payload ) => {
    const id = payload.user_id;
    const body = JSON.parse( event.body );
    const data = body.data;
    const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );
    return result;
}

exports.handler = createHandler( {
    collectionName: 'users',
    auth,
    putMethod
} );
