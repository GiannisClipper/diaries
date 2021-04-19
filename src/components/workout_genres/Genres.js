import React, { useContext, useEffect } from 'react';

import { GenresContext } from './GenresContext';
import assets from './assets/assets'; 
import GenresLoader from './GenresLoader';
import Genre from './Genre';

function Genres( { diary_id, lexicon } ) {

    const { state, actions } = useContext( GenresContext );
    const { genres } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'payment/Genres' ) );

    let index = 0;

    return (
        <ul>
            <GenresLoader 
                diary_id={ diary_id }
                state={ state }
                actions={ actions }
                assets={ assets }            
            />

            { genres.map( genre => (
                <Genre
                    genres={ genres }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                    index={ index++ }
                    key={ index }
                />
            ) ) }
        </ul>
    );
}

export default Genres;
export { Genres };