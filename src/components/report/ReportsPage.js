import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';

import lexicons from './assets/lexicons';
import { ReportsContextProvider } from './ReportsContext';
import Reports from './Reports';

function ReportsPage() {

    const { language } = useContext( AppContext ).state.settings;
    const lexicon = lexicons[ language ] || lexicons.DEFAULT;

    // useEffect( () => console.log( 'Has rendered. ', 'ReportsPage' ) );

    return (
        <ReportsContextProvider>
            <AppNav>
                <LinkHome />
                <LinkDiaries />
                <LinkBench />
                <LinkReports active />
                <LinkBenchSettings />
                <LinkSignout />
            </AppNav>

            <AppBox centeredness>
                <Reports lexicon={ lexicon } />
            </AppBox>

            <AppInfo>
                { lexicon.reports }        
            </AppInfo>

        </ReportsContextProvider>
    );
}

export default ReportsPage;
export { ReportsPage };
