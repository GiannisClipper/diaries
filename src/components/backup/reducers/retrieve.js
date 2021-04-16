import { RETRIEVE_RESPONSE_OK_AFTER } from '../../core/assets/types/retrieve';

import { backupSchema } from '../assets/schemas';

const retrieveOneBackupReducer = ( state, action ) => {

    switch ( action.type ) {

        case RETRIEVE_RESPONSE_OK_AFTER: {
            const backup = backupSchema();
            backup._uiux.status = { isResponseOkAfter: true };

            return { ...state, backup };

        } default: {
            return undefined;
        }
    }
}

export { retrieveOneBackupReducer }; 
