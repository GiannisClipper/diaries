import { isEmpty, isExists, isUsedBy } from '../core/validators';

const isEmptyUser_id = ( { data } ) =>
    isEmpty( { 
        value: data.user_id, 
        message: 'diaries.user_id'
    } );

const isEmptyTitle = ( { data } ) =>
    isEmpty( { 
        value: data.title, 
        message: 'diaries.title'
    } );

const isExistsTitle = async ( { db, data, id } ) =>
    ! data.title
    ? null
    : 
    await isExists( { 
        db,
        lookupCollection: 'diaries', 
        lookupFields: { user_id: data.user_id, title: data.title },
        excludedId: id,
        message: 'diaries.title'
    } );

const isUsedByEntries = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'entries',
        lookupFields: { diary_id: id }, 
        message: 'diaries.id'
    } );

const isUsedByPaymentGenres = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'payment_genres',
        lookupFields: { diary_id: id }, 
        message: 'diaries.id'
    } );

const isUsedByPaymentFunds = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'payment_funds',
        lookupFields: { diary_id: id }, 
        message: 'diaries.id'
    } );

const isUsedByWorkoutGenres = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'workout_genres',
        lookupFields: { diary_id: id }, 
        message: 'diaries.id'
    } );

const isUsedByWorkoutEquips = async ( { db, id } ) =>
    await isUsedBy( {
        db,
        lookupCollection: 'workout_equips',
        lookupFields: { diary_id: id }, 
        message: 'diaries.id'
    } );

export { 
    isEmptyUser_id,
    isEmptyTitle,
    isExistsTitle,
    isUsedByEntries,
    isUsedByPaymentGenres,
    isUsedByPaymentFunds,
    isUsedByWorkoutGenres,
    isUsedByWorkoutEquips 
};