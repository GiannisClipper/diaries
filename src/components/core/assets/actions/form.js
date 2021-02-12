import {
    OPEN_FORM,
    CLOSE_FORM,
} from '../types/form';

const openForm = { type: OPEN_FORM, payload: {} };
const closeForm = { type: CLOSE_FORM, payload: {} };

export default { openForm, closeForm };