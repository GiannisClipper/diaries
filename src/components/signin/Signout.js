import { useContext, useEffect } from 'react';
import presetAction from '../core/helpers/presetAction';
import { AppContext } from '../app/AppContext';
import assets from './assets/assets';

function Signout() {

    const { state, actions } = useContext( AppContext );
    const { signin } = state;
    const { token } = signin;

    const signout = presetAction( actions.signout, { assets } );

    useEffect( () => {
        if ( token ) {
            signout();
        }
    } );

    return null
}

export default Signout;
export { Signout };