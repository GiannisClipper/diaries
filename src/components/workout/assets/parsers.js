import { pace, speed } from '../helpers/speedAndPace';

const parseWorkoutFromDB = type_specs => {

    const { genre_id, genre_name, duration, distance, remark, equip_id, equip_name } = type_specs;

    return {
        genre_id,
        genre_name,
        duration,
        distance,
        speed: speed( { duration, distance } ),
        pace: pace( { duration, distance } ),        
        remark,
        equip_id,
        equip_name
}
}

const parseWorkoutToDB = type_specs => {

    const { genre_id, duration, distance, remark, equip_id } = type_specs;

    return {
        genre_id,
        duration,
        distance,
        remark,
        equip_id
    }
}

export { 
    parseWorkoutFromDB, 
    parseWorkoutToDB, 
};
