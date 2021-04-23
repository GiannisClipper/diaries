import { HANDLE_LEXICON } from '../../core/assets/types/lexicon';
import { HANDLE_ERROR } from '../../core/assets/types/error';

import comboReducer from '../../core/helpers/comboReducer';

import { modeOneReducer } from '../../core/reducers/mode';
import { formOneReducer } from '../../core/reducers/form';
import { validationOneReducer } from '../../core/reducers/validation';
import { retrieveOneReducer } from '../../core/reducers/retrieve';
import { updateOneReducer } from '../../core/reducers/update';
import { signinReducer } from '../../signin/reducers/signin';
import { updateOneSettingsReducer } from '../../settings/reducers/update';
import { retrieveOneBackupReducer } from '../../backup/reducers/retrieve';

import { signinSchema } from '../../signin/assets/schemas';
import lexicons from '../assets/lexicons';

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
                modeOneReducer,
                formOneReducer, 
                validationOneReducer, 
                updateOneSettingsReducer, 
                updateOneReducer
            )( state, action );

        } case 'backup': {
            return comboReducer( 
                modeOneReducer,
                formOneReducer,
                retrieveOneBackupReducer,
                retrieveOneReducer,
            )( state, action );

        } default: {

            switch ( action.type ) {
    
                case HANDLE_LEXICON: {
                    const { language } = action.payload;
                    const { _uiux, settings } = state;

                    const lexicon = lexicons[ language ] || lexicons.DEFAULT;
                    settings.language = lexicon.language;

                    return { ...state, settings, _uiux: { ..._uiux, lexicon } };
        
                } case HANDLE_ERROR: {
                    const { error } = action.payload;
                    let { signin } = state;

                    if ( error.message.includes( 'No auth' ) ) {
                        signin = signinSchema();
                    }

                    state._uiux.error = error;

                    return { ...state, signin };

                } default: {
                    console.log( `undefined action type:${ action.type }` );
                    throw new Error();
                }
            }
        }
    }
}

export { appReducer };
