import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';

import Diaries from './Diaries';

function DiariesPage() {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'DiariesPage' ) );

    return (
        <>
        <AppNav active="diaries" / >

        <AppBox centeredness>
            <Diaries lexicon={ lexicon } />
        </AppBox>

        <AppInfo>
            { lexicon.diary.diaries }
        </AppInfo>
        </>
    );
}

export default DiariesPage;
export { DiariesPage };
