import { useEffect } from 'react';

import { dateToYYYYMMDD } from '../core/helpers/dates';

function EntriesInit( { diary_id, state, actions, assets }) {

    const { date, _uiux } = state; 
    const { dataFromDB, status } = _uiux;

    const schema = assets.schema;
    assets.schema = () => ( { 
        ...schema(), diary_id, date: dateToYYYYMMDD( date ) 
    } );

    if ( dataFromDB && status.isResponseOk ) {
        actions.retrieveManyResponseOkAfter( { assets } );
    }

    useEffect( () => console.log( 'Has rendered. ', 'EntriesInit' ) );

    return null;
}

export default EntriesInit;
export { EntriesInit };