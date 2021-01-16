import { reportSchema } from './schemas';
import { parseReportToDB } from './parsers';

const assets = {
    namespace: 'reports',
    schema: reportSchema,
    parseToDB: parseReportToDB,
};

export default assets;