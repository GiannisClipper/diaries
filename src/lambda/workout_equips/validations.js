import { isUsedBy } from '../core/validations';

const deleteValidation = async ( { db, id } ) => {
    const errors = [];

    errors.push( await isUsedBy( { 
        db,
        lookupCollection: 'entries',
        lookupFields: { 'type_specs.equip_id': id, type: 'workout' },
        message: 'workout_equips.id'
    } ) );

    return errors.filter( x => x !== null );
}

export { deleteValidation };