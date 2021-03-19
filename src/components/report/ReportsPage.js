import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';

import { ReportsContextProvider } from './ReportsContext';
import Reports from './Reports';

function ReportsPage( { diary_id } ) {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'ReportsPage' ) );

    return (
        <ReportsContextProvider>
            <AppNav>
            <LinkHome title={ lexicon.home } />
                <LinkDiaries title={ lexicon.diary.diaries } />
                <LinkBench title={ lexicon.bench.bench } id={ diary_id } />
                <LinkReports title={ lexicon.report.reports } id={ diary_id } active />
                <LinkBenchSettings title={ lexicon.bench.settings } id={ diary_id } />
                <LinkSignout title={ lexicon.signin.signout } />
            </AppNav>

            <AppBox centeredness>
                <Reports 
                    diary_id={ diary_id }
                    lexicon={ lexicon } 
                />
            </AppBox>

            <AppInfo>
                { lexicon.report.reports }        
            </AppInfo>

        </ReportsContextProvider>
    );
}

export default ReportsPage;
export { ReportsPage };
