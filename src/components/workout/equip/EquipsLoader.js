import { useContext, useEffect  } from 'react';

import { retrieveManyRequestFeature } from '../../core/features/requests';

import assets from './assets/assets';
import { EquipsContext } from './EquipsContext';
import { equipsSchema } from './assets/schemas';

function EquipsLoader( { diary_id } ) {

    const { state, actions } = useContext( EquipsContext );
    const { _uiux } = state;
    const { schema } = assets;
    assets.schema = () => ( { ...schema(), diary_id } );

    if ( 
        ! _uiux.page.isOpen ||
        diary_id !== state.diary_id
    ) {

        actions.openPage( { data: {
            ...equipsSchema(),
            diary_id,
            equips: [ schema() ],
        } } );

        actions.retrieveManyRequestBefore( { assets, index: 0 } );
    }

    // request feature

    useEffect( () => {

        if ( diary_id ) {
            retrieveManyRequestFeature( { 
                _uiux,
                actions,
                assets,
                url: `/.netlify/functions/workout-equip?diary_id=${ diary_id }`
            } );
        }

    } );

    // useEffect( () => console.log( 'Has rendered. ', 'payment/EquipsLoader' ) );

    return null;
}

export default EquipsLoader;
export { EquipsLoader };