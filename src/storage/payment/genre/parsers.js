const parseGenreFromDB = data => ( {
    id: data._id,
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} )

const parseGenreToDB = data => ( {
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} );

export { 
    parseGenreFromDB, 
    parseGenreToDB, 
};
