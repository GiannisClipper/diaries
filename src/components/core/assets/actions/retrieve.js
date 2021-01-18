import {
    RETRIEVE_REQUEST,
    RETRIEVE_RESPONSE_OK,
    RETRIEVE_RESPONSE_ERROR,
    RETRIEVE_RESPONSE_OK_AFTER, 
    RETRIEVE_RESPONSE_ERROR_AFTER, 
} from '../types/retrieve';

const retrieveRequest = { type: RETRIEVE_REQUEST, payload: {} };
const retrieveResponseOk = { type: RETRIEVE_RESPONSE_OK, payload: {} };
const retrieveResponseError = { type: RETRIEVE_RESPONSE_ERROR, payload: {} };
const retrieveResponseOkAfter = { type: RETRIEVE_RESPONSE_OK_AFTER, payload: {} };
const retrieveResponseErrorAfter = { type: RETRIEVE_RESPONSE_ERROR_AFTER, payload: {} };

export default { 
    retrieveRequest,
    retrieveResponseOk,
    retrieveResponseError,
    retrieveResponseOkAfter,
    retrieveResponseErrorAfter,    
};