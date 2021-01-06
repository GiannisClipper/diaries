import comboReducer from '../../helpers/comboReducer';
import { oneFormReducer, oneValidationReducer, oneRequestReducer } from '../core/oneReducers';
import { signinReducer, signoutReducer } from '../sign/reducers';
import { settingsReducer } from '../settings/reducers';
import { backupReducer } from '../backup/reducers';

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

                case 'SET_ACTIVE_DIARY': {
                    const { signin } = state;
                    const { diary_id } = action.payload;
                    signin.diary_id = diary_id;
        
                    return { ...state, signin };

                } default: {
                    throw new Error();
                }
            }

        }
    }
}

export { appReducer };