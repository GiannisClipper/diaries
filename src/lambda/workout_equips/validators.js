import { isEmpty, isExists, isUsedBy } from '../core/validators';

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

const isExistsName = async ( { db, data, id } ) =>
    ! data.name
    ? null
    :
    await isExists( { 
        db,
        lookupCollection: 'workout_equips', 
        lookupFields: { diary_id: data.diary_id, name: data.name },
        excludedId: id,
        message: 'workout_equips.name'
    } );

const isExistsCode = async ( { db, data, id } ) =>
    ! data.code
    ? null
    :
    await isExists( { 
        db,
        lookupCollection: 'workout_equips', 
        lookupFields: { diary_id: data.diary_id, code: data.code },
        excludedId: id,
        message: 'workout_equips.code'
    } );

const isUsedByEntries = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'entries',
        lookupFields: { 'type_specs.equip_id': id, type: 'workout' },
        message: 'workout_equips.id'
    } );

export { 
    isEmptyDiary_id,
    isEmptyName,
    isExistsName,
    isExistsCode,
    isUsedByEntries 
};
