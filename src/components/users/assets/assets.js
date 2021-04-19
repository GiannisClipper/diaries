import { userSchema } from './schemas';
import { parseUserToDB, parseUserFromDB } from './parsers';

const assets = {
    namespace: 'users',
    schema: userSchema,
    parseToDB: parseUserToDB,
    parseFromDB: parseUserFromDB,
    sorter: ( x, y ) => x.username > y.username ? 1 : -1,
}

export default assets;