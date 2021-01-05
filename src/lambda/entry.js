import { ObjectId } from 'mongodb';
import { createHandler, auth } from './common/handler';
import { updateIndex } from './common/updateIndex';

const getMethod = async ( event, db, collectionName, payload ) => {
    //console.log('event.queryStringParameters', event.queryStringParameters)
    const [ dateFrom, dateTill ] = event.queryStringParameters[ 'range' ].split( '-' );
    const collection = db.collection( collectionName );
    const result = await collection.find( { date: { $gte: dateFrom, $lte: dateTill } } ).toArray();

    return result;            
}

const postMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body )
    const data = body.data;
    const collection = db.collection( collectionName );
    const result = await collection.insertOne( data );

    const id = result.insertedId;
    const { date, index } = body.new;
    await updateIndex( collection, id, date, index, 1 );

    return result;
}

const putMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const body = JSON.parse( event.body );
    const data = body.data;
    const collection = db.collection( collectionName );
    const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );

    const oldDate = body.old.date;
    const oldIndex = body.old.index;
    const newDate = body.new.date;
    const newIndex = body.new.index;

    if ( oldDate + oldIndex !== newDate + newIndex ) {
        await updateIndex( collection, id, oldDate, oldIndex, -1 );
        await updateIndex( collection, id, newDate, newIndex, 1 );
    }

    return result;
}

const deleteMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const collection = db.collection( collectionName );
    const result = await collection.deleteOne( { _id: ObjectId( id ) } );

    const body = JSON.parse( event.body );
    const { date, index } = body.old;
    await updateIndex( collection, id, date, index, -1 );

    return result;
}

exports.handler = createHandler( {
    collectionName: 'entries',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
