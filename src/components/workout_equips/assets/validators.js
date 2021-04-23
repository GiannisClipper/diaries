import { isEmpty } from '../../core/assets/validators';

const isEmptyDiary_id = ( { data } ) =>
    isEmpty( { 
        value: data.diary_id, 
        message: 'workout_equips.diary_id'
    } );

const isEmptyName = ( { data } ) =>
    isEmpty( { 
        value: data.name, 
        message: 'workout_equips.name'
    } );

export { 
    isEmptyDiary_id,
    isEmptyName,
};