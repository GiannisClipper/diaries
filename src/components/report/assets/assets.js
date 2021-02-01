import { reportSchema } from './schemas';
import { parseReportToDB } from './parsers';
import { parsePaymentFromDB } from '../../payment/assets/parsers';
import { parseNoteFromDB } from '../../note/assets/parsers';

const assets = {
    namespace: 'reports',
    schema: reportSchema,
    parseToDB: parseReportToDB,
    parseFromDB: data => data.type === 'payment'
        ? parsePaymentFromDB( data )
        : parseNoteFromDB( data ),
};

export default assets;