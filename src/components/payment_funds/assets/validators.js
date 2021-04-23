import { isEmpty } from '../../core/assets/validators';

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

export { 
    isEmptyDiary_id,
    isEmptyName,
};