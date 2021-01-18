import { HANDLE_ERROR } from '../../core/assets/types/error';
import comboReducer from '../../core/helpers/comboReducer';
import { formOneReducer } from '../../core/assets/reducers/form';
import { validationOneReducer } from '../../core/assets/reducers/validation';
import { retrieveOneReducer } from '../../core/assets/reducers/retrieve';
import { updateOneReducer } from '../../core/assets/reducers/update';
import { signinReducer } from '../../signin/assets/reducers';
import { settingsReducer } from '../../settings/assets/reducers';
import { backupReducer } from '../../backup/assets/reducers';
import { signinSchema } from '../../signin/assets/schemas';

const appReducer = ( state, action ) => {

    const { assets } = action.payload;
    const namespace = assets ? assets.namespace : undefined;

    switch ( namespace ) {

        case 'signin': {
            return comboReducer( 
                validationOneReducer,
                signinReducer 
            )( state, action );

        } case 'settings': {
            return comboReducer( 
                formOneReducer, 
                validationOneReducer, 
                settingsReducer, 
                updateOneReducer
            )( state, action );

        } case 'backup': {
            return comboReducer( 
                formOneReducer,
                backupReducer,
                retrieveOneReducer,
            )( state, action );

        } default: {

            switch ( action.type ) {
    
                case HANDLE_ERROR: {
                    const { error } = action.payload;

                    let { signin } = state;

                    if ( error && error.message && error.message.includes( 'No auth' ) ) {
                        signin = signinSchema();
                    }

                    state._uiux.error = error;

                    return { ...state, signin };
        
                } default: {
                    console.log( `undefined type:${ action.type }` );
                    throw new Error();
                }
            }
        }
    }
}

export { appReducer };
