import { useEffect } from 'react';
import { setDateStr } from '@giannisclipper/date'; 

function EntriesLoader( { diary_id, state, actions, assets }) {

    const { date, _uiux } = state; 
    const { dataFromDB, status } = _uiux;

    const schema = assets.schema;
    assets.schema = () => ( { 
        ...schema(), diary_id, date: setDateStr( date ) 
    } );

    if ( dataFromDB && status.isResponseOk ) {
        actions.retrieveManyResponseOkAfter( { assets } );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'EntriesLoader' ) );

    return null;
}

export default EntriesLoader;
export { EntriesLoader };