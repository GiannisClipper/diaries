import React, { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import StyledList from '../libs/ListBox';

import { CoreScroll } from '../core/CoreScroll';
import { CorePasteContextProvider } from '../core/CorePaste';

import texts from '../app/assets/texts';

import { BenchContext } from './BenchContext';
import assets from './assets/assets';
import { BenchInit } from './BenchInit';

import GenresInit from '../payment/genre/GenresInit';

import FundsInit from '../payment/fund/FundsInit';

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

function PrevButton( { reference } ) {
    return (
        <StyledPrevButton ref={reference}>
            <FontAwesomeIcon icon={ faBackward } className="icon" />
            { texts.buttons.prev }
        </StyledPrevButton>
    );
}

const StyledNextButton = styled.button`
    margin-left: 1em;
    font-size: .75em;
`;

function NextButton( { reference } ) {
    return (
        <StyledNextButton ref={ reference }>
            { texts.buttons.next }
            <FontAwesomeIcon icon={ faForward } className="icon" />
        </StyledNextButton>
    );
}

const Bench = ( { diary_id } ) => {

    const { state, actions } = useContext( BenchContext );
    const { periods } = state;

    // to support `scrolling` feature

    const outer = useRef( null );
    const inner = useRef( null );
    const prev = useRef( null );
    const next = useRef( null );

    // to support `scrollToStartDate` feature

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

            <CoreScroll
                outer={ outer.current }
                inner={ inner.current }
                prev={ prev.current }
                next={ next.current }
                doScrollUp={ () => actions.prevPage( { assets } ) }
                doScrollDown={ () => actions.nextPage( { assets } ) }
            />

            <GenresInit 
                diary_id={ diary_id }
            />

            <FundsInit 
                diary_id={ diary_id }
            />

            <BenchInit
                diary_id={ diary_id }
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            <PrevButton reference={ prev } />

            <CorePasteContextProvider>
                <Periods
                    diary_id={ diary_id }
                    periods={ periods }
                    startDate={ startDate }
                />
            </CorePasteContextProvider>

            <NextButton reference={ next } />

        </ListBox>
    );
}

const Periods = ( { diary_id, periods, startDate } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Periods' ) );

    return (
        <ul>
            { periods.map( period => (
                <Period 
                    diary_id={ diary_id }
                    period={ period }
                    startDate={ startDate }
                    key={ period.dates[ 0 ].date }
                />
            ) ) }
        </ul>
    );
}

const Period = React.memo( ( { diary_id, period, startDate } ) => {

    useEffect( () => console.log( 'Has rendered. ', 'Period' ) );

    return (
        <DatesContextProvider state={ period }>
            <Dates
                diary_id={ diary_id }
                startDate={ startDate }
            />
        </DatesContextProvider>
    );
} );


export default Bench;
export { Bench };
