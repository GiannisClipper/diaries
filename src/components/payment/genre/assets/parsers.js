const parseGenreFromDB = data => ( {
    id: data._id,
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
    type: data.type,
} )

const parseGenreToDB = data => ( {
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
    type: data.type,
} );

export { 
    parseGenreFromDB, 
    parseGenreToDB, 
};
