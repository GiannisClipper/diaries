const authReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'DO_VALIDATION': {
            const signin = state.data.signin;
            signin.uiux.process = { isOnValidation: true };
            return { ...state, data: { ...state.data, signin } };

        } case 'VALIDATION_DONE': {
            const signin = state.data.signin;
            signin.uiux.process = { isOnValidationDone: true };
            return { ...state, data: { ...state.data, signin } };

        } case 'VALIDATION_ERROR': {
            const signin = state.data.signin;
            signin.uiux.process = {};
            return { ...state, data: { ...state.data, signin } };

        } case 'DO_REQUEST': {
            const signin = state.data.signin;
            signin.uiux.process = { isOnRequest: true };
            return { ...state, data: { ...state.data, signin } };

        } case 'SIGNIN_REQUEST_DONE': {
            const signin = state.data.signin;
            signin.uiux.process = {};
            signin.data = action.payload;
            localStorage.setItem( 'token', signin.data.token );
            return { ...state, data: { ...state.data, signin } };

        } case 'SIGNIN_REQUEST_ERROR': {
            const signin = state.data.signin;
            signin.uiux.process = {};
            signin.data = {};
            localStorage.removeItem( 'token' );
            return { ...state, data: { ...state.data, signin } };

        } case 'DO_SIGNOUT': {
            const signin = state.data.signin;
            signin.uiux.process = {};
            signin.data = action.payload;
            localStorage.removeItem( 'token' );
            return { ...state, data: { ...state.data, signin } };

        } default: {
            throw new Error();
        }
    }
}

export default authReducer;