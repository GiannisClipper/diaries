const parseWorkoutFromDB = ( data ) => ( {
    id: data._id,
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
    genre_id: data.genre_id,
    duration: data.duration,
    distance: data.distance,
    remark: data.remark,
    equip_id: data.equip_id,
} )

const parseWorkoutToDB = ( data ) => ( {
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
} )

export { 
    parseWorkoutFromDB, 
    parseWorkoutToDB, 
};
