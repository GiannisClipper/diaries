import {
    isEmptyDiary_id,
    isEmptyName,
    isExistsName,
    isExistsCode,
    isUsedByEntries 
} from './validators';

const createValidation = async ( { db, data } ) => {
    const errors = [];
    errors.push( isEmptyDiary_id( { data } ) );
    errors.push( isEmptyName( { data } ) );
    errors.push( await isExistsName( { db, data } ) );
    errors.push( await isExistsCode( { db, data } ) );

    return errors.filter( x => x !== null );
}

const updateValidation = async ( { db, id, data } ) => {
    const errors = [];
    errors.push( isEmptyDiary_id( { data } ) );
    errors.push( isEmptyName( { data } ) );
    errors.push( await isExistsName( { db, data, id } ) );
    errors.push( await isExistsCode( { db, data, id } ) );

    return errors.filter( x => x !== null );
}

const deleteValidation = async ( { db, id } ) => {
    const errors = [];
    errors.push( await isUsedByEntries( { db, id } ) );

    return errors.filter( x => x !== null );
}

export { createValidation, updateValidation, deleteValidation };
