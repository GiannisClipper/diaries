import { ObjectId } from 'mongodb';

const updateIndex = async ( collection, id, date, index, step ) => {

    const res = await collection.updateMany( 
        {
            date: { $eq: date },
            index: { $gte: index },
            _id: { $ne: ObjectId( id ) }
        }, 
        { 
            $inc: { index: step }
        }
    );

    console.log( 'updateIndex', { id, date, index, step, res } );
}

export { updateIndex };
