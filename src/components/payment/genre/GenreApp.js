import React, { useState } from 'react';
import { GenresContextProvider } from './GenresContext';
import Genres from './Genres';

function GenreApp() {

    // useEffect( () => console.log( 'Has rendered. ', 'GenreApp' ) );

    return (
        <GenresContextProvider>
            <Genres />
        </GenresContextProvider>
    );
}

export default GenreApp;
export { GenreApp };
