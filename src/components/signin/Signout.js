import { useContext, useEffect } from 'react';
import equipAction from '../core/helpers/equipAction';
import { AppContext } from '../app/AppContext';
import assets from './assets/assets';

function Signout() {

    const { state, actions } = useContext( AppContext );
    const { signin } = state;
    const { token } = signin;

    const { namespace } = assets;
    const signout = equipAction( actions.signout, { assets } );

    useEffect( () => {
        if ( token ) {
            signout();
        }
    } );

    return null
}

export default Signout;
export { Signout };