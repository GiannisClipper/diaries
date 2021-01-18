import { OPEN_PAGE } from '../../core/assets/types/page';

const reportsReducer = ( state, action ) => {

    switch ( action.type ) {

        case OPEN_PAGE: {
            const { assets, data } = action.payload;
            const { namespace, schema } = assets;
            const { _uiux } = state;

            const _items = data.map( x => ( { ...schema(), ...x } ) );
            _uiux.page = { isOpen: true };

            return { ...state, [ namespace ]: _items, _uiux };
        
        } default: {
            return undefined;
        }
    }
}

export { reportsReducer };