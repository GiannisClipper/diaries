import { isEmpty, isExists, isUsedBy } from '../core/validators';

const isEmptyDiary_id = async ( { data } ) =>
    isEmpty( { 
        value: data.diary_id, 
        message: 'workout_genres.diary_id'
    } );

const isEmptyName = async ( { data } ) =>
    isEmpty( { 
        value: data.name, 
        message: 'workout_genres.name'
    } );

const isExistsName = async ( { db, data, id } ) =>
    ! data.name
    ? null
    :
    await isExists( { 
        db,
        lookupCollection: 'workout_genres', 
        lookupFields: { diary_id: data.diary_id, name: data.name },
        excludedId: id,
        message: 'workout_genres.name'
    } );

const isExistsCode = async ( { db, data, id } ) =>
    ! data.code
    ? null
    :
    await isExists( { 
        db,
        lookupCollection: 'workout_genres', 
        lookupFields: { diary_id: data.diary_id, code: data.code },
        excludedId: id,
        message: 'workout_genres.code'
    } );

const isUsedByEntries = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'entries',
        lookupFields: { 'type_specs.genre_id': id, type: 'workout' },
        message: 'workout_genres.id'
    } );

export { 
    isEmptyDiary_id,
    isEmptyName,
    isExistsName,
    isExistsCode,
    isUsedByEntries 
};
