import {
    isEmptyUsername,
    isEmptyPassword,
    isExistsUsername,
    isUsedByDiaries 
} from './validators';

const createValidation = async ( { db, data } ) => {
    const errors = [];
    errors.push( isEmptyUsername( { data } ) );
    errors.push( isEmptyPassword( { data } ) );
    errors.push( await isExistsUsername( { db, data } ) );

    return errors.filter( x => x !== null );
}

const updateValidation = async ( { db, id, data } ) => {
    const errors = [];
    errors.push( isEmptyUsername( { data } ) );
    errors.push( await isExistsUsername( { db, data, id } ) );

    return errors.filter( x => x !== null );
}

const deleteValidation = async ( { db, id } ) => {
    const errors = [];
    errors.push( await isUsedByDiaries( { db, id } ) );

    return errors.filter( x => x !== null );
}

export { createValidation, updateValidation, deleteValidation };
