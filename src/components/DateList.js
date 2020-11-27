import React, { useEffect, useRef, useContext } from 'react';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';

import { buttons } from '../storage/texts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import { Scrolling } from './libs/Scrolling';
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

const DateList = () => {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const { dispatch } = STATE;
    const { init } = STATE.state.uiux;

    const outer = useRef( null );
    const inner = useRef( null );
    const prev = useRef( null );
    const next = useRef( null );
    const central = useRef( null );

    const doScrollUp = () => dispatch( { namespace, type: 'DO_INIT', payload: { mode: { isInitPrev: true } } } );
    const doScrollDown = () => dispatch( { namespace, type: 'DO_INIT', payload: { mode: { isInitNext: true } } } );

    REF.current.scrollToCentralDate = () => {
        outer.current.scrollTop = central.current.offsetTop - ( outer.current.clientHeight * 0.10 );
    }

    const entriesMode = () => {
        const process1 = init.payments.genres.process;
        const process2 = init.payments.funds.process;

        return process1.isDone && process2.isDone 
            ? { isRetrieveAll: true }
            : process1.isError || process2.isError 
            ? { isOnRequestError: true }
            : { isWaiting: true };
    }

    useEffect( () => {
        if ( init.dates.mode.isInit && init.dates.process.isWaiting ) {
            REF.current.scrollToCentralDate();
        }
    } );

    // useEffect( () => {
    //     console.log( 'Has rendered. ', 'DateList' );
    // } );

    return (
        <List reference={outer}>
            <ContentBox ref={inner}>

                <Scrolling
                    outer={outer.current}
                    inner={inner.current}
                    prev={prev.current}
                    next={next.current}
                    doScrollUp={doScrollUp}
                    doScrollDown={doScrollDown}
                    scrollRef={REF.current}
                />

                <GenreInit />
                <FundInit />

                <DateInit
                    process={init.dates.process}
                    mode={init.dates.mode}
                    entriesMode={entriesMode()}
                />

                <PrevButton reference={prev} />

                <DateItems 
                    central={central} 
                />

                <NextButton reference={next} />

            </ContentBox>
        </List>
    );
};

const DateItems = ( { central } ) => {

    const STATE = useContext( STATEContext );
    const { dates } = STATE.state.data;

    // useEffect( () => {
    //     console.log( 'Has rendered. ', 'DateItems' );
    // } );

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