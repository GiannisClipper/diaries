import React, { useContext, useState } from 'react';
import { AppContext } from '../app/AppContext';
import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import Bench from './Bench';

function BenchPage( { diary_id } ) {

    const { state, dispatch } = useContext( AppContext );

    if ( diary_id && diary_id !== state.signin.diary_id ) {
        dispatch( { type: 'SET_ACTIVE_DIARY', payload: { diary_id } } );
    }

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
