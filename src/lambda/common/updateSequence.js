import { ObjectId } from 'mongodb';

const updateSequence = async ( collection, date, entryPos, id, num ) => {

    const res = await collection.updateMany( 
        {
            date: { $eq: date },
            entryPos: { $gte: entryPos },
            _id: { $ne: ObjectId( id ) }
        }, 
        { 
            $inc: { entryPos: num }
        } 
    );

    console.log( 'updateEntryPos', { date, entryPos, id, num, res } );
}

export { updateSequence };
