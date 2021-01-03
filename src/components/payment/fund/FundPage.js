import React, { useState } from 'react';
import { FundsContextProvider } from './FundsContext';
import { AppBox, AppNav, LinkHome, LinkBench, LinkReports, LinkSettings, LinkSignout } from '../../app/AppPage';
import Funds from './Funds';

function FundPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'FundPage' ) );

    return (
        <FundsContextProvider>
            <AppNav>
                <LinkHome />
                <LinkBench />
                <LinkReports />
                <LinkSettings />
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
