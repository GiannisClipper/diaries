import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav } from '../app/AppPage';

import Signin from './Signin';

function SigninPage() {

    const { lexicon } = useContext( AppContext ).state._uiux;

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
