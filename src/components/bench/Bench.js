import React, { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import StyledList from '../commons/ListBox';
import { BackwardIcon, ForwardIcon } from '../commons/Icons';

import scrollFeature from '../core/features/scroll';
import { CutCopyPasteContextProvider } from '../core/CutCopyPasteContext';

import { BenchContext } from './BenchContext';
import assets from './assets/assets';
import { BenchLoader } from './BenchLoader';

import PaymentGenresLoader from '../payment/genre/GenresLoader';
import PaymentFundsLoader from '../payment/fund/FundsLoader';

import WorkoutGenresLoader from '../workout/genre/GenresLoader';
import WorkoutEquipsLoader from '../workout/equip/EquipsLoader';

import { DatesContextProvider } from '../date/DatesContext';
import { Dates } from '../date/Dates';

const ListBox = styled( StyledList.ListBox )`
    display: block;
    margin: auto;
`;

const StyledPrevButton = styled.button`
    margin-right: 1em;
    font-size: .75em;
`;

function PrevButton( { reference, lexicon } ) {
    return (
        <StyledPrevButton ref={reference}>
            <BackwardIcon />
            { lexicon.bench.prev }
        </StyledPrevButton>
    );
}

const StyledNextButton = styled.button`
    margin-left: 1em;
    font-size: .75em;
`;

function NextButton( { reference, lexicon } ) {

    return (
        <StyledNextButton ref={ reference }>
            { lexicon.bench.next }
            <ForwardIcon />
        </StyledNextButton>
    );
}

const Bench = ( { diary_id, lexicon } ) => {

    const { state, actions } = useContext( BenchContext );
    const { periods } = state;

    // scroll feature

    const outer = useRef( null );
    const inner = useRef( null );
    const prev = useRef( null );
    const next = useRef( null );
    const scrollMem = useRef( {
        direction: {},  // isUp, isDown
        scrollTop: 0,  // `outer` element attr: how many pixels already scrolled vertically 
        offsetHeight: 0,  // `inner` element attr: the total height -including padding, border
    } );

    useEffect( () => {

        const args = {
            outer: outer.current,
            inner: inner.current,
            prev: prev.current,
            next: next.current,
            scrollMem: scrollMem.current,
            doScrollUp: () => actions.prevPage( { assets } ),
            doScrollDown: () => actions.nextPage( { assets } ),
        }

        scrollFeature( { ...args } );
        return () => scrollFeature( { ...args, disabled: true } );

    } );

    // scrollToStartDate feature

    const startDate = useRef( null );  

    const alreadyScrolledToStartDate = useRef( false );

    const scrollToStartDate = outer => {
        outer = outer || document.documentElement;
        outer.scrollTop = startDate.current.offsetTop;  // - ( outer.clientHeight * 0.10 );
    }

    useEffect( () => {
        if ( startDate.current && ! alreadyScrolledToStartDate.current ) {   
            scrollToStartDate( outer.current );
            alreadyScrolledToStartDate.current = true;
        }
    } );

    // useEffect( () => console.log( 'Has rendered. ', 'Bench' ) );

    return (
        <ListBox ref={ inner }>

            <PrevButton 
                reference={ prev } 
                lexicon={ lexicon }
            />

            <PaymentGenresLoader
                diary_id={ diary_id }
            />

            <PaymentFundsLoader 
                diary_id={ diary_id }
            />

            <WorkoutGenresLoader
                diary_id={ diary_id }
            />

            <WorkoutEquipsLoader 
                diary_id={ diary_id }
            />

            <BenchLoader
                diary_id={ diary_id }
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            <CutCopyPasteContextProvider>
                <Periods
                    diary_id={ diary_id }
                    periods={ periods }
                    startDate={ startDate }
                    lexicon={ lexicon }
                />
            </CutCopyPasteContextProvider>

            <NextButton 
                reference={ next }
                lexicon={ lexicon }
            />

        </ListBox>
    );
}

const Periods = ( { diary_id, periods, startDate, lexicon } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Periods' ) );

    return (
        <ul>
            { periods.map( period => (
                <Period 
                    diary_id={ diary_id }
                    period={ period }
                    startDate={ startDate }
                    lexicon={ lexicon }
                    key={ period.dates[ 0 ].date }
                />
            ) ) }
        </ul>
    );
}

const Period = React.memo( ( { diary_id, period, startDate, lexicon } ) => {

    useEffect( () => console.log( 'Has rendered. ', 'Period' ) );

    return (
        <DatesContextProvider state={ period }>
            <Dates
                diary_id={ diary_id }
                startDate={ startDate }
                lexicon={ lexicon }
            />
        </DatesContextProvider>
    );
} );


export default Bench;
export { Bench };
