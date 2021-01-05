const parseGenreFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} )

const parseGenreToDB = data => ( {
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} );

export { 
    parseGenreFromDB, 
    parseGenreToDB, 
};