import { signinSchema } from './schemas';
import { parseSigninToDB, parseSigninFromDB } from './parsers';

const assets = {
    namespace: 'signin',
    schema: signinSchema,
    parseToDB: parseSigninToDB,
    parseFromDB: parseSigninFromDB,
}

export default assets;