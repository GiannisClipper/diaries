import React, { useContext, useEffect } from 'react';

import { GenresContext } from './GenresContext';
import assets from './assets/assets'; 
import GenresInit from './GenresInit';
import Genre from './Genre';

function Genres( { diary_id } ) {

    const { state, actions } = useContext( GenresContext );
    const { genres } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'payment/Genres' ) );

    let index = 0;

    return (
        <ul>
            <GenresInit 
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
                    index={ index++ }
                    key={ index }
                />
            ) ) }
        </ul>
    );
}

export default Genres;
export { Genres };