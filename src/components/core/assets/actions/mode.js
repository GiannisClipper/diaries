import { 
    CREATE_MODE, 
    RETRIEVE_MODE, 
    RETRIEVE_MANY_MODE, 
    UPDATE_MODE, 
    DELETE_MODE, 
    NO_MODE,
} from '../types/mode';

const createMode = { type: CREATE_MODE, payload: {} };
const retrieveMode = { type: RETRIEVE_MODE, payload: {} };
const retrieveManyMode = { type: RETRIEVE_MANY_MODE, payload: {} };
const updateMode = { type: UPDATE_MODE, payload: {} };
const deleteMode = { type: DELETE_MODE, payload: {} };
const noMode = { type: NO_MODE, payload: {} };

export default { 
    createMode, 
    retrieveMode, 
    retrieveManyMode,
    updateMode, 
    deleteMode,
    noMode,
};