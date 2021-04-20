import { isEmpty, isAlreadyExists, isUsedBy } from '../core/validations';

const postValidation = async ( { db, data, id } ) => {
    const errors = [];

    errors.push( isEmpty( { 
        value: data.username, 
        message: 'users.username'
    } ) );

    errors.push( isEmpty( { 
        value: data.password, 
        message: 'users.password'
    } ) );

    if ( data.username ) {
        errors.push( await isAlreadyExists( { 
            db,
            lookupCollection: 'users', 
            lookupFields: { username: data.username },
            excludedId: id,
            message: 'users.username'
        } ) );
    };

    return errors.filter( x => x !== null );
}

const putValidation = postValidation;

const deleteValidation = async ( { db, id } ) => {
    const errors = [];

    errors.push( await isUsedBy( { 
        db,
        lookupCollection: 'diaries', 
        lookupFields: { user_id: id }, 
        message: 'users.id'
    } ) );

    return errors.filter( x => x !== null );
}

export { postValidation, putValidation, deleteValidation };