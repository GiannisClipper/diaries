import React, { useEffect, useRef, useContext } from 'react';
import '../styles/DateList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dayNames, monthNames } from '../helpers/dates';
import Form from './Form';

function DateList() {

    const STATE = useContext( STATEContext );
    const { dates } = STATE.state;

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
            STATE.dispatch( { type: 'ADD_PREV_DATES', payload: { num: 7 } } );
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
            STATE.dispatch( { type: 'ADD_NEXT_DATES', payload: { num: 7 } } );
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

    let pos = -1;

    return (
        <div className="DateEntries">
            <ul>
                { entries.map( entry => (
                    <DateEntry date={date} entry={entry} pos={++pos} />
                ) ) }
            </ul>
        </div>
    );
}

function DateEntry( { date, entry, pos } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const openForm = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_FORM',
            payload: { date, pos },
        } );
    }

    const openEntryMenu = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_MENU',
            payload: { date, pos },
        } );
    }

    const closeEntryMenu = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_MENU',
            payload: { date, pos },
        } );
    }

    const dragStart = ( event, date, pos, REF ) => {
        REF.current.dragDate = date;
        REF.current.dragPos = pos;
        event.dataTransfer.effectAllowed = 'move';
    }

    const allowDrop = event => {
        event.preventDefault();
    }

    const drop = ( event, date, pos, REF ) => {
        event.preventDefault();
        REF.current.dropDate = date;
        REF.current.dropPos = pos;
        STATE.dispatch( { 
            type: 'MOVE_ENTRY',
            payload: {
                dragDate: REF.current.dragDate,
                dropDate: REF.current.dropDate,
                dragPos: parseInt( REF.current.dragPos ),
                dropPos: parseInt( REF.current.dropPos ),
            },
        } );
    }

    return (
        <li 
            className="DateEntry"
            key={pos}
            draggable="true"
            onDragStart={event => dragStart( event, date, pos, REF )}
            onDragOver={event =>  allowDrop( event )}
            onDrop={event => drop( event, date, pos, REF )}
            onClick={event => openForm( event, date, pos )}
        >
            <div className='data'>
                {pos + date + entry.data}
            </div>

            {entry.uiux.menu.isClose ? (
                <div 
                    className='menu open'
                    onClick={event => openEntryMenu( event, date, pos )}
                >
                    [..]
                </div>
            ) : (
                <div 
                    className='menu close'
                    onClick={event => closeEntryMenu( event, date, pos )}
                >
                    []
                </div>
            ) }

            {entry.uiux.form.isOpen ? ( <Form date={date} entry={entry} pos={pos} /> ) : null}

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
