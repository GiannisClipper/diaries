import { isEmptyUsername, isEmptyPassword } from '../users/validators';

const createValidation = async ( { data } ) => {
    const errors = [];
    errors.push( isEmptyUsername( { data } ) );
    errors.push( isEmptyPassword( { data } ) );

    return errors.filter( x => x !== null );
}

export { createValidation };