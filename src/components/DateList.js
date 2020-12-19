import React, { useEffect, useRef, useContext, useState } from 'react';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';

import { buttons } from '../storage/texts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import { CopyPasteContextProvider } from './libs/CopyPaste';
import { Scroll } from './libs/Scroll';
import { GenreInit } from './payments/GenreList';
import { FundInit } from './payments/FundList';
import DateInit from './DateInit';

import ADate from './ADate';
import styled from 'styled-components';
import StyledList from './libs/ListBox';

const namespace = 'dates';

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

const DateList = ( { scrollToCentralDate } ) => {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const { dispatch } = STATE;
    const { init } = STATE.state.uiux;

    // to pass component references to `Scroll` component
    const outer = useRef( null );
    const inner = useRef( null );
    const prev = useRef( null );
    const next = useRef( null );
    const central = useRef( null );

    // to update `Scroll` component with other component references
    const [ scrollUpdated, setScrollUpdated ] = useState( false );

    useEffect( () => setScrollUpdated( true ), [] );

    // to control that auto scrolling to central date happens once
    const hasScrolledToCentralDate = useRef( false );

    useEffect( () => {
        if ( !hasScrolledToCentralDate.current && central.current ) {   
            REF.current.scrollToCentralDate();
            hasScrolledToCentralDate.current = true;
        }
    } );

    REF.current.scrollToCentralDate = () => {
        outer.current.scrollTop = central.current.offsetTop - ( outer.current.clientHeight * 0.10 );
    }

    useEffect( () => console.log( 'Has rendered. ', 'DateList' ) );

    return (
        <List reference={outer}>

            <ContentBox ref={inner}>
                <GenreInit />
                <FundInit />

                <DateInit
                    process={init.dates.process}
                    mode={init.dates.mode}
                />

                <PrevButton reference={prev} />

                    <CopyPasteContextProvider
                        doCutPaste={payload => dispatch( { namespace: 'entries', type: 'MOVE_ENTRY', payload } )}
                        doCopyPaste={payload => dispatch( { namespace: 'entries', type: 'COPY_ENTRY', payload } )}
                    >

                        <DateItems 
                            central={central} 
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
                doScrollUp={() => dispatch( { namespace, type: 'DO_INIT', payload: { mode: { isInitPrev: true } } } )}
                doScrollDown={() => dispatch( { namespace, type: 'DO_INIT', payload: { mode: { isInitNext: true } } } )}
            />

        </List>
    );
};

const DateItems = ( { central } ) => {

    const STATE = useContext( STATEContext );
    const { dates } = STATE.state.data;

    // useEffect( () => console.log( 'Has rendered. ', 'DateItems' ) );

    return (
        <ul>
            {dates.map( aDate => (
                <ADate
                    key={aDate.data.date}
                    aDate={aDate}
                    reference={aDate.uiux.isTheCentral ? central : null}
                /> 
            ) )}
        </ul>
    );
}

export default DateList;