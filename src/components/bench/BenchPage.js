import React, { useContext, useState } from 'react';
import { BenchContext } from '../bench/BenchContext';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';
import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';
import Bench from './Bench';

function BenchPage( { diary_id } ) {

    const { state, dispatch } = useContext( BenchContext );
    const genresState = useContext( GenresContext ).state;
    const fundsState = useContext( FundsContext ).state;

    if ( diary_id !== state.diary_id ) {
        genresState._uiux.process = { isRequestBefore: true };
        fundsState._uiux.process = { isRequestBefore: true };
        dispatch( { type: 'OPEN_DIARY', payload: { diary_id } } );
    }

    //useEffect( () => console.log( 'Has rendered. ', 'BenchPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkBench diary_id={ diary_id } />
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
