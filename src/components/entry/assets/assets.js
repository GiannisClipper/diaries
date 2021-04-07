import { entrySchema } from './schemas';
import { parsePaymentToDB, parsePaymentFromDB } from '../../payment/assets/parsers';
import { parseWorkoutToDB, parseWorkoutFromDB } from '../../workout/assets/parsers';
import { parseNoteToDB, parseNoteFromDB } from '../../note/assets/parsers';

const assets = {
    namespace: 'entries',
    schema: entrySchema,

    parseToDB: data => data.type === 'payment'
        ? parsePaymentToDB( data ) 
        : data.type === 'workout'
        ? parseWorkoutToDB( data )
        : parseNoteToDB( data ),

    parseFromDB: data => data.type === 'payment'
        ? parsePaymentFromDB( data )
        : data.type === 'workout'
        ? parseWorkoutFromDB( data )
        : parseNoteFromDB( data ),

    sorter: ( a, b ) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0,
};

export default assets;