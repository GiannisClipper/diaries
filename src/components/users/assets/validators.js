import { isEmpty, isInvalid } from '../../core/assets/validators';

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

const isInvalidPassword = ( { data } ) =>
    ! data.password
    ? null
    :
    isInvalid( { 
        value: data.password, 
        values: [ data.password2 ],
        message: 'users.password'
    } );

export {
    isEmptyUsername,
    isEmptyPassword,
    isInvalidPassword,
};