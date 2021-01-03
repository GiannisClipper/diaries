import React, { useState } from 'react';
import { GenresContextProvider } from '../payment/genre/GenresContext';
import { FundsContextProvider } from '../payment/fund/FundsContext';
import { BenchContextProvider } from './BenchContext';
import { AppBox, AppNav, LinkHome, LinkReports, LinkSettings, LinkSignout } from '../app/AppPage';
import Bench from './Bench';

function BenchPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'BenchPage' ) );

    return (
        <GenresContextProvider>
        <FundsContextProvider>
        <BenchContextProvider>
            <AppNav>
                <LinkHome />
                <LinkReports />
                <LinkSettings />
                <LinkSignout />
            </AppNav>

            <AppBox>
                <Bench />
            </AppBox>
        </BenchContextProvider>
        </FundsContextProvider>
        </GenresContextProvider>
    );
}

export default BenchPage;
export { BenchPage };
