import { isEmpty, isExists, isUsedBy } from '../core/validators';

const isEmptyDiary_id = ( { data } ) =>
    isEmpty( { 
        value: data.diary_id, 
        message: 'payment_funds.diary_id'
    } );

const isEmptyName = ( { data } ) =>
    isEmpty( { 
        value: data.name, 
        message: 'payment_funds.name'
    } );

const isExistsName = async ( { db, data, id } ) =>
    ! data.name
    ? null
    :
    await isExists( { 
        db,
        lookupCollection: 'payment_funds', 
        lookupFields: { diary_id: data.diary_id, name: data.name },
        excludedId: id,
        message: 'payment_funds.name'
    } );

const isExistsCode = async ( { db, data, id } ) =>
    ! data.code
    ? null
    :
    await isExists( { 
        db,
        lookupCollection: 'payment_funds', 
        lookupFields: { diary_id: data.diary_id, code: data.code },
        excludedId: id,
        message: 'payment_funds.code'
    } );

const isUsedByEntries = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'entries',
        lookupFields: { 'type_specs.fund_id': id, type: 'payment' }, 
        message: 'payment_funds.id'
    } );

export { 
    isEmptyDiary_id,
    isEmptyName,
    isExistsName,
    isExistsCode,
    isUsedByEntries 
};