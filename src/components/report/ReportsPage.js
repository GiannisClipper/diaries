import React, { useState } from 'react';
import { ReportsContextProvider } from './ReportsContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import Reports from './Reports';

function ReportsPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'ReportsPage' ) );

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
                <Reports />
            </AppBox>

            <AppInfo>
                Καταστάσεις        
            </AppInfo>

        </ReportsContextProvider>
    );
}

export default ReportsPage;
export { ReportsPage };
