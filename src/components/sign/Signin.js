import React, { useContext } from 'react';
import { AppContext } from '../app/AppContext';
import { SigninRequest } from '../core/CoreRequests';
import SigninForm from './SigninForm';

function Signin() {

    const { state } = useContext( AppContext );
    const { signin } = state;
    const { _uiux } = signin;

    return (
        <>
            <SigninRequest 
                Context={ AppContext }
                url={ `/.netlify/functions/signin` }
            />

            <SigninForm
                status={ _uiux.status }
            / >
        </>
    );
}

export default Signin;
export { Signin };