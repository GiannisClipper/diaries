import { isFound } from '../core/validations';

const deleteValidation = async ( { db, id } ) => {
    const errors = [];

    errors.push( await isFound( { 
        db,
        lookupCollection: 'entries',
        lookupFields: { 'type_specs.genre_id': id, type: 'payment' }, 
        message: 'payment_genres.id'
    } ) );

    return errors.filter( x => x !== null );
}

export { deleteValidation };