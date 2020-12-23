import { userSchema } from '../schemas';
import { parseUserFromDB } from './parsers';

const usersReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.users.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const users = [ userSchema() ];
            users[ 0 ]._uiux.mode = { isRetrieveMany: true };
            users[ 0 ]._uiux.process = { isRequest: true };

            const { _uiux } = state;
            _uiux.users.process = { isRequest: true };

            return { ...state, users, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.users.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const users = [];
            const { dataFromDB } = action.payload;
            dataFromDB.forEach( x => users.push( { ...userSchema(), ...parseUserFromDB( x ) } ) );
            users.sort( ( x, y ) => x.code > y.code );
            users.push( userSchema() );

            const { _uiux } = state;
            _uiux.users.process = { isResponseOk: true };

            return { ...state, users, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const users = [ userSchema() ];
            users[ 0 ]._uiux.process = { isResponseError: true }

            const { _uiux } = state;
            _uiux.users.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, users, _uiux };

        } default: {
            throw new Error();
        }
    }
}

const userReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { users } = state ;
            const { index, mode } = action.payload;
            users[ index ]._uiux.form = { isOpen: true };
            users[ index ]._uiux.mode = mode;

            return { ...state, users };

        } case 'CLOSE_FORM': {
            const { users } = state ;
            const { index } = action.payload;
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.form = {};
            users[ index ]._uiux.mode = {};

            return { ...state, users };

        } case 'DO_VALIDATION': {
            const { users } = state ;
            const { index } = action.payload;
            users[ index ]._uiux.process = { isValidation: true };

            return { ...state, users };

        } case 'VALIDATION_OK': {
            const { users } = state ;
            const { index, data } = action.payload;
            users[ index ] = { ...users[ index ], ...data };
            users[ index ]._uiux.process = { isValidationOk: true };

            return { ...state, users };

        } case 'VALIDATION_ERROR': {
            const { users } = state ;
            const { index } = action.payload;
            users[ index ]._uiux.process = {};

            return { ...state, users };

        } case 'DO_REQUEST': {
            const { users } = state ;
            const { index } = action.payload;
            users[ index ]._uiux.process = { isRequest: true };

            return { ...state, users };

        } case 'CREATE_RESPONSE_OK': {
            const users = [ ...state.users ];
            const { index, dataFromDB } = action.payload;
            users[ index ] = { ...users[ index ], ...parseUserFromDB( dataFromDB ) };
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};
            users.push( userSchema() );

            return { ...state, users };

        } case 'CREATE_RESPONSE_ERROR': {
            const { users } = state ;
            const { index } = action.payload;
            users[ index ] = userSchema();

            return { ...state, users };

        } case 'UPDATE_RESPONSE_OK': {
            const { users } = state ;
            const { index, dataFromDB } = action.payload;
            users[ index ] = { ...userSchema(), ...parseUserFromDB( dataFromDB ) };
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};

            return { ...state, users };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { users } = state ;
            const { index, _saved } = action.payload;
            users[ index ] = { ...users[ index ], ..._saved };
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};

            return { ...state, users };

        } case 'DELETE_RESPONSE_OK': {
            const users = [ ...state.users ];
            const { index } = action.payload;
            users.splice( index, 1 );

            return { ...state, users };

        } case 'DELETE_RESPONSE_ERROR': {
            const { users } = state ;
            const { index } = action.payload;
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};

            return { ...state, users };

        } default: {
            throw new Error();
        }
    }
}

export { usersReducer, userReducer }; 
