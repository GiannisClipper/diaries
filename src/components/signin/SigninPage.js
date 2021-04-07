import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav } from '../app/AppPage';

import Signin from './Signin';

function SigninPage() {

    const { state } = useContext( AppContext );
    const { _uiux } = state;
    const { lexicon } = _uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'SigninPage' ) );

    return (
        <>
        <AppNav />

        <AppBox centeredness>
            <Signin lexicon={ lexicon } />
        </AppBox>
        </>
    );
}

export default SigninPage;
export { SigninPage };
