import { isEmpty } from '../../core/assets/validators';

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

export {
    isEmptyUser_id,
    isEmptyTitle,
};