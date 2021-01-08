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
const createResponseOkAfter = 'CREATE_RESPONSE_OK_AFTER'; 
const createResponseErrorAfter = 'CREATE_RESPONSE_ERROR_AFTER'; 

const retrieveResponseOk = 'RETRIEVE_RESPONSE_OK'; 
const retrieveResponseError = 'RETRIEVE_RESPONSE_ERROR';
const retrieveResponseOkAfter = 'RETRIEVE_RESPONSE_OK_AFTER'; 
const retrieveResponseErrorAfter = 'RETRIEVE_RESPONSE_ERROR_AFTER'; 

const updateResponseOk = 'UPDATE_RESPONSE_OK'; 
const updateResponseError = 'UPDATE_RESPONSE_ERROR';
const updateResponseOkAfter = 'UPDATE_RESPONSE_OK_AFTER'; 
const updateResponseErrorAfter = 'UPDATE_RESPONSE_ERROR_AFTER'; 

const deleteResponseOk = 'DELETE_RESPONSE_OK'; 
const deleteResponseError = 'DELETE_RESPONSE_ERROR';
const deleteResponseOkAfter = 'DELETE_RESPONSE_OK_AFTER'; 
const deleteResponseErrorAfter = 'DELETE_RESPONSE_ERROR_AFTER'; 

const retrieveManyRequest = 'RETRIEVE_MANY_REQUEST'; 
const retrieveManyResponseWaiting = 'RETRIEVE_MANY_RESPONSE_WAITING'; 
const retrieveManyResponseOk = 'RETRIEVE_MANY_RESPONSE_OK'; 
const retrieveManyResponseError = 'RETRIEVE_MANY_RESPONSE_ERROR'; 
const retrieveManyResponseOkAfter = 'RETRIEVE_MANY_RESPONSE_OK_AFTER'; 
const retrieveManyResponseErrorAfter = 'RETRIEVE_MANY_RESPONSE_ERROR_AFTER'; 

const handleError = "HANDLE_ERROR";

const menu = { openMenu, closeMenu };
const form = { openForm, closeForm };

const validation = { doValidation, validationOk, validationError };

const signup = { doRequest, signupResponseOk, signupResponseError };
const signin = { doRequest, signinResponseOk, signinResponseError };

const createOne = { 
    doRequest, 
    createResponseOk, 
    createResponseError, 
    createResponseOkAfter,
    createResponseErrorAfter,
    handleError,
};

const retrieveOne = { 
    doRequest, 
    retrieveResponseOk, 
    retrieveResponseError, 
    retrieveResponseOkAfter,
    retrieveResponseErrorAfter,
    handleError,
}
const updateOne = { 
    doRequest, 
    updateResponseOk, 
    updateResponseError, 
    updateResponseOkAfter, 
    updateResponseErrorAfter, 
    handleError,
};

const deleteOne = { 
    doRequest, 
    deleteResponseOk, 
    deleteResponseError, 
    deleteResponseOkAfter,
    deleteResponseErrorAfter,
    handleError,
};

const retrieveMany = { 
    retrieveManyRequest, 
    retrieveManyResponseWaiting, 
    retrieveManyResponseOk, 
    retrieveManyResponseError, 
    retrieveManyResponseOkAfter,
    retrieveManyResponseErrorAfter,
    handleError,
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