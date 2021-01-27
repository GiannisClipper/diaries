import { useContext, useEffect  } from 'react';

import { retrieveManyRequestFeature } from '../core/features/requests';
import { dateToYYYYMMDD } from '../core/helpers/dates';

import { BenchContext } from '../bench/BenchContext';
import { DatesContext } from '../date/DatesContext';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

import assets from './assets/assets';

function DatesInit() {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, actions } = useContext( DatesContext );
    const { dates, _uiux } = state;

    const dateFrom = dateToYYYYMMDD( dates[ 0 ].date );
    const dateTill = dateToYYYYMMDD( dates[ dates.length - 1 ].date );

    const { genres } = useContext( GenresContext ).state;
    const { funds } = useContext( FundsContext ).state;
    const genres_uiux = useContext( GenresContext ).state._uiux;
    const funds_uiux = useContext( FundsContext ).state._uiux;

    useEffect( () => {

        if ( diary_id ) {

            if ( Object.keys( _uiux.status ).length === 0 ) {
                actions.retrieveManyRequestBefore( { assets } );

            } else if ( ! _uiux.status.isResponseOk ) {
                retrieveManyRequestFeature( { 
                    _uiux,
                    actions,
                    assets,
                    url: `/.netlify/functions/entry?diary_id=${ diary_id }&range=${ dateFrom }-${ dateTill }`
                } );
            
            } else {
                const status1 = genres_uiux.status;
                const status2 = funds_uiux.status;
        
                if ( status1.isResponseOkAfter && status2.isResponseOkAfter ) {
                    const payload = { genres, funds, assets };
                    actions.retrieveManyResponseOkAfter( payload );
        
                } else if ( status1.isResponseError || status2.isResponseError ) {
                    const payload = { genres, funds, assets };
                    actions.retrieveManyResponseError( payload );
                }    
            }

        }
    } );
    
    useEffect( () => console.log( 'Has rendered. ', 'DatesInit' ) );

    return null;
}

export default DatesInit;
export { DatesInit };