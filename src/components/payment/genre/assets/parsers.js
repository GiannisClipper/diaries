const parseGenreFromDB = data => ( {
    id: data._id,
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
    isRevenue: data.isRevenue,
    isExpense: data.isExpense,
} )

const parseGenreToDB = data => ( {
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
    isRevenue: data.isRevenue,
    isExpense: data.isExpense,
} );

export { 
    parseGenreFromDB, 
    parseGenreToDB, 
};
