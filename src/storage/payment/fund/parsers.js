const parseFundFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
} )

const parseFundToDB = data => ( {
    code: data.code,
    name: data.name,
} );

export { 
    parseFundFromDB, 
    parseFundToDB 
};
