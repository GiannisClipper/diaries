import { entrySchema } from './schemas';
import { parsePaymentToDB, parsePaymentFromDB } from '../../payment/assets/parsers';
import { parseNoteToDB, parseNoteFromDB } from '../../note/assets/parsers';

const assets = {
    namespace: 'entries',
    schema: entrySchema(),

    parseToDB: data => data.type === 'payment'
        ? parsePaymentToDB( data )
        : parseNoteToDB( data ),

    parseFromDB: data => data.type === 'payment'
        ? parsePaymentFromDB( data )
        : parseNoteFromDB( data ),

    sorter: ( a, b ) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0,
};

export default assets;