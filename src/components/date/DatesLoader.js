import { useContext, useEffect  } from 'react';
import { setDateStr } from '@giannisclipper/date'; 

import { retrieveManyRequestFeature } from '../core/features/requests';

import { urls } from '../app/assets/urls';

import assets from './assets/assets';
import { DatesContext } from './DatesContext';

function DatesLoader( { diary_id } ) {

    const { state, actions } = useContext( DatesContext );
    const { dates, _uiux } = state;

    const dateFrom = setDateStr( dates[ 0 ].date );
    const dateTill = setDateStr( dates[ dates.length - 1 ].date );

    useEffect( () => {

        if ( diary_id ) {

            if ( Object.keys( _uiux.status ).length === 0 ) {
                actions.retrieveManyRequestBefore( { assets } );

            } else {
                retrieveManyRequestFeature( {
                    _uiux,
                    actions,
                    assets,
                    url: `${ urls.entries }?diary_id=${ diary_id }&range=${ dateFrom }-${ dateTill }`
                } );
            }

        }
    } );
    
    // useEffect( () => console.log( 'Has rendered. ', 'DatesLoader' ) );

    return null;
}

export default DatesLoader;
export { DatesLoader };