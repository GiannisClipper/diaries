import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav } from '../app/AppPage';

import userLexicons from '../user/assets/lexicons';

import lexicons from './assets/lexicons';
import Signin from './Signin';

function SigninPage() {

    const { language } = useContext( AppContext ).state.settings;
    const signinLexicon = lexicons[ language ] || lexicons.DEFAULT;
    const userLexicon = userLexicons[ language ] || userLexicons.DEFAULT;
    const lexicon = { ...signinLexicon, ...userLexicon };

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
