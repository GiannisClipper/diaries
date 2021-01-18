import { 
    OPEN_PAGE,
    START_PAGE,
    PREV_PAGE,
    NEXT_PAGE,
} from '../types/page';

const openPage = { type: OPEN_PAGE, payload: {} };
const startPage = { type: START_PAGE, payload: {} };
const prevPage = { type: PREV_PAGE, payload: {} };
const nextPage = { type: NEXT_PAGE, payload: {} };

export default { openPage, startPage, prevPage, nextPage };