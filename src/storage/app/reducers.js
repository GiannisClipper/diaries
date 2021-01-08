import comboReducer from '../../helpers/comboReducer';
import { oneFormReducer, oneValidationReducer, oneRequestReducer } from '../core/oneReducers';
import { signinReducer, signoutReducer } from '../sign/reducers';
import { settingsReducer } from '../settings/reducers';
import { backupReducer } from '../backup/reducers';
import { signinSchema } from '../schemas';

const appReducer = ( state, action ) => {

    switch ( action.namespace ) {

        case 'signin': {
            return comboReducer( oneValidationReducer, signinReducer )( state, action );

        } case 'signout': {
            return signoutReducer( state, action );

        } case 'settings': {
            return comboReducer( oneFormReducer, oneValidationReducer, settingsReducer, oneRequestReducer )( state, action );

        } case 'backup': {
            return comboReducer( oneFormReducer, backupReducer, oneRequestReducer )( state, action );

        } default: {

            switch ( action.type ) {
    
                case 'HANDLE_ERROR': {
                    const error = action.payload;

                    let { signin } = state;

                    if ( error && error.message && error.message.includes( 'No auth' ) ) {
                        signin = signinSchema();
                    }

                    state._uiux.error = error;

                    return { ...state, signin };
        
                } default: {
                    console.log( `undefined type:${action.type}` );
                    throw new Error();
                }
            }
        }
    }
}

export { appReducer };
