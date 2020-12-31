import React, { useState } from 'react';
import { ReportsContextProvider } from './ReportsContext';
import Reports from './Reports';

function ReportApp() {

    // useEffect( () => console.log( 'Has rendered. ', 'ReportApp' ) );

    return (
        <ReportsContextProvider>
            <Reports />
        </ReportsContextProvider>
    );
}

export default ReportApp;
export { ReportApp };
