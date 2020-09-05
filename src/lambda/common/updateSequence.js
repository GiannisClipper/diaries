import { ObjectId } from 'mongodb';

const updateSequence = async ( collection, id, date, inSequence, step ) => {

    const res = await collection.updateMany( 
        {
            date: { $eq: date },
            inSequence: { $gte: inSequence },
            _id: { $ne: ObjectId( id ) }
        }, 
        { 
            $inc: { inSequence: step }
        } 
    );

    console.log( 'updateEntryPos', { id, date, inSequence, step, res } );
}

export { updateSequence };
