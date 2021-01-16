import React, { useContext, useEffect } from 'react';

import { GenresContext } from './GenresContext';

import GenresInit from './GenresInit';
import Genre from './Genre';

function Genres() {

    const { state } = useContext( GenresContext );
    const { genres } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'payment/Genres' ) );

    let index = 0;

    return (
        <ul>
            <GenresInit />

            { genres.map( genre => (
                <Genre
                    index={ index++ }
                    key={ index }
                />
            ) ) }
        </ul>
    );
}

export default Genres;
export { Genres };