import React, { useState } from 'react';
import { GenresContextProvider } from './GenresContext';
import { AppBox, AppNav } from '../../app/AppPage';
import { LinkHome, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../../app/AppLinks';
import Genres from './Genres';

function GenrePage() {

    //useEffect( () => console.log( 'Has rendered. ', 'GenrePage' ) );

    return (
        <GenresContextProvider>
            <AppNav>
                <LinkHome />
                <LinkBench />
                <LinkReports />
                <LinkBenchSettings />
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
