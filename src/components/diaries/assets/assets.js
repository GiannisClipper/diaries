import { diarySchema } from './schemas';
import { parseDiaryToDB, parseDiaryFromDB } from './parsers';

const assets = {
    namespace: 'diaries',
    schema: diarySchema,
    parseToDB: parseDiaryToDB,
    parseFromDB: parseDiaryFromDB,
    sorter: undefined,
};

export default assets;