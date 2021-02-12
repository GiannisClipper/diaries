import { 
    VALIDATION,
    VALIDATION_OK,
    VALIDATION_ERROR,
} from '../types/validation';

const validation = { type: VALIDATION, payload: {} };
const validationOk = { type: VALIDATION_OK, payload: {} };
const validationError = { type: VALIDATION_ERROR, payload: {} };

export default { validation, validationOk, validationError };
