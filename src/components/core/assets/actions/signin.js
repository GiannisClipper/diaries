import { 
    SIGNIN_REQUEST, 
    SIGNIN_RESPONSE_OK,
    SIGNIN_RESPONSE_ERROR,
    SIGNOUT,
} from '../types/signin';

const signinRequest = { type: SIGNIN_REQUEST, payload: {} };
const signinResponseOk = { type: SIGNIN_RESPONSE_OK, payload: {} };
const signinResponseError = { type: SIGNIN_RESPONSE_ERROR, payload: {} };
const signout = { type: SIGNOUT, payload: {} };

export default { signinRequest, signinResponseOk, signinResponseError, signout };