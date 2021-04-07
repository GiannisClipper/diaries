const parseEquipFromDB = data => ( {
    id: data._id,
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
} )

const parseEquipToDB = data => ( {
    diary_id: data.diary_id,
    code: data.code,
    name: data.name,
} );

export { 
    parseEquipFromDB, 
    parseEquipToDB, 
};
