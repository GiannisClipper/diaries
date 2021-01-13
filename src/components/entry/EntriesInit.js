import { useContext, useEffect } from 'react';
import { EntriesContext } from './EntriesContext';

function EntriesInit() {

    const { state, actions } = useContext( EntriesContext );
    const { _uiux } = state; 
    const { status } = _uiux;
    
    if ( status.isResponseOk ) {
        actions.retrieveManyResponseOkAfter();
    }

    useEffect( () => console.log( 'Has rendered. ', 'EntriesInit' ) );

    return null;
}

export default EntriesInit;
export { EntriesInit };