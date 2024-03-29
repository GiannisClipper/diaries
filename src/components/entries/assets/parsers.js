import { parsePaymentFromDB, parsePaymentToDB } from '../../payments/assets/parsers';
import { parseWorkoutFromDB, parseWorkoutToDB } from '../../workouts/assets/parsers';
import { parseNoteFromDB, parseNoteToDB } from '../../notes/assets/parsers';

const parseEntryFromDB = data => {

    const { _id, diary_id, date, index, type, type_specs } = data;

    return {
        id: _id,
        diary_id,
        date,
        index,
        type,
        type_specs:
            type === 'payment'
            ? parsePaymentFromDB( type_specs )
            : type === 'workout'
            ? parseWorkoutFromDB( type_specs )
            : parseNoteFromDB( type_specs )
    }

}

const parseEntryToDB = data => {

    const { diary_id, date, index, indexes, type, type_specs } = data;

    return {
        diary_id,
        date,
        index,
        indexes,
        type,
        type_specs:
            type === 'payment'
            ? parsePaymentToDB( type_specs )
            : type === 'workout'
            ? parseWorkoutToDB( type_specs )
            : parseNoteToDB( type_specs )
    }
}

export { 
    parseEntryFromDB, 
    parseEntryToDB,
};
