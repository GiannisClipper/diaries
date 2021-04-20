import { isFound } from '../core/validations';

const deleteValidation = async ( { db, id } ) => {
    const errors = [];

    errors.push( await isFound( { 
        db,
        lookupCollection: 'diaries', 
        lookupFields: { user_id: id }, 
        message: 'users.id'
    } ) );

    return errors.filter( x => x !== null );
}

export { deleteValidation };