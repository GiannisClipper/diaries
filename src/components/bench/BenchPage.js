import React, { useContext, useState } from 'react';

import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { AppContext } from '../app/AppContext';

import { BenchContextProvider } from './BenchContext';
import Bench from './Bench';

function BenchPage( { diary_id } ) {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'BenchPage' ) );

    return (
        <BenchContextProvider>
            <AppNav active="diaries" / >

            <AppBox>
                <Bench 
                    diary_id={ diary_id } 
                    lexicon={ lexicon }
                />
            </AppBox>

            <AppInfo>
                { diary_id }
            </AppInfo>
        </BenchContextProvider>
    );
}

export default BenchPage;
export { BenchPage };
