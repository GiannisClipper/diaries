import React, { useEffect, useRef, useContext, useState } from 'react';

import { AppContext } from '../app/AppContext';
// import { DiariesContextProvider } from './DiariesContext';
import { DiaryContextProvider, DiaryContext } from './DiaryContext';
import { DiaryInit } from './DiaryInit';
import { Periods } from '../period/Period';
import { REFContext } from '../REFContext';

import { buttons } from '../../storage/texts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import { CopyPasteContextProvider } from '../libs/CopyPaste';
import { Scroll } from '../libs/Scroll';
import { GenreInit } from '../payment/GenreInit';
import { FundInit } from '../payment/FundInit';

import styled from 'styled-components';
import StyledList from '../libs/ListBox';

const ListBox = styled( StyledList.ListBox )`
    display: block;
    margin: auto;
    height: 90vh;
    overflow: auto;
`;

const ContentBox = styled.div`
    border: 0px solid blue;
`;

function List( { reference, children } ) {
    return (
        <ListBox ref={reference}>
            {children}
        </ListBox>
    );
}

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
        <StyledNextButton ref={reference}>
            {buttons.next}
            <FontAwesomeIcon icon={ faForward } className="icon" />
        </StyledNextButton>
    );
}

const Diary = () => {

    const { state, dispatch } = useContext( DiaryContext );
    const { periods, _uiux } = state;

    const REF = useContext( REFContext );

    // to pass component references to `Scroll` component
    const outer = useRef( null );
    const inner = useRef( null );
    const prev = useRef( null );
    const next = useRef( null );
    const centralItem = useRef( null );

    // to update `Scroll` component with other component references
    const [ scrollUpdated, setScrollUpdated ] = useState( false );

    useEffect( () => setScrollUpdated( true ), [] );

    // to control that auto scrolling to central date happens once
    const hasScrolledToCentralDate = useRef( false );

    useEffect( () => {
        if ( !hasScrolledToCentralDate.current && centralItem.current ) {   
            REF.current.scrollToCentralDate();
            hasScrolledToCentralDate.current = true;
        }
    } );

    REF.current.scrollToCentralDate = () => {
        outer.current.scrollTop = centralItem.current.offsetTop - ( outer.current.clientHeight * 0.10 );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'Diary' ) );

    return (
        <List reference={outer}>

            <ContentBox ref={inner}>
                <GenreInit />

                <FundInit />

                <DiaryInit
                    process={ _uiux.process }
                    mode={ _uiux.mode }
                />

                <PrevButton reference={prev} />

                    <CopyPasteContextProvider
                        // doCutPaste={payload => dispatch( { namespace: 'entries', type: 'MOVE_ENTRY', payload } )}
                        // doCopyPaste={payload => dispatch( { namespace: 'entries', type: 'COPY_ENTRY', payload } )}
                    >
                        <Periods
                            periods={ periods }
                            centralItem={ centralItem } 
                        />
                    </CopyPasteContextProvider>

                <NextButton reference={next} />
            </ContentBox>

            <Scroll
                updated={scrollUpdated}
                outer={outer.current}
                inner={inner.current}
                prev={prev.current}
                next={next.current}
                doScrollUp={() => dispatch( { type: 'DO_INIT', payload: { mode: { isInitPrev: true } } } )}
                doScrollDown={() => dispatch( { type: 'DO_INIT', payload: { mode: { isInitNext: true } } } )}
            />

        </List>
    );
}

const Diaries = () => {

    const { state } = useContext( AppContext );
    const { diaries } = state;

    let key = 0;

    return (
        // <DiariesContextProvider state={ diaries }>
            <>
                { diaries.map( diary => (
                    <DiaryContextProvider key={ key++ } state={ diary } >
                        <Diary />
                    </DiaryContextProvider> 
                ) ) }
            </>
        // </DiariesContextProvider>
    );
}

export { Diary, Diaries };
