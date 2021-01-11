import React, { useContext } from 'react';
import { AppContext } from '../app/AppContext';
import { SigninRequest } from '../core/CoreRequests';
import SigninForm from './SigninForm';

function Signin() {

    const { state } = useContext( AppContext );
    const { signin } = state;
    const { _uiux } = signin;
    console.log( state )

    return (
        <>
            <SigninRequest 
                Context={ AppContext }
                url={ `/.netlify/functions/signin` }
            />

            <SigninForm
                process={ _uiux.process }
            / >
        </>
    );
}

export default Signin;
export { Signin };