import React, { useEffect, useRef, useContext } from 'react';
import '../styles/DateList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dayNames, monthNames } from '../helpers/dates';

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
        console.log( 'Just rendered ', dateItem.date );
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

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    REF.current.cutEntry = ( date, pos ) => {
        REF.current.departDate = date;
        REF.current.departPos = pos;
        REF.current.cutOrCopy = { isCut: true };
    }

    REF.current.copyEntry = ( date, pos ) => {
        REF.current.departDate = date;
        REF.current.departPos = pos;
        REF.current.cutOrCopy = { isCopy: true };
    }

    REF.current.pasteEntry = ( date, pos ) => {
        REF.current.arriveDate = date;
        REF.current.arrivePos = pos;
        STATE.dispatch( { 
            type: REF.current.cutOrCopy.isCut ? 'MOVE_ENTRY' : 'COPY_ENTRY',
            payload: {
                departDate: REF.current.departDate,
                arriveDate: REF.current.arriveDate,
                departPos: parseInt( REF.current.departPos ),
                arrivePos: parseInt( REF.current.arrivePos ),
            },
        } );
        REF.current.cutOrCopy = REF.current.cutOrCopy.isCopy ? REF.current.cutOrCopy.isCopy : null;
    }

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

    REF.current.openForm = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_FORM',
            payload: { date, pos },
        } );
    }

    REF.current.closeForm = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_FORM',
            payload: { date, pos },
        } );
    }

    const dragStart = ( event, date, pos ) => {
        REF.current.cutEntry( date, pos );
        REF.current.dragPos = pos;
        event.dataTransfer.effectAllowed = 'move';
    }

    const allowDrop = event => {
        event.preventDefault();
    }

    const drop = ( event, date, pos ) => {
        event.preventDefault();
        REF.current.pasteEntry( date, pos );
    }

    return (
        <li 
            className="DateEntry"
            key={pos}
            draggable="true"
            onDragStart={event => dragStart( event, date, pos )}
            onDragOver={event =>  allowDrop( event )}
            onDrop={event => drop( event, date, pos )}
            onClick={event => REF.current.openForm( event, date, pos )}
        >
            <div className='data'>
                {pos + entry.data}
            </div>

            <MenuTool date={date} entry={entry} pos={pos} />

            {entry.uiux.menu.isOpen ? ( <EntryMenu date={date} entry={entry} pos={pos} /> ) : null}

            {entry.uiux.form.isOpen ? ( <EntryForm date={date} entry={entry} pos={pos} /> ) : null}

        </li> 
    );
}

function MenuTool( { date, entry, pos } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    REF.current.openMenu = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_MENU',
            payload: { date, pos },
        } );
    }

    REF.current.closeMenu = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_MENU',
            payload: { date, pos },
        } );
    }

    const menuToolRef = useRef( null );

    return (
        <div
            className='MenuTool'
            onClick={event => {
                REF.current.menuTool = menuToolRef.current;
                REF.current.openMenu( event, date, pos );
            }}
            ref={menuToolRef}
        >
            [..]
        </div>
    );
}

function EntryMenu( { date, entry, pos } ) {

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = `calc( ${left}px - 10em )`;
    const style = { top, left };

    return (
        <div className='modal' onClick={event => REF.current.closeMenu( event, date, pos )}>
            <div className='menu' style={style}>
                <div className='edit'>
                    Edit
                </div>
                <div className='delete'>
                    Del
                </div>
                <div className='cut' onClick={event => {
                    event.stopPropagation();
                    REF.current.cutEntry( date, pos );
                    REF.current.closeMenu( event, date, pos );
                }}>
                    Cut
                </div>
                <div className='copy' onClick={event => {
                    event.stopPropagation();
                    REF.current.copyEntry( date, pos );
                    REF.current.closeMenu( event, date, pos );
                }}>
                    Copy
                </div>
                <div className='paste' onClick={event => {
                    event.stopPropagation();
                    if ( REF.current.cutOrCopy ) {
                        REF.current.closeMenu( event, date, pos );
                        REF.current.pasteEntry( date, pos );
                    }
                }}>
                    Paste
                </div>
                <div className='close' onClick={event => {
                    event.stopPropagation();
                    REF.current.closeMenu( event, date, pos )
                }}>
                    X
                </div>
            </div>
        </div>
    );
}

function EntryForm( { date, entry, pos } ) {

    const REF = useContext( REFContext );

    return (
        <div className='modal' onClick={event => REF.current.closeForm( event, date, pos )}>
            <div className='form'>
                <button onClick={event => REF.current.closeForm( event, date, pos )}>close</button>
            </div>
        </div>
    );
}

export default DateList;
