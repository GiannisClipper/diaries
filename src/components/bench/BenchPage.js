import React, { useContext, useState } from 'react';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import Bench from './Bench';

function BenchPage( { diary_id } ) {

    // useEffect( () => console.log( 'Has rendered. ', 'BenchPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkBench id={ diary_id } active />
            <LinkReports />
            <LinkBenchSettings />
            <LinkSignout />
        </AppNav>

        <AppBox>
            <Bench diary_id={ diary_id }/>
        </AppBox>

        <AppInfo>
            { diary_id }
        </AppInfo>
        </>
    );
}

export default BenchPage;
export { BenchPage };
