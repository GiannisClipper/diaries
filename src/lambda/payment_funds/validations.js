import { isUsedBy } from '../core/validations';

const deleteValidation = async ( { db, id } ) => {
    const errors = [];

    errors.push( await isUsedBy( { 
        db,
        lookupCollection: 'entries',
        lookupFields: { 'type_specs.fund_id': id, type: 'payment' }, 
        message: 'payment_funds.id'
    } ) );

    return errors.filter( x => x !== null );
}

export { deleteValidation };