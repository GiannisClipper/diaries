import { useContext, useEffect } from 'react';
import { AppContext } from '../app/AppContext';

function Signout() {

    const signin = JSON.parse( localStorage.getItem( 'signin' ) || '{}' );
    const { token } = signin;

    const { dispatch } = useContext( AppContext );

    const doSignout = () => {
        dispatch( { 
            namespace: 'signout',
            type: 'DO_SIGNOUT',
            payload: {},
        } );
    }

    useEffect( () => {
        if ( token ) {
            doSignout();
        }
    } );

    return null
}

export default Signout;
export { Signout };