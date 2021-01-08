import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { SigninRequest } from '../core/CoreRequests';

import { AppContext } from '../app/AppContext';
import { parseSigninToDB } from '../../storage/sign/parsers';

import SigninForm from './SigninForm';

function Signin() {

    const { state, dispatch } = useContext( AppContext );
    const { signin } = state;
    const { _uiux } = signin;

    const payload = { _namespace: 'signin', ...signin };
    const dataToDB = parseSigninToDB( signin );

    return (
        <CoreContextProvider 
            actions={ [ 
                actions.validation, 
                actions.signin,
            ] }
            dispatch={ dispatch }
            namespace={ 'signin' }
            payload={ payload }
        >
    
            <SigninRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/signin` }
                dataToDB={ dataToDB }
                body={ JSON.stringify( { data: dataToDB } ) }
                error={ _uiux.error }
            />

            <SigninForm
                process={ _uiux.process }
            / >

        </CoreContextProvider>
    );
}

export default Signin;
export { Signin };