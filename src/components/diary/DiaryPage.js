import React, { useState } from 'react';
import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';

import Diaries from './Diaries';

function DiaryPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'DiaryPage' ) );

    return (
        <>
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
        </>
    );
}

export default DiaryPage;
export { DiaryPage };
