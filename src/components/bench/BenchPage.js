import React, { useContext, useState } from 'react';

import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import { AppContext } from '../app/AppContext';
import appLexicons from '../app/assets/lexicons';

import { BenchContextProvider } from './BenchContext';
import Bench from './Bench';

function BenchPage( { diary_id } ) {

    const { language } = useContext( AppContext ).state.settings;
    const appLexicon = appLexicons[ language ] || appLexicons.DEFAULT;

    // useEffect( () => console.log( 'Has rendered. ', 'BenchPage' ) );

    return (
        <BenchContextProvider>
            <AppNav>
                <LinkHome title={ appLexicon.home } />
                <LinkDiaries title={ appLexicon.diaries } />
                <LinkBench title={ appLexicon.bench } id={ diary_id } active />
                <LinkReports title={ appLexicon.reports } />
                <LinkBenchSettings title={ appLexicon.bench_settings } id={ diary_id } />
                <LinkSignout title={ appLexicon.signout } />
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
