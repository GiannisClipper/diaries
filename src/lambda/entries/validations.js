import {
    isEmptyDiary_id,
    isEmptyDate,
    isInvalidDate,
    isEmptyType,
    isInvalidType,
    isEmptyNote,
    isEmptyPayment_genre_id,
    isEmptyPayment_fund_id,
    isEmptyWorkoutGenre_id
} from './validators';

const createValidation = async ( { db, data } ) => {
    const errors = [];
    errors.push( isEmptyDiary_id( { data } ) );
    errors.push( isEmptyDate( { data } ) );
    errors.push( isInvalidDate( { data } ) );
    errors.push( isEmptyType( { data } ) );
    errors.push( isInvalidType( { data } ) );

    if ( data.type === 'note' ) {
        errors.push( isEmptyNote( { data } ) );

    } if ( data.type === 'payment' ) {
        errors.push( isEmptyPayment_genre_id( { data } ) );
        errors.push( isEmptyPayment_fund_id( { data } ) );

    } if ( data.type === 'workout' ) {
        errors.push( isEmptyWorkoutGenre_id( { data } ) );
    }

    return errors.filter( x => x !== null );
}

const updateValidation = async ( { db, id, data } ) => {
    const errors = [];
    errors.push( isEmptyDiary_id( { data } ) );
    errors.push( isEmptyDate( { data } ) );
    errors.push( isInvalidDate( { data } ) );
    errors.push( isEmptyType( { data } ) );
    errors.push( isInvalidType( { data } ) );

    if ( data.type === 'note' ) {
        errors.push( isEmptyNote( { data } ) );

    } if ( data.type === 'payment' ) {
        errors.push( isEmptyPayment_genre_id( { data } ) );
        errors.push( isEmptyPayment_fund_id( { data } ) );

    } if ( data.type === 'workout' ) {
        errors.push( isEmptyWorkoutGenre_id( { data } ) );
    }

    return errors.filter( x => x !== null );
}

export { createValidation, updateValidation };