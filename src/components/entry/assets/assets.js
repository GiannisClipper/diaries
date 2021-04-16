import { entrySchema } from './schemas';
import { parseEntryToDB, parseEntryFromDB } from './parsers';

const assets = {
    namespace: 'entries',
    schema: entrySchema,
    parseToDB: parseEntryToDB,
    parseFromDB: parseEntryFromDB,
    sorter: ( a, b ) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0,
};

export default assets;