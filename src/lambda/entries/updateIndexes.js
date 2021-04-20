import { ObjectId } from 'mongodb';

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

export { updateIndexes };