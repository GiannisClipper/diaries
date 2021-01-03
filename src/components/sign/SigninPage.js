import React, { useState } from 'react';
import { AppBox, AppNav } from '../app/AppPage';
import Signin from './Signin';

function SigninPage() {

    // useEffect( () => console.log( 'Has rendered. ', 'SigninPage' ) );

    return (
        <>
        <AppNav />

        <AppBox centeredness>
            <Signin />
        </AppBox>
        </>
    );
}

export default SigninPage;
export { SigninPage };
