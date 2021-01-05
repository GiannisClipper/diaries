import { useEffect, useContext } from 'react';

import { YYYYMMDDToDate, reprToYYYYMMDD } from '../../helpers/dates';
import { BenchContext } from './BenchContext'; 

const calcStartDate = startDate => {
    startDate = YYYYMMDDToDate( reprToYYYYMMDD( startDate ) ) || new Date();
    startDate.setHours( 12 );
    startDate.setMinutes( 0 );
    startDate.setSeconds( 0 );
    startDate.setMilliseconds( 0 );

    return startDate;
}

function BenchInit( { mode, process } ) {

    const { state, dispatch } = useContext( BenchContext );

    const startDate = calcStartDate( state.startDate );

    const days = 7;

    useEffect( () => {

        if ( process.isInitBefore ) {
            const payload = { mode: { isInitStart: true } };
            dispatch( { type: 'DO_INIT', payload } );

        } else if ( process.isInit ) {

            if ( mode.isInitStart ) {
                const payload = { startDate, days };
                dispatch( { type: 'INIT_START_PERIOD', payload } );

            } else if ( mode.isInitPrev ) {
                const payload = { days };
                dispatch( { type: 'INIT_PREV_PERIOD', payload } );

            } else if ( mode.isInitNext ) {
                const payload = { days };
                dispatch( { type: 'INIT_NEXT_PERIOD', payload } );

            }
        }
    } );

    useEffect( () => console.log( 'Has rendered. ', 'BenchInit', process, mode ) );

    return null;
}

export default BenchInit;
export { BenchInit };