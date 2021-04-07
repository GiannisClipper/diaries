import { reportSchema } from './schemas';
import { parseReportToDB } from './parsers';
import { parsePaymentFromDB } from '../../payment/assets/parsers';
import { parseWorkoutFromDB } from '../../workout/assets/parsers';
import { parseNoteFromDB } from '../../note/assets/parsers';

const assets = {
    namespace: 'reports',
    schema: reportSchema,
    parseToDB: parseReportToDB,
    parseFromDB: data => data.type === 'payment'
        ? parsePaymentFromDB( data )
        : data.type === 'workout'
        ? parseWorkoutFromDB( data )
        : parseNoteFromDB( data ),
    sorter: ( x, y ) => x.date > y.date ? 1 : -1,
};

export default assets;