import {
    CREATE_REQUEST,
    CREATE_RESPONSE_OK,
    CREATE_RESPONSE_ERROR,
    CREATE_RESPONSE_OK_AFTER, 
    CREATE_RESPONSE_ERROR_AFTER, 
} from '../types/create';

const createRequest = { type: CREATE_REQUEST, payload: {} };
const createResponseOk = { type: CREATE_RESPONSE_OK, payload: {} };
const createResponseError = { type: CREATE_RESPONSE_ERROR, payload: {} };
const createResponseOkAfter = { type: CREATE_RESPONSE_OK_AFTER, payload: {} };
const createResponseErrorAfter = { type: CREATE_RESPONSE_ERROR_AFTER, payload: {} };

export default { 
    createRequest,
    createResponseOk,
    createResponseError,
    createResponseOkAfter,
    createResponseErrorAfter,    
};