import {
    DELETE_REQUEST,
    DELETE_RESPONSE_OK,
    DELETE_RESPONSE_ERROR,
    DELETE_RESPONSE_OK_AFTER, 
    DELETE_RESPONSE_ERROR_AFTER, 
} from '../types/delete';

const deleteRequest = { type: DELETE_REQUEST, payload: {} };
const deleteResponseOk = { type: DELETE_RESPONSE_OK, payload: {} };
const deleteResponseError = { type: DELETE_RESPONSE_ERROR, payload: {} };
const deleteResponseOkAfter = { type: DELETE_RESPONSE_OK_AFTER, payload: {} };
const deleteResponseErrorAfter = { type: DELETE_RESPONSE_ERROR_AFTER, payload: {} };

export default { 
    deleteRequest,
    deleteResponseOk,
    deleteResponseError,
    deleteResponseOkAfter,
    deleteResponseErrorAfter,    
};