import { userSchema } from '../schemas';
import { parseUserFromDB } from './parsers';

const usersReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const users = [ userSchema() ];
            users[ 0 ]._uiux.mode = { isRetrieveMany: true };
            users[ 0 ]._uiux.process = { isRequest: true };

            const { _uiux } = state;
            _uiux.process = { isRequest: true };

            return { ...state, users, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;

            const users = [];
            dataFromDB.forEach( x => users.push( { ...userSchema(), ...parseUserFromDB( x ) } ) );
            users.sort( ( x, y ) => x.username > y.username ? 1 : -1 );
            users.push( userSchema() );

            const { _uiux } = state;
            _uiux.process = { isResponseOk: true };

            return { ...state, users, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const users = [ userSchema() ];
            users[ 0 ]._uiux.process = { isResponseError: true }

            const { _uiux } = state;
            _uiux.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, users, _uiux };

        } default: {
            return state;
        }    
    }
}

const userReducer = ( state, action ) => {

    switch ( action.type ) {
            
        case 'DO_REQUEST': {
            const { index } = action.payload;
            const { users } = state ;
            users[ index ]._uiux.process = { isRequest: true };

            return { ...state, users };

        } case 'CREATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const users = [ ...state.users ];
            users[ index ] = { ...users[ index ], ...parseUserFromDB( dataFromDB ) };
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};
            users.sort( ( x, y ) => x.username > y.username ? 1 : -1 );
            users.push( userSchema() );

            return { ...state, users };

        } case 'CREATE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { users } = state ;
            users[ index ] = userSchema();

            return { ...state, users };

        } case 'UPDATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const users = [ ...state.users ];
            users[ index ] = { ...userSchema(), ...parseUserFromDB( dataFromDB ) };
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};
            users.pop();
            users.sort( ( x, y ) => x.username > y.username ? 1 : -1 );
            users.push( userSchema() );

            return { ...state, users };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { index, _saved } = action.payload;
            const { users } = state ;
            users[ index ] = { ...users[ index ], ..._saved };
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};

            return { ...state, users };

        } case 'DELETE_RESPONSE_OK': {
            const { index } = action.payload;
            const users = [ ...state.users ];
            users.splice( index, 1 );

            return { ...state, users };

        } case 'DELETE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { users } = state ;
            users[ index ]._uiux.process = {};
            users[ index ]._uiux.mode = {};
            users[ index ]._uiux.form = {};

            return { ...state, users };

        } default: {
            return state;
        }
    }
}

export { 
    usersReducer,
    userReducer,
}; 
