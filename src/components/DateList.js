import React, { useEffect, useRef, useContext } from 'react';
import '../styles/DateList.css';
import { UIUXContext } from './UIUXContext';
import { DATAContext } from './DATAContext';
import { dayNames, monthNames } from '../helpers/dates';

function DateList() {

    const { state, dispatch } = useContext( DATAContext );
    const { dates } = state;

    const elemRef = useRef( null );
    const scrollTop = useRef( 0 );
    const scrollDirection = useRef( {} );
    const offsetHeight = useRef( 0 ); 

    const handleScroll = event => {
        event.stopPropagation();
        const frame = elemRef.current;
        if ( frame.scrollTop < scrollTop.current ) {
            handleScrollUp( frame );
        } else {
            handleScrollDown( frame );
        }
    }

    const handleScrollUp = event => {
        const frame = elemRef.current;
        scrollDirection.current = { isUp: true };
        scrollTop.current = frame.scrollTop;
        const content = frame.querySelector( '.content' );
        offsetHeight.current = content.offsetHeight;

        const prev = frame.querySelector( '.prev' );
        const frameBounds = frame.getBoundingClientRect();
        const { top, height } = prev.getBoundingClientRect();
        if ( top + ( height * 0.1 ) > frameBounds.top ) {
            dispatch( { type: 'ADD_PREV_DATES', payload: { num: 7 } } );
        }
    }

    const handleScrollDown = event => {
        const frame = elemRef.current;
        scrollDirection.current = { isDown: true };
        scrollTop.current = frame.scrollTop;
        const content = frame.querySelector( '.content' );
        offsetHeight.current = content.offsetHeight;

        const next = frame.querySelector( '.next' );
        const frameBounds = frame.getBoundingClientRect();
        const { top, height } = next.getBoundingClientRect();
        if ( top + ( height * 0.9 ) < frameBounds.bottom ) {
            dispatch( { type: 'ADD_NEXT_DATES', payload: { num: 7 } } );
        }
    }

    useEffect( () => {
        const frame = elemRef.current;
        const content = frame.querySelector( '.content' );
        const prev = frame.querySelector( '.prev' );
        const next = frame.querySelector( '.next' );

        if ( scrollDirection.current.isUp ) {
            const offsetDiff = content.offsetHeight - offsetHeight.current;
            frame.scrollTop = scrollTop.current + offsetDiff;
        }

        scrollDirection.current = {};
        scrollTop.current = frame.scrollTop;
        offsetHeight.current = content.offsetHeight;

        frame.addEventListener( 'scroll', handleScroll );
        prev.addEventListener( 'click', handleScrollUp );
        next.addEventListener( 'click', handleScrollDown );

        return () => {
            frame.removeEventListener( 'scroll', handleScroll );
            prev.removeEventListener( 'click', handleScrollUp );
            next.removeEventListener( 'click', handleScrollDown );
        }
    } );

    return (
        <div className="DateList frame" ref={elemRef}>
            <div className="content">
                <div className="prev">
                    Load prev...
                </div>
                <ul>
                    { dates.map( dateItem => ( <DateItem key={dateItem.date} dateItem={dateItem} /> ) ) }
                </ul>
                <div className="next">
                    Load next...
                </div>
            </div>
        </div>
    );
}

const DateItem = React.memo( ( { dateItem } ) => {

    useEffect( () => {
        console.log( 'Rendering ', dateItem.date );
    } );

    return (
        <li className="DateItem">
            <DateInfo date={dateItem.date} />
            <DateEntries date={dateItem.date} entries={dateItem.entries} />
        </li>
    );
} );

function DateInfo( { date } ) {
    const dayName = dayNames[ date.getDay() ];
    const dateNum = date.getDate().toString().padStart( 2, '0' );
    const monthName = monthNames[ date.getMonth() ];
    const yearNum = date.getFullYear();

    return (
        <div className="DateInfo">
            <div className="day-date">
                { `${dayName} ${dateNum}` }
            </div>
            <div className="month-year">
                { `${monthName} ${yearNum}` }
            </div>
        </div>
    );
}

function DateEntries( { date, entries } ) {

    const DATA = useContext( DATAContext );
    const UIUX = useContext( UIUXContext );
    const refer = UIUX.state;

    const openForm = event => {
        UIUX.dispatch( { 
            type: 'OPEN_FORM',
            payload: {},
        } );
    }

    const dragStart = ( event, refer, date ) => {
        refer.dragDate = date;
        refer.dragKey = event.target.getAttribute( "data-key" );
        event.dataTransfer.effectAllowed = 'move';
    }

    const allowDrop = event => {
        event.preventDefault();
    }

    const drop = ( event, refer, date ) => {
        event.preventDefault();
        refer.dropDate = date;
        refer.dropKey = event.target.getAttribute( "data-key" );
        DATA.dispatch( { 
            type: 'MOVE_DATE_ENTRY',
            payload: { 
                dragDate: refer.dragDate,
                dropDate: refer.dropDate,
                dragKey: parseInt( refer.dragKey ),
                dropKey: parseInt( refer.dropKey ),
            },
        } );
    }

    let key = -1;

    return (
        <div className="DateEntries">
            <ul>
                { entries.map( entry => (
                    <li
                        key={++key}
                        data-key={key}
                        draggable="true"
                        onDragStart={event => dragStart( event, refer, date )}
                        onDragOver={event =>  allowDrop( event )}
                        onDrop={event => drop( event, refer, date )}
                        onClick={event => openForm( event )}
                    >
                        {key + date + entry}
                    </li> 
                ) ) }
            </ul>
        </div>
    );
}

export default DateList;
