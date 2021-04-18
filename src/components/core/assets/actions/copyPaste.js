import {
    CUT_BEFORE,
    CUT,
    CUT_OK,
    CUT_ERROR,
    PASTE_BEFORE,
    PASTE,
    PASTE_OK,
    PASTE_ERROR,
} from '../types/copyPaste';

const cutBefore = { type: CUT_BEFORE, payload: {} };
const cut = { type: CUT, payload: {} };
const cutOk = { type: CUT_OK, payload: {} };
const cutError = { type: CUT_ERROR, payload: {} };
const pasteBefore = { type: PASTE_BEFORE, payload: {} };
const paste = { type: PASTE, payload: {} };
const pasteOk = { type: PASTE_OK, payload: {} };
const pasteError = { type: PASTE_ERROR, payload: {} };

export default { 
    cutBefore,
    cut,
    cutOk,
    cutError,
    pasteBefore,
    paste,
    pasteOk,
    pasteError,    
};