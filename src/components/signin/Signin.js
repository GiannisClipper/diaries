import React, { useContext, useEffect } from 'react';

import { signinRequestFeature } from '../core/features/requests';

import { AppContext } from '../app/AppContext';
import { urls } from '../app/assets/urls';

import assets from './assets/assets';
import SigninForm from './SigninForm';

function Signin( { lexicon } ) {

    const { state, actions } = useContext( AppContext );
    const { signin } = state;

    // request feature

    useEffect( () => {

        signinRequestFeature( { 
            _item: signin,
            actions,
            assets,
            url: urls.signin
        } );

    }, [ signin, actions ] );
    
    return (
        <SigninForm
            signin={ signin }
            actions={ actions }
            assets={ assets }
            lexicon={ lexicon }
        / >
    );
}

export default Signin;
export { Signin };