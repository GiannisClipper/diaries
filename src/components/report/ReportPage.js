import React, { useState } from 'react';
import { ReportsContextProvider } from './ReportsContext';
import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import Reports from './Reports';

function ReportPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'ReportPage' ) );

    return (
        <ReportsContextProvider>
            <AppNav>
                <LinkHome />
                <LinkBench />
                <LinkReports />
                <LinkBenchSettings />
                <LinkSignout />
            </AppNav>

            <AppBox centeredness>
                <Reports />
            </AppBox>
        </ReportsContextProvider>
    );
}

export default ReportPage;
export { ReportPage };
