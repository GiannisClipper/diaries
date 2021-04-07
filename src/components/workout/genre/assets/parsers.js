const parseGenreFromDB = data => ( {
    id: data._id,
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
} )

const parseGenreToDB = data => ( {
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
} );

export { 
    parseGenreFromDB, 
    parseGenreToDB, 
};
