import {
    RETRIEVE_MANY_REQUEST_BEFORE,
    RETRIEVE_MANY_REQUEST,
    RETRIEVE_MANY_RESPONSE_WAITING,
    RETRIEVE_MANY_RESPONSE_OK,
    RETRIEVE_MANY_RESPONSE_ERROR,
    RETRIEVE_MANY_RESPONSE_OK_AFTER, 
    RETRIEVE_MANY_RESPONSE_ERROR_AFTER, 
} from '../types/retrieveMany';

const retrieveManyRequestBefore = { type: RETRIEVE_MANY_REQUEST_BEFORE, payload: {} };
const retrieveManyRequest = { type: RETRIEVE_MANY_REQUEST, payload: {} };
const retrieveManyResponseWaiting = { type: RETRIEVE_MANY_RESPONSE_WAITING, payload: {} };
const retrieveManyResponseOk = { type: RETRIEVE_MANY_RESPONSE_OK, payload: {} };
const retrieveManyResponseError = { type: RETRIEVE_MANY_RESPONSE_ERROR, payload: {} };
const retrieveManyResponseOkAfter = { type: RETRIEVE_MANY_RESPONSE_OK_AFTER, payload: {} };
const retrieveManyResponseErrorAfter = { type: RETRIEVE_MANY_RESPONSE_ERROR_AFTER, payload: {} }; 

export default { 
    retrieveManyRequestBefore,
    retrieveManyRequest,
    retrieveManyResponseWaiting,
    retrieveManyResponseOk,
    retrieveManyResponseError,
    retrieveManyResponseOkAfter,
    retrieveManyResponseErrorAfter,    
};