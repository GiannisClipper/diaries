import { useContext, useEffect } from 'react';
import { AppContext } from '../app/AppContext';

function Signout() {

    const { state, actions, customization } = useContext( AppContext );
    const { signin } = state;
    const { token } = signin;

    const { namespace } = customization.signout;
    const signoutProcess = payload => actions.signoutProcess( { namespace, ...payload } );

    useEffect( () => {
        if ( token ) {
            signoutProcess();
        }
    } );

    return null
}

export default Signout;
export { Signout };