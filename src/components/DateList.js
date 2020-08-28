import React, { useEffect, useRef, useContext } from 'react';
import '../styles/DateList.css';
import { DATAContext } from './DATAContext';
import { UIUXContext } from './UIUXContext';
import { REFContext } from './REFContext';
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

    let key = -1;

    return (
        <div className="DateEntries">
            <ul>
                { entries.map( entry => (
                    <DateEntry date={date} entry={entry} KEY={++key} />
                ) ) }
            </ul>
        </div>
    );
}

function DateEntry( { date, entry, KEY } ) {  // `key`, `ref` are reserved props in React. 

    const DATA = useContext( DATAContext );
    const UIUX = useContext( UIUXContext );
    const REF = useContext( REFContext );

    const openForm = event => {
        event.stopPropagation();

        UIUX.dispatch( { 
            type: 'OPEN_FORM',
            payload: {},
        } );
    }

    const openEntryMenu = ( event, date, key ) => {
        event.stopPropagation();

        UIUX.dispatch( { 
            type: 'OPEN_ENTRY_MENU',
            payload: { date, KEY },
        } );
    }

    const closeEntryMenu = event => {
        event.stopPropagation();

        UIUX.dispatch( { 
            type: 'CLOSE_ENTRY_MENU',
            payload: {},
        } );
    }

    const dragStart = ( event, date, KEY, REF ) => {
        REF.current.dragDate = date;
        REF.current.dragKey = KEY;
        event.dataTransfer.effectAllowed = 'move';
    }

    const allowDrop = event => {
        event.preventDefault();
    }

    const drop = ( event, date, KEY, REF ) => {
        event.preventDefault();
        REF.current.dropDate = date;
        REF.current.dropKey = KEY;
        DATA.dispatch( { 
            type: 'MOVE_DATE_ENTRY',
            payload: { 
                dragDate: REF.current.dragDate,
                dropDate: REF.current.dropDate,
                dragKey: parseInt( REF.current.dragKey ),
                dropKey: parseInt( REF.current.dropKey ),
            },
        } );
    }

    return (
        <li 
            className="DateEntry"
            key={KEY}
            draggable="true"
            onDragStart={event => dragStart( event, date, KEY, REF )}
            onDragOver={event =>  allowDrop( event )}
            onDrop={event => drop( event, date, KEY, REF )}
            onClick={event => openForm( event )}
        >
            <div className='data'>
                {KEY + date + entry}
            </div>

            {UIUX.state.entryMenu.isClose ? (
                <div 
                    className='menu open'
                    onClick={event => openEntryMenu( event, date, KEY )}
                >
                    [..]
                </div>
            ) : (
                <div 
                    className='menu close'
                    onClick={event => closeEntryMenu( event, date, KEY )}
                >
                    []
                </div>
            ) } 
        </li> 
    );
}

function EntryMenu( { date, entry, KEY } ) { 
    return (
        <div className='menu'>
            <div className='cut'>
                Cut
            </div>
            <div className='copy'>
                Copy
            </div>
            <div className='Paste'>
                Paste
            </div>
            <div className='edit'>
                Edit
            </div>
            <div className='delete'>
                Del
            </div>
        </div>
    );
}

export default DateList;
