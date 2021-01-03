import React, { useState } from 'react';
import { DiariesContextProvider } from './DiariesContext';
import { AppBox, AppNav, LinkHome, LinkDiaries, LinkUsers, LinkSettings, LinkSignout } from '../app/AppPage';
import Diaries from './Diaries';

function DiaryPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'DiaryPage' ) );

    return (
        <DiariesContextProvider>
            <AppNav>
                <LinkHome />
                <LinkDiaries />
                <LinkUsers />
                <LinkSettings />
                <LinkSignout />
            </AppNav>

            <AppBox centeredness>
                <Diaries />
            </AppBox>
        </DiariesContextProvider>
    );
}

export default DiaryPage;
export { DiaryPage };
