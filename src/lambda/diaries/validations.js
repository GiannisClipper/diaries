import { isFound } from '../core/validations';

const deleteValidation = async ( { db, id } ) => {
    const errors = [];

    const lookupCollections = [
        'entries',
        'payment_genres',
        'payment_funds',
        'workout_genres',
        'workout_equips'
    ];

    for ( const lookupCollection of lookupCollections ) {
        errors.push( await isFound( { 
            db,
            lookupCollection, 
            lookupFields: { diary_id: id }, 
            message: 'diaries.id'
        } ) );
    }

    return errors.filter( x => x !== null );
}

export { deleteValidation };