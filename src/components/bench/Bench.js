import React, { useEffect, useRef, useContext, useState } from 'react';

import { BenchContext } from './BenchContext';
import { BenchInit } from './BenchInit';
import { Periods } from '../period/Period';
import { REFContext } from '../REFContext';

import { buttons } from '../../storage/texts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import { CopyPasteContextProvider } from '../libs/CopyPaste';
import { Scroll } from '../libs/Scroll';
import GenresInit from '../payment/genre/GenresInit';
import FundsInit from '../payment/fund/FundsInit';

import styled from 'styled-components';
import StyledList from '../libs/ListBox';

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
            {buttons.prev}
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
            { buttons.next }
            <FontAwesomeIcon icon={ faForward } className="icon" />
        </StyledNextButton>
    );
}

const Bench = () => {

    const { state, dispatch } = useContext( BenchContext );
    const { periods, _uiux } = state;

    const REF = useContext( REFContext );

    // to pass component references to `Scroll` component
    const outer = useRef( null );
    const inner = useRef( null );
    const prev = useRef( null );
    const next = useRef( null );
    const startDate = useRef( null );

    // to update `Scroll` component with other component references
    const [ scrollUpdated, setScrollUpdated ] = useState( false );

    useEffect( () => setScrollUpdated( true ), [] );

    // to control that auto scrolling to central date happens once
    const hasScrolledToCentralDate = useRef( false );

    useEffect( () => {
        if ( !hasScrolledToCentralDate.current && startDate.current ) {   
            REF.current.scrollToCentralDate();
            hasScrolledToCentralDate.current = true;
        }
    } );

    REF.current.scrollToCentralDate = () => {
        //outer.current.scrollTop = startDate.current.offsetTop - ( outer.current.clientHeight * 0.10 );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'Bench' ) );

    return (
        <ListBox ref={ inner }>

            <Scroll
                updated={ scrollUpdated }
                outer={ outer.current }
                inner={ inner.current }
                prev={ prev.current }
                next={ next.current }
                doScrollUp={ () => dispatch( { type: 'DO_INIT', payload: { mode: { isInitPrev: true } } } ) }
                doScrollDown={ () => dispatch( { type: 'DO_INIT', payload: { mode: { isInitNext: true } } } ) }
            />

            <GenresInit />

            <FundsInit />

            <BenchInit
                process={ _uiux.process }
                mode={ _uiux.mode }
            />

            <PrevButton reference={ prev } />

            <CopyPasteContextProvider
                // doCutPaste={payload => dispatch( { namespace: 'entries', type: 'MOVE_ENTRY', payload } )}
                // doCopyPaste={payload => dispatch( { namespace: 'entries', type: 'COPY_ENTRY', payload } )}
            >
                <Periods
                    periods={ periods }
                    startDate={ startDate } 
                />
            </CopyPasteContextProvider>

            <NextButton reference={ next } />

        </ListBox>
    );
}

export default Bench;
export { Bench };
