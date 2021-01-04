const openMenu = 'OPEN_MENU'; 
const closeMenu = 'CLOSE_MENU'; 

const openForm = 'OPEN_FORM'; 
const closeForm = 'CLOSE_FORM'; 

const doValidation = 'DO_VALIDATION'; 
const validationOk = 'VALIDATION_OK'; 
const validationError = 'VALIDATION_ERROR'; 

const doRequest = 'DO_REQUEST'; 

const signupResponseOk = 'SIGNUP_RESPONSE_OK'; 
const signupResponseError = 'SIGNUP_RESPONSE_ERROR'; 

const signinResponseOk = 'SIGNIN_RESPONSE_OK'; 
const signinResponseError = 'SIGNIN_RESPONSE_ERROR'; 

const createResponseOk = 'CREATE_RESPONSE_OK';
const createResponseError = 'CREATE_RESPONSE_ERROR';
const createResponseAfter = 'CREATE_RESPONSE_AFTER'; 

const retrieveResponseOk = 'RETRIEVE_RESPONSE_OK'; 
const retrieveResponseError = 'RETRIEVE_RESPONSE_ERROR';
const retrieveResponseAfter = 'RETRIEVE_RESPONSE_AFTER'; 

const updateResponseOk = 'UPDATE_RESPONSE_OK'; 
const updateResponseError = 'UPDATE_RESPONSE_ERROR';
const updateResponseAfter = 'UPDATE_RESPONSE_AFTER'; 

const deleteResponseOk = 'DELETE_RESPONSE_OK'; 
const deleteResponseError = 'DELETE_RESPONSE_ERROR';
const deleteResponseAfter = 'DELETE_RESPONSE_AFTER'; 

const retrieveManyRequest = 'RETRIEVE_MANY_REQUEST'; 
const retrieveManyResponseWaiting = 'RETRIEVE_MANY_RESPONSE_WAITING'; 
const retrieveManyResponseOk = 'RETRIEVE_MANY_RESPONSE_OK'; 
const retrieveManyResponseError = 'RETRIEVE_MANY_RESPONSE_ERROR'; 
const retrieveManyResponseAfter = 'RETRIEVE_MANY_RESPONSE_AFTER'; 

const menu = { openMenu, closeMenu };
const form = { openForm, closeForm };

const validation = { doValidation, validationOk, validationError };

const signup = { doRequest, signupResponseOk, signupResponseError };
const signin = { doRequest, signinResponseOk, signinResponseError };

const createOne = { doRequest, createResponseOk, createResponseError, createResponseAfter };
const retrieveOne = { doRequest, retrieveResponseOk, retrieveResponseError, retrieveResponseAfter }
const updateOne = { doRequest, updateResponseOk, updateResponseError, updateResponseAfter };
const deleteOne = { doRequest, deleteResponseOk, deleteResponseError, deleteResponseAfter };

const retrieveMany = { 
    retrieveManyRequest, 
    retrieveManyResponseWaiting, 
    retrieveManyResponseOk, 
    retrieveManyResponseError, 
    retrieveManyResponseAfter,
};

export default {
    menu,
    form,
    validation,
    signup,
    signin,
    createOne,
    retrieveOne,
    updateOne,
    deleteOne,
    retrieveMany,
};