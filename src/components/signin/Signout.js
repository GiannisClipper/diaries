import { useContext, useEffect } from 'react';
import prepayAction from '../core/helpers/prepayAction';
import { AppContext } from '../app/AppContext';
import assets from './assets/assets';

function Signout() {

    const { state, actions } = useContext( AppContext );
    const { signin } = state;
    const { token } = signin;

    const signout = prepayAction( actions.signout, { assets } );

    useEffect( () => {
        if ( token ) {
            signout();
        }
    } );

    return null
}

export default Signout;
export { Signout };