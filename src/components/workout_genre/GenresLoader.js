import { useContext, useEffect  } from 'react';

import { retrieveManyRequestFeature } from '../core/features/requests';

import { urls } from '../app/assets/urls';

import assets from './assets/assets';
import { GenresContext } from './GenresContext';
import { genresSchema } from './assets/schemas';

function GenresLoader( { diary_id } ) {

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

    // request feature

    useEffect( () => {

        if ( diary_id ) {
            retrieveManyRequestFeature( { 
                _uiux,
                actions,
                assets,
                url: `${ urls.workout_genre }?diary_id=${ diary_id }`
            } );
        }

    } );

    // useEffect( () => console.log( 'Has rendered. ', 'payment/GenresLoader' ) );

    return null;
}

export default GenresLoader;
export { GenresLoader };