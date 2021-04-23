import { isEmpty, isExists, isUsedBy } from '../core/validators';

const isEmptyUsername = ( { data } ) =>
    isEmpty( { 
        value: data.username, 
        message: 'users.username'
    } );

const isEmptyPassword = ( { data } ) =>
    isEmpty( { 
        value: data.password, 
        message: 'users.password'
    } );

const isExistsUsername = async ( { db, data, id } ) =>
    await isExists( { 
        db,
        lookupCollection: 'users', 
        lookupFields: { username: data.username },
        excludedId: id,
        message: 'users.username'
    } );

const isUsedByDiaries = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'diaries',
        lookupFields: { user_id: id },
        message: 'users.id'
    } );


export {
    isEmptyUsername,
    isEmptyPassword,
    isExistsUsername,
    isUsedByDiaries 
};