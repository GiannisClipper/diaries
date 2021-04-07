import { equipSchema } from './schemas';
import { parseEquipToDB, parseEquipFromDB } from './parsers';

const assets = {
    namespace: 'equips',
    schema: equipSchema,
    parseToDB: parseEquipToDB,
    parseFromDB: parseEquipFromDB,
    sorter: ( x, y ) => x.code > y.code ? 1 : -1,
};

export default assets;