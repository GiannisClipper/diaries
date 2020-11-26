import React, { useEffect, useRef, useContext } from 'react';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import DateInit from './DateInit';
import { GenreInit } from './payments/GenreList';
import { FundInit } from './payments/FundList';
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
`;

function PrevButton( { reference } ) {
    return (
        <StyledPrevButton ref={reference}>
            <FontAwesomeIcon icon={ faBackward } className="icon" />
            Προηγούμενες ημ/νίες
        </StyledPrevButton>
    );
}

const StyledNextButton = styled.button`
    margin-left: 1em;
`;

function NextButton( { reference } ) {
    return (
        <StyledNextButton ref={reference}>
            Επόμενες ημ/νίες
            <FontAwesomeIcon icon={ faForward } className="icon" />
        </StyledNextButton>
    );
}

function DateList() {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const { init } = STATE.state.uiux;
    const { dates } = STATE.state.data;

    const prevRef = useRef( null );
    const listRef = useRef( null );
    const contentRef = useRef( null );
    const centralRef = useRef( null );
    const nextRef = useRef( null );
    const scrollTop = useRef( 0 );
    const scrollDirection = useRef( {} );
    const offsetHeight = useRef( 0 ); 

    const handleScroll = event => {
        event.stopPropagation();
        const list = listRef.current;
        if ( list.scrollTop < scrollTop.current ) {
            handleScrollUp( event );
        } else {
            handleScrollDown( event );
        }
    }

    const handleScrollUp = event => {
        const list = listRef.current;
        scrollDirection.current = { isUp: true };
        scrollTop.current = list.scrollTop;
        const content = contentRef.current;
        offsetHeight.current = content.offsetHeight;

        const prev = prevRef.current;
        const listBounds = list.getBoundingClientRect();
        const { top, height } = prev.getBoundingClientRect();
        if ( top + ( height * 0.1 ) > listBounds.top || event.type === 'click' ) {
            console.log( 'add_prev_dates' )
            STATE.dispatch( { namespace, type: 'DO_INIT', payload: { mode: { isInitPrev: true } } } );
        }
    }

    const handleScrollDown = event => {
        const list = listRef.current;
        scrollDirection.current = { isDown: true };
        scrollTop.current = list.scrollTop;
        const content = contentRef.current;
        offsetHeight.current = content.offsetHeight;

        const next = nextRef.current;
        const listBounds = list.getBoundingClientRect();
        const { top, height } = next.getBoundingClientRect();
        if ( top + ( height * 0.9 ) < listBounds.bottom || event.type === 'click' ) {
            console.log( 'add_next_dates' )
            STATE.dispatch( { namespace, type: 'DO_INIT', payload: { mode: { isInitNext: true } } } );
        }
    }

    REF.current.scrollToCentralDate = event => {
        const list = listRef.current;
        const central = centralRef.current;
        list.scrollTop = central.offsetTop - ( list.clientHeight * 0.10 );
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

        if ( init.dates.process.isDone ) {
            if ( init.dates.mode.isInit ) {
                console.log( 'scrollToCentralDate' )
                REF.current.scrollToCentralDate();
            }

            const list = listRef.current;
            const content = contentRef.current;
            const prev = prevRef.current;
            const next = nextRef.current;

            if ( scrollDirection.current.isUp ) {
                const offsetDiff = content.offsetHeight - offsetHeight.current;
                list.scrollTop = scrollTop.current + offsetDiff;
            }

            scrollDirection.current = {};
            scrollTop.current = list.scrollTop;
            offsetHeight.current = content.offsetHeight;

            list.addEventListener( 'scroll', handleScroll );
            prev.addEventListener( 'click', handleScrollUp );
            next.addEventListener( 'click', handleScrollDown );

            return () => {
                list.removeEventListener( 'scroll', handleScroll );
                prev.removeEventListener( 'click', handleScrollUp );
                next.removeEventListener( 'click', handleScrollDown );
            }
        }
    } );

    useEffect( () => {
        console.log( 'Has rendered. ', 'DateList' );
    } );

    return (
        <List reference={listRef}>
            <ContentBox ref={contentRef}>

                <GenreInit />
                <FundInit />
                <DateInit
                    process={init.dates.process}
                    mode={init.dates.mode}
                    entriesMode={entriesMode()}
                />

                <PrevButton reference={prevRef} />

                <ul>
                    {dates.map( aDate => (
                        <ADate
                            key={aDate.data.date}
                            aDate={aDate}
                            reference={aDate.uiux.isTheCentral ? centralRef : null}
                        /> 
                    ) )}
                </ul>

                <NextButton reference={nextRef} />

            </ContentBox>
        </List>
    );
}
export default DateList;