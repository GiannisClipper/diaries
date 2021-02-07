import React, { useContext, useState } from 'react';

import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import { AppContext } from '../app/AppContext';

import { BenchContextProvider } from './BenchContext';
import Bench from './Bench';

function BenchPage( { diary_id } ) {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'BenchPage' ) );

    return (
        <BenchContextProvider>
            <AppNav>
                <LinkHome title={ lexicon.home } />
                <LinkDiaries title={ lexicon.diary.diaries } />
                <LinkBench title={ lexicon.bench.bench } id={ diary_id } active />
                <LinkReports title={ lexicon.report.reports } />
                <LinkBenchSettings title={ lexicon.bench.settings } id={ diary_id } />
                <LinkSignout title={ lexicon.signin.signout } />
            </AppNav>

            <AppBox>
                <Bench diary_id={ diary_id } />
            </AppBox>

            <AppInfo>
                { diary_id }
            </AppInfo>
        </BenchContextProvider>
    );
}

export default BenchPage;
export { BenchPage };
