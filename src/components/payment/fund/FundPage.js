import React, { useState } from 'react';
import { FundsContextProvider } from './FundsContext';
import { AppBox, AppNav } from '../../app/AppPage';
import { LinkHome, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../../app/AppLinks';
import Funds from './Funds';

function FundPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'FundPage' ) );

    return (
        <FundsContextProvider>
            <AppNav>
                <LinkHome />
                <LinkBench />
                <LinkReports />
                <LinkBenchSettings />
                <LinkSignout />
            </AppNav>

            <AppBox centeredness>
                <Funds />
            </AppBox>

        </FundsContextProvider>
    );
}

export default FundPage;
export { FundPage };
