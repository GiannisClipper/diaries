import { ObjectId } from 'mongodb';
import { createHandler, auth } from './core/handler';
import { convertFieldTo, reduceField } from './core/stages';

const updateIndexes = async ( collection, indexes ) => {

    if ( indexes && indexes.length > 0 ) {

        const updates = indexes.map( x => (
            { updateOne: {
                filter: { _id: ObjectId( x.id ) },
                update: { $set: { index: x.index } }
            } }
        ) );

        collection.bulkWrite( updates, { ordered : false } );
    }
}

const getMethod = async ( event, db, collectionName, payload ) => {

    const diary_id = event.queryStringParameters[ 'diary_id' ];
    const [ dateFrom, dateTill ] = event.queryStringParameters[ 'range' ].split( '-' );
    const collection = db.collection( collectionName );

    const result = await collection.aggregate( [
        { 
            $match: { 
                diary_id: { $eq: diary_id },
                date: { $gte: dateFrom, $lte: dateTill }
            },
        },
        {
            $facet: {
                notes: [ 
                    { 
                        $match: { 
                            type: 'note' 
                        }
                    },
                ],

                payments: [
                    { 
                        $match: { 
                            type: 'payment' 
                        } 
                    },
                    {
                        $addFields: {
                            'type_specs.genre_id': convertFieldTo( 'type_specs.genre_id', 'objectId' ),
                            'type_specs.fund_id': convertFieldTo( 'type_specs.fund_id', 'objectId' ),
                        }
                    },
                    { 
                        $lookup: {
                            from: 'payment_genres', 
                            localField: 'type_specs.genre_id', 
                            foreignField: '_id', 
                            as: 'type_specs.genre_'
                        }
                    },
                    { 
                        $lookup: {
                            from: 'payment_funds',
                            localField: 'type_specs.fund_id', 
                            foreignField: '_id', 
                            as: 'type_specs.fund_'
                        }
                    },
                    {
                        $addFields: {
                            'type_specs.genre_id': convertFieldTo( 'type_specs.genre_id', 'string' ),
                            'type_specs.genre_name': reduceField( 'type_specs.genre_.name' ),
                            'type_specs.fund_id': convertFieldTo( 'type_specs.fund_id', 'string' ),
                            'type_specs.fund_name': reduceField( 'type_specs.fund_.name' ),
                        }
                    },
                    {
                        $project: {
                            'type_specs.genre_': 0,
                            'type_specs.fund_': 0
                        }
                    }
                ],

                workouts: [        
                    { 
                        $match: { 
                            type: 'workout' 
                        } 
                    },
                    {
                        $addFields: {
                            'type_specs.genre_id': convertFieldTo( 'type_specs.genre_id', 'objectId' ),
                            'type_specs.equip_id': convertFieldTo( 'type_specs.equip_id', 'objectId' ),
                        }
                    },
                    { 
                        $lookup: {
                            from: 'workout_genres', 
                            localField: 'type_specs.genre_id', 
                            foreignField: '_id', 
                            as: 'type_specs.genre_'
                        }
                    },
                    { 
                        $lookup: {
                            from: 'workout_equips',
                            localField: 'type_specs.equip_id', 
                            foreignField: '_id', 
                            as: 'type_specs.equip_'
                        }
                    },
                    {
                        $addFields: {
                            'type_specs.genre_id': convertFieldTo( 'type_specs.genre_id', 'string' ),
                            'type_specs.genre_name': reduceField( 'type_specs.genre_.name' ),
                            'type_specs.equip_id': convertFieldTo( 'type_specs.equip_id', 'string' ),
                            'type_specs.equip_name': reduceField( 'type_specs.equip_.name' ),
                        }
                    },
                    {
                        $project: {
                            'type_specs.genre_': 0,
                            'type_specs.equip_': 0
                        }
                    }
                ]
            }
        },
        {
            // to merge the 3 exported arrays from the `facet` stage
            $project: {
                result: { 
                    $setUnion: [ '$notes', '$payments', '$workouts' ] 
                }
            }
        },
        { 
            // to convert from { result: [ {}, {}, ] } to [ { result: {} }, { result: {} } ]
            $unwind: '$result' 
        },
        {
            // to remove result key
            $replaceRoot: { newRoot: '$result' } 
        }
    ] ).toArray();

    return result;            
}

const postMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body )
    const { indexes, ...data } = body.data;
    const collection = db.collection( collectionName );
    const result = await collection.insertOne( data );
    await updateIndexes( collection, indexes );

    return result;
}

const putMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const body = JSON.parse( event.body );
    const { indexes, ...data } = body.data;
    const collection = db.collection( collectionName );
    const result = await collection.updateOne( { _id: ObjectId( id ) }, { $set: data } );
    await updateIndexes( collection, indexes );

    return result;
}

const deleteMethod = async ( event, db, collectionName, payload ) => {
    const id = event.queryStringParameters[ 'id' ];
    const body = JSON.parse( event.body );
    const { indexes } = body.data;
    const collection = db.collection( collectionName );
    const result = await collection.deleteOne( { _id: ObjectId( id ) } );
    await updateIndexes( collection, indexes );

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
