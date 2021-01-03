import React, { useState } from 'react';
import { ReportsContextProvider } from './ReportsContext';
import { AppBox, AppNav, LinkHome, LinkBench, LinkReports, LinkSettings, LinkSignout } from '../app/AppPage';
import Reports from './Reports';

function ReportPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'ReportPage' ) );

    return (
        <ReportsContextProvider>
            <AppNav>
                <LinkHome />
                <LinkBench />
                <LinkReports />
                <LinkSettings />
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
