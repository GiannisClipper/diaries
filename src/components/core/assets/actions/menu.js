import { 
    OPEN_MENU, 
    CLOSE_MENU 
} from '../types/menu';

const openMenu = { type: OPEN_MENU, payload: {} };
const closeMenu = { type: CLOSE_MENU, payload: {} };

export default { openMenu, closeMenu };