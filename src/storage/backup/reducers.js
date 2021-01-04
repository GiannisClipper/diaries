import { backupSchema } from '../schemas';

const backupReducer = ( state, action ) => {

    switch ( action.type ) {

    case 'RETRIEVE_RESPONSE_AFTER': {
        const backup = backupSchema();
        backup._uiux.process = { isResponseAfter: true };

        return { ...state, backup };

    } default: {
            return undefined;
        }
    }
}

export { backupReducer }; 
