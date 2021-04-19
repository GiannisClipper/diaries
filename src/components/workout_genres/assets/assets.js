import { genreSchema } from './schemas';
import { parseGenreToDB, parseGenreFromDB } from './parsers';

const assets = {
    namespace: 'genres',
    schema: genreSchema,
    parseToDB: parseGenreToDB,
    parseFromDB: parseGenreFromDB,
    sorter: ( x, y ) => x.code > y.code ? 1 : -1,
};

export default assets;