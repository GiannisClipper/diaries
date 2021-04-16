import { reportSchema } from './schemas';
import { parseReportToDB } from './parsers';
import { parseEntryFromDB } from '../../entry/assets/parsers';

const assets = {
    namespace: 'reports',
    schema: reportSchema,
    parseToDB: parseReportToDB,
    parseFromDB: parseEntryFromDB,
    sorter: ( x, y ) => x.date > y.date ? 1 : -1,
};

export default assets;