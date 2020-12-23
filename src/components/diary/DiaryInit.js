import { useEffect, useContext } from 'react';

import { YYYYMMDDToDate, reprToYYYYMMDD } from '../../helpers/dates';
import { DiaryContext } from './DiaryContext'; 

const calcCentralDate = centralDate => {
    centralDate = YYYYMMDDToDate( reprToYYYYMMDD( centralDate ) ) || new Date();
    centralDate.setHours( 12 );
    centralDate.setMinutes( 0 );
    centralDate.setSeconds( 0 );
    centralDate.setMilliseconds( 0 );

    return centralDate;
}

function DiaryInit( { mode, process } ) {

    const { state, dispatch } = useContext( DiaryContext );

    const centralDate = calcCentralDate( state.centralDate );

    const days = 7;

    useEffect( () => {

        if ( process.isInitBefore ) {
            const payload = { mode: { isInitStart: true } };
            dispatch( { type: 'DO_INIT', payload } );

        } else if ( process.isInit ) {

            if ( mode.isInitStart ) {
                const payload = { centralDate, days };
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

    return null;
}

export default DiaryInit;
export { DiaryInit };