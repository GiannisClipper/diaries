import {
    CUT_PROCESS,
    CUT_PROCESS_OK,
    CUT_PROCESS_ERROR,
    COPY_PROCESS,
    COPY_PROCESS_OK,
    COPY_PROCESS_ERROR,
    PASTE_PROCESS,
    PASTE_PROCESS_OK,
    PASTE_PROCESS_ERROR,
} from '../types/copyPaste';

const cutProcess = { type: CUT_PROCESS, payload: {} };
const cutProcessOk = { type: CUT_PROCESS_OK, payload: {} };
const cutProcessError = { type: CUT_PROCESS_ERROR, payload: {} };
const copyProcess = { type: COPY_PROCESS, payload: {} };
const copyProcessOk = { type: COPY_PROCESS_OK, payload: {} };
const copyProcessError = { type: COPY_PROCESS_ERROR, payload: {} };
const pasteProcess = { type: PASTE_PROCESS, payload: {} };
const pasteProcessOk = { type: PASTE_PROCESS_OK, payload: {} };
const pasteProcessError = { type: PASTE_PROCESS_ERROR, payload: {} };

export default { 
    cutProcess,
    cutProcessOk,
    cutProcessError,
    copyProcess,
    copyProcessOk,
    copyProcessError,
    pasteProcess,
    pasteProcessOk,
    pasteProcessError,    
};