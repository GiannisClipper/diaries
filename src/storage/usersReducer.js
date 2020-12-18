import { initUser } from './schemas';
import { parseUserFromDB } from './parsers';

const usersReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const users = [ ...state.data.users ];
            const { index, mode } = action.payload;

            users[ index ].uiux.form = { isOpen: true };
            users[ index ].uiux.mode = mode;

            return { ...state, data: { ...state.data, users } };

        } case 'CLOSE_FORM': {
            const users = [ ...state.data.users ];
            const { index } = action.payload;

            users[ index ].uiux.process = {};
            users[ index ].uiux.form = {};
            users[ index ].uiux.mode = {};

            return { ...state, data: { ...state.data, users } };

        } case 'DO_VALIDATION': {
            const users = [ ...state.data.users ];
            const { index } = action.payload;

            users[ index ].uiux.process = { isValidation: true };

            return { ...state, data: { ...state.data, users } };

        } case 'VALIDATION_OK': {
            const users = [ ...state.data.users ];
            const { index, data } = action.payload;

            users[ index ].uiux.process = { isValidationOk: true };
            users[ index ].data = { ...data };

            return { ...state, data: { ...state.data, users } };

        } case 'VALIDATION_ERROR': {
            const users = [ ...state.data.users ];
            const { index } = action.payload;

            users[ index ].uiux.process = {};

            return { ...state, data: { ...state.data, users } };

        } case 'DO_REQUEST': {
            const users = [ ...state.data.users ];
            const { index } = action.payload;

            users[ index ].uiux.process = { isRequest: true };

            return { ...state, data: { ...state.data, users } };

        } case 'CREATE_RESPONSE_OK': {
            const users = [ ...state.data.users ];
            const { index, dataFromDB } = action.payload;

            users[ index ].data = parseUserFromDB( dataFromDB );
            users[ index ].uiux.process = {};
            users[ index ].uiux.mode = {};
            users[ index ].uiux.form = {};
            //users.sort( ( x, y ) => x.data.username > y.data.username );
            users.push( initUser() );

            return { ...state, data: { ...state.data, users } };

        } case 'CREATE_RESPONSE_ERROR': {
            const users = [ ...state.data.users ];
            const { index } = action.payload;

            users[ index ] = initUser();

            return { ...state, data: { ...state.data, users } };

        } case 'UPDATE_RESPONSE_OK': {
            const users = [ ...state.data.users ];
            const { index, dataFromDB } = action.payload;

            users[ index ] = initUser();
            users[ index ].data = parseUserFromDB( dataFromDB );
            users[ index ].uiux.process = {};
            users[ index ].uiux.mode = {};
            users[ index ].uiux.form = {};
            users.pop();
            //users.sort( ( x, y ) => x.data.username > y.data.username );
            users.push( initUser() );

            return { ...state, data: { ...state.data, users } };

        } case 'UPDATE_RESPONSE_ERROR': {
            const users = [ ...state.data.users ];
            const { index, _saved } = action.payload;

            users[ index ].data = { ..._saved };
            users[ index ].uiux.process = {};
            users[ index ].uiux.mode = {};
            users[ index ].uiux.form = {};

            return { ...state, data: { ...state.data, users } };

        } case 'DELETE_RESPONSE_OK': {
            const users = [ ...state.data.users ];
            const { index } = action.payload;

            users.splice( index, 1 );

            return { ...state, data: { ...state.data, users } };

        } case 'DELETE_RESPONSE_ERROR': {
            const users = [ ...state.data.users ];
            const { index } = action.payload;

            users[ index ].uiux.process = {};
            users[ index ].uiux.mode = {};
            users[ index ].uiux.form = {};

            return { ...state, data: { ...state.data, users } };

        } case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { init } = state.uiux;
            init.users.process = { isRequestBefore: true };

            return { uiux: { ...state.uiux, init }, data: state.data };
            
        } case 'RETRIEVE_MANY_REQUEST': {
            const users = [ initUser() ];
            users[ 0 ].uiux.mode = { isRetrieveMany: true };
            users[ 0 ].uiux.process = { isRequest: true };

            const { init } = state.uiux;
            init.users.process = { isRequest: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, users } };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { init } = state.uiux;
            init.users.process = { isResponseWaiting: true };

            return { uiux: { ...state.uiux, init }, data: state.data };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const users = [];
            const { dataFromDB } = action.payload;

            dataFromDB.forEach( x=> {
                users.push( initUser() );
                users[ users.length - 1 ].data = parseUserFromDB( x );
            } );
            users.sort( ( x, y ) => x.data.code > y.data.code );
            users.push( initUser() );

            const { init } = state.uiux;
            init.users.process = { isResponseOk: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, users } };
 
        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const users = [];
            const user = initUser();
            user.uiux.process = { isResponseError: true }
            users.push( user );

            const { init } = state.uiux;
            init.users.process = { isResponseError: true };
            init.error = action.payload.error;

            return { uiux: { ...state.uiux, init }, data: { ...state.data, users } };

        } default: {
            throw new Error();
        }
    }
}

export default usersReducer;