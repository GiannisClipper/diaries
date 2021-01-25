import {
    CUT_OK,
    CUT_ERROR,
    PASTE,
    PASTE_OK,
    PASTE_ERROR,
} from '../types/paste';

const cutOk = { type: CUT_OK, payload: {} };
const cutError = { type: CUT_ERROR, payload: {} };
const paste = { type: PASTE, payload: {} };
const pasteOk = { type: PASTE_OK, payload: {} };
const pasteError = { type: PASTE_ERROR, payload: {} };

export default { 
    cutOk,
    cutError,
    paste,
    pasteOk,
    pasteError,    
};