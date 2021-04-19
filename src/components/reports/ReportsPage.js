import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';

import { ReportsContextProvider } from './ReportsContext';
import Reports from './Reports';

function ReportsPage( { diary_id } ) {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'ReportsPage' ) );

    return (
        <ReportsContextProvider>
            <AppNav active="diaries" / >

            <AppBox centeredness>
                <Reports 
                    diary_id={ diary_id }
                    lexicon={ lexicon } 
                />
            </AppBox>

            <AppInfo>
                { lexicon.reports.reports }        
            </AppInfo>

        </ReportsContextProvider>
    );
}

export default ReportsPage;
export { ReportsPage };
