import { pace, speed } from '../helpers/speedAndPace';

const parseWorkoutFromDB = data => {

    const { _id, diary_id, date, index, type, type_specs } = data;
    const { genre_id, genre_name, duration, distance, remark, equip_id, equip_name } = type_specs;

    return {
        id: _id,
        diary_id,
        date,
        index,
        type,
        type_specs: {
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
}

const parseWorkoutToDB = data => {

    const { diary_id, date, index, type, type_specs } = data;
    const { genre_id, duration, distance, remark, equip_id } = type_specs;

    return {
        diary_id,
        date,
        index,
        type,
        type_specs: {
            genre_id,
            duration,
            distance,
            remark,
            equip_id
        }
    }
}

export { 
    parseWorkoutFromDB, 
    parseWorkoutToDB, 
};
