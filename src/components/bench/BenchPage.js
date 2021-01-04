import React, { useState } from 'react';
import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import Bench from './Bench';

function BenchPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'BenchPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkBench />
            <LinkReports />
            <LinkBenchSettings />
            <LinkSignout />
        </AppNav>

        <AppBox>
            <Bench />
        </AppBox>
        </>
    );
}

export default BenchPage;
export { BenchPage };
