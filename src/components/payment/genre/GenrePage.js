import React, { useState } from 'react';
import { GenresContextProvider } from './GenresContext';
import { AppBox, AppNav, LinkHome, LinkBench, LinkReports, LinkSettings, LinkSignout } from '../../app/AppPage';
import Genres from './Genres';

function GenrePage() {

    //useEffect( () => console.log( 'Has rendered. ', 'GenrePage' ) );

    return (
        <GenresContextProvider>
            <AppNav>
                <LinkHome />
                <LinkBench />
                <LinkReports />
                <LinkSettings />
                <LinkSignout />
            </AppNav>

            <AppBox centeredness>
                <Genres />
            </AppBox>
        </GenresContextProvider>
    );
}

export default GenrePage;
export { GenrePage };
