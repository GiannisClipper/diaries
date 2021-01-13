import comboReducer from '../../helpers/comboReducer';
import { formOneReducer } from '../core/reducers/form';
import { validationOneReducer } from '../core/reducers/validation';
import { updateOneReducer } from '../core/reducers/update';
import { signinReducer, signoutReducer } from '../sign/reducers';
import { settingsReducer } from '../settings/reducers';
import { backupReducer } from '../backup/reducers';
import { signinSchema } from '../schemas';

const appReducer = ( state, action ) => {

    switch ( action.payload.namespace ) {

        case 'signin': {
            return comboReducer( 
                validationOneReducer,
                signinReducer 
            )( state, action );

        } case 'signout': {
            return signoutReducer( state, action );

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
                updateOneReducer 
            )( state, action );

        } default: {

            switch ( action.type ) {
    
                case 'HANDLE_ERROR': {
                    const { error } = action.payload;

                    // alert( JSON.stringify( error ) );

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
