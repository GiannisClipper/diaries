import { useContext, useEffect } from 'react';

import { BenchContext } from '../bench/BenchContext';
import { EntriesContext } from './EntriesContext';
import assets from './assets/assets'; 
import { dateToYYYYMMDD } from '../core/helpers/dates';

function EntriesInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, actions } = useContext( EntriesContext );
    const { date, _uiux } = state; 
    const { status } = _uiux;

    assets.schema = () => ( { 
        ...assets.schema(), 
        diary_id, 
        date: dateToYYYYMMDD( date ) 
    } );

    if ( status.isResponseOk ) {
        actions.retrieveManyResponseOkAfter( { assets } );
    }

    useEffect( () => console.log( 'Has rendered. ', 'EntriesInit' ) );

    return null;
}

export default EntriesInit;
export { EntriesInit };