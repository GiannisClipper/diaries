import { OPEN_PAGE } from '../assets/types/page';

const pageReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_PAGE: {
            const { data } = action.payload;
            state = { ...state, ...data};

            const { _uiux } = state;
            _uiux.page = { isOpen: true };

            return { ...state, _uiux };

        } default: {
            return undefined;
        }    
    }
}

export { pageReducer };
