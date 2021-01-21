import {
    CUT_OK,
    PASTE,
    PASTE_OK,
    PASTE_ERROR,
} from '../types/copyPaste';

const cutOk = { type: CUT_OK, payload: {} };
const paste = { type: PASTE, payload: {} };
const pasteOk = { type: PASTE_OK, payload: {} };
const pasteError = { type: PASTE_ERROR, payload: {} };

export default { 
    cutOk,
    paste,
    pasteOk,
    pasteError,    
};