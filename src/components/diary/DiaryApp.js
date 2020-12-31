import React, { useState } from 'react';
import { DiariesContextProvider } from './DiariesContext';
import Diaries from './Diaries';

function DiaryApp() {

    // useEffect( () => console.log( 'Has rendered. ', 'DiaryApp' ) );

    return (
        <DiariesContextProvider>
            <Diaries />
        </DiariesContextProvider>
    );
}

export default DiaryApp;
export { DiaryApp };
