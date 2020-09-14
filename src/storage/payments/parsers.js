const parseGenreToDB = data => ( {
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} );

const parseGenreFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} )

const parseFundToDB = data => ( {
    code: data.code,
    name: data.name
} );

const parseFundFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
} )

export { parseGenreToDB, parseGenreFromDB, parseFundToDB, parseFundFromDB };

