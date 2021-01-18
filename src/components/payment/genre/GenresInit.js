import React, { useContext, useEffect  } from 'react';

import { RetrieveManyRequest } from '../../core/CoreRequests';

import assets from './assets/assets';
import { GenresContext } from './GenresContext';
import { genresSchema } from './assets/schemas';

function GenresInit( { diary_id } ) {

    const { state, actions } = useContext( GenresContext );
    const { _uiux } = state;
    const { schema } = assets;
    assets.schema = () => ( { ...schema(), diary_id } );

    if ( 
        ! _uiux.page.isOpen ||
        diary_id !== state.diary_id
    ) {

        actions.openPage( { data: {
            ...genresSchema(),
            diary_id,
            genres: [ schema() ],
        } } );

        actions.retrieveManyRequestBefore( { assets, index: 0 } );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'payment/GenresInit' ) );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <RetrieveManyRequest 
                Context={ GenresContext }
                assets={ assets }
                url={ `/.netlify/functions/payment-genre?diary_id=${ diary_id }` }
            />
        );
    }
}

export default GenresInit;
export { GenresInit };