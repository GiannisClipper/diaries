import {
    isEmptyUser_id,
    isEmptyTitle,
    isExistsTitle,
    isUsedByEntries,
    isUsedByPaymentGenres,
    isUsedByPaymentFunds,
    isUsedByWorkoutGenres,
    isUsedByWorkoutEquips 
} from './validators';

const createValidation = async ( { db, data } ) => {
    const errors = [];
    errors.push( isEmptyUser_id( { db, data } ) );
    errors.push( isEmptyTitle( { db, data } ) );
    errors.push( await isExistsTitle( { db, data } ) );

    return errors.filter( x => x !== null );
}

const updateValidation = async ( { db, id, data } ) => {
    const errors = [];
    errors.push( isEmptyUser_id( { db, data } ) );
    errors.push( isEmptyTitle( { db, data } ) );
    errors.push( await isExistsTitle( { db, data, id } ) );

    return errors.filter( x => x !== null );
}

const deleteValidation = async ( { db, id } ) => {
    const errors = [];
    errors.push( await isUsedByEntries( { db, id } ) );
    errors.push( await isUsedByPaymentGenres( { db, id } ) );
    errors.push( await isUsedByPaymentFunds( { db, id } ) );
    errors.push( await isUsedByWorkoutGenres( { db, id } ) );
    errors.push( await isUsedByWorkoutEquips( { db, id } ) );

    return errors.filter( x => x !== null );
}

export { createValidation, updateValidation, deleteValidation };
