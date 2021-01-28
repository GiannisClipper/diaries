import { useContext, useEffect  } from 'react';

import { retrieveManyRequestFeature } from '../../core/features/requests';

import { FundsContext } from './FundsContext';
import assets from './assets/assets';
import { fundsSchema } from './assets/schemas';

function FundsLoader( { diary_id } ) {

    const { state, actions } = useContext( FundsContext );
    const { _uiux } = state;
    const { schema } = assets;
    assets.schema = () => ( { ...schema(), diary_id } );

    if ( 
        ! _uiux.page.isOpen ||
        diary_id !== state.diary_id
    ) {

        actions.openPage( { data: {
            ...fundsSchema(),
            diary_id,
            funds: [ assets.schema() ],
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
                url: `/.netlify/functions/payment-fund?diary_id=${ diary_id }`
            } );
        }

    } );
        
    // useEffect( () => console.log( 'Has rendered. ', 'payment/FundsLoader' ) );

    return null;
}

export default FundsLoader;
export { FundsLoader };