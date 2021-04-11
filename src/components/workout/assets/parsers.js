import { pace, speed } from '../helpers/speedAndPace';

const parseWorkoutFromDB = data => {

    const { _id, diary_id, date, index, type, type_specs } = data;
    const { genre_id, duration, distance, remark, equip_id } = type_specs;

    return {
        id: _id,
        diary_id,
        date,
        index,
        type,
        type_specs: {
            genre_id,
            duration: duration,
            distance: distance,
            speed: speed( { duration, distance } ),
            pace: pace( { duration, distance } ),        
            remark: remark,
            equip_id: equip_id
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
            duration: duration,
            distance: distance,
            remark: remark,
            equip_id: equip_id
        }
    }
}

export { 
    parseWorkoutFromDB, 
    parseWorkoutToDB, 
};
