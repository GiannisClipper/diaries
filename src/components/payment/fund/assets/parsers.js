const parseFundFromDB = data => ( {
    id: data._id,
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
} )

const parseFundToDB = data => ( {
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
} );

export { 
    parseFundFromDB, 
    parseFundToDB 
};
