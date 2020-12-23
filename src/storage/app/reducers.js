import { usersReducer, userReducer } from '../user/reducers';

const appReducer = ( state, action ) => {

    switch ( action.namespace ) {

        case 'users': {
            return usersReducer( state, action );

        } case 'user': {
            return userReducer( state, action );
    
        } default: {
            throw new Error();
        }
    }
}

export { appReducer };