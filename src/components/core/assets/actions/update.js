import {
    UPDATE_REQUEST,
    UPDATE_RESPONSE_OK,
    UPDATE_RESPONSE_ERROR,
    UPDATE_RESPONSE_OK_AFTER, 
    UPDATE_RESPONSE_ERROR_AFTER, 
} from '../types/update';

const updateRequest = { type: UPDATE_REQUEST, payload: {} };
const updateResponseOk = { type: UPDATE_RESPONSE_OK, payload: {} };
const updateResponseError = { type: UPDATE_RESPONSE_ERROR, payload: {} };
const updateResponseOkAfter = { type: UPDATE_RESPONSE_OK_AFTER, payload: {} };
const updateResponseErrorAfter = { type: UPDATE_RESPONSE_ERROR_AFTER, payload: {} };

export default { 
    updateRequest,
    updateResponseOk,
    updateResponseError,
    updateResponseOkAfter,
    updateResponseErrorAfter,    
};