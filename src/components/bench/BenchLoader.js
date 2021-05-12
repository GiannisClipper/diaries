import { useEffect } from 'react';
import { setDateDate } from '@giannisclipper/date'; 

import { benchSchema } from './assets/schemas';

const calcStartDate = startDate => {
    startDate = setDateDate( startDate ) || new Date();
    startDate.setHours( 12 );
    startDate.setMinutes( 0 );
    startDate.setSeconds( 0 );
    startDate.setMilliseconds( 0 );

    return startDate;
}

function BenchLoader( { diary_id, state, actions, assets } ) {

    const { _uiux } = state;

    if ( 
        Object.keys( _uiux.page ).length === 0 || 
        diary_id !== state.diary_id 
    ) {

        actions.openPage( { 
            data: { 
                ...benchSchema(),
                diary_id, 
//                _uiux,
            } 
        } );

    }

    assets.startDate = calcStartDate( state.startDate );

    useEffect( () => {

        if ( _uiux.page.isOpen ) {
            actions.startPage( { assets } );
        } 

    } );

    useEffect( () => console.log( 'Has rendered. ', 'BenchLoader' ) );

    return null;
}

export default BenchLoader;
export { BenchLoader };