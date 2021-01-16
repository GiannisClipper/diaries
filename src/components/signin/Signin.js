import React, { useContext } from 'react';
import { SigninRequest } from '../core/CoreRequests';
import { AppContext } from '../app/AppContext';
import assets from './assets/assets';
import SigninForm from './SigninForm';

function Signin() {

    const { state, actions } = useContext( AppContext );
    const { signin } = state;

    return (
        <>
            <SigninRequest 
                Context={ AppContext }
                assets={ assets }
                url={ `/.netlify/functions/signin` }
            />

            <SigninForm
                signin={ signin }
                actions={ actions }
                assets={ assets }
            / >
        </>
    );
}

export default Signin;
export { Signin };