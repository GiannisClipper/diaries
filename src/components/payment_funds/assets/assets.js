import { fundSchema } from './schemas';
import { parseFundToDB, parseFundFromDB } from './parsers';

const assets = {
    namespace: 'funds',
    schema: fundSchema,
    parseToDB: parseFundToDB,
    parseFromDB: parseFundFromDB,
    sorter: ( x, y ) => x.code > y.code ? 1 : -1,
};

export default assets;