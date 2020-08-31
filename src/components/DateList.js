import React, { useEffect, useState, useRef, useContext } from 'react';
import '../styles/DateList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dayNames, monthNames } from '../helpers/dates';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

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
        // if ( dates.length > 35 ) {
        //     STATE.dispatch( { type: 'REMOVE_NEXT_DATES', payload: { num: 7 } } );
        // }

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
        // if ( dates.length > 35 ) {
        //     STATE.dispatch( { type: 'REMOVE_PREV_DATES', payload: { num: 7 } } );
        // }

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
            <div>
                <span className="dateNum">
                    { `${dateNum}` }
                </span>
                <span className="day">
                    { `${dayName}` }
                </span>
            </div>
            <div className="month-year">
                { `${monthName} ${yearNum}` }
            </div>
        </div>
    );
}

function DateEntries( { date, entries } ) {

    let entryPos = -1;

    return (
        <div className="DateEntries">
            <ul>
                { entries.map( entry => (
                    <DateEntry date={date} entry={entry} entryPos={++entryPos} />
                ) ) }
            </ul>
        </div>
    );
}

function DateEntry( { date, entryPos, entry } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    REF.current.cutEntry = ( date, entryPos ) => {
        REF.current.departDate = date;
        REF.current.departEntryPos = entryPos;
        REF.current.cutOrCopy = { isCut: true };
    }

    REF.current.copyEntry = ( date, entryPos ) => {
        REF.current.departDate = date;
        REF.current.departEntryPos = entryPos;
        REF.current.cutOrCopy = { isCopy: true };
    }

    REF.current.pasteEntry = ( date, entryPos ) => {
        REF.current.arriveDate = date;
        REF.current.arriveEntryPos = entryPos;
        STATE.dispatch( { 
            type: REF.current.cutOrCopy.isCut ? 'MOVE_ENTRY' : 'COPY_ENTRY',
            payload: {
                departDate: REF.current.departDate,
                arriveDate: REF.current.arriveDate,
                departEntryPos: parseInt( REF.current.departEntryPos ),
                arriveEntryPos: parseInt( REF.current.arriveEntryPos ),
            },
        } );
        REF.current.cutOrCopy = null;
    }

    const dragStart = ( event, date, entryPos ) => {
        REF.current.cutEntry( date, entryPos );
        event.dataTransfer.effectAllowed = 'move';
    }

    const allowDrop = event => {
        event.preventDefault();
    }

    const drop = ( event, date, entryPos ) => {
        event.preventDefault();
        REF.current.pasteEntry( date, entryPos );
    }

    REF.current.openForm = ( event, date, entryPos, entry ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_FORM',
            payload: { date, entryPos, entry },
        } );
    }

    REF.current.closeForm = ( event, date, entryPos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_FORM',
            payload: { date, entryPos },
        } );
    }

    REF.current.saveEntry = ( date, entryPos, entry ) => {
        STATE.dispatch( { 
            type: 'SAVE_ENTRY',
            payload: { date, entryPos, entry },
        } );
    }

    REF.current.deleteEntry = ( date, entryPos ) => {
        STATE.dispatch( { 
            type: 'DELETE_ENTRY',
            payload: { date, entryPos },
        } );
    }

    if ( entry.data.id ) {
        return (
            <li 
                className="DateEntry"
                key={entryPos}
                draggable="true"
                onDragStart={event => dragStart( event, date, entryPos )}
                onDragOver={event => allowDrop( event )}
                onDrop={event => drop( event, date, entryPos )}
                //onDoubleClick={event => REF.current.openForm( event, date, entryPos )}
            >
                <div className='data'>
                    {entry.data.note}
                </div>

                <MenuTool date={date} entry={entry} entryPos={entryPos} />

                {entry.uiux.menu.isOpen ? ( <EntryMenu date={date} entry={entry} entryPos={entryPos} /> ) : null}

                {entry.uiux.form.isOpen ? ( <EntryForm date={date} entry={entry} entryPos={entryPos} /> ) : null}

            </li> 
        );
    } else {
        return (
            <li 
                className="DateEntry init"
                key={entryPos}
                onDragOver={event => allowDrop( event )}
                onDrop={event => drop( event, date, entryPos )}
                //onDoubleClick={event => REF.current.openForm( event, date, entryPos )}
            >
                <div className='data'>
                    {entry.data.note}
                </div>
    
                <MenuTool date={date} entry={entry} entryPos={entryPos} />
    
                {entry.uiux.menu.isOpen ? ( <EntryMenu date={date} entry={entry} entryPos={entryPos} /> ) : null}
    
                {entry.uiux.form.isOpen ? ( <EntryForm date={date} entry={entry} entryPos={entryPos} /> ) : null}
    
            </li> 
        );    
    }
}

function MenuTool( { date, entryPos, entry } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    REF.current.openMenu = ( event, date, entryPos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_MENU',
            payload: { date, entryPos },
        } );
    }

    REF.current.closeMenu = ( event, date, entryPos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_MENU',
            payload: { date, entryPos },
        } );
    }

    const menuToolRef = useRef( null );

    return (
        <div
            className='MenuTool'
            onClick={event => {
                REF.current.menuTool = menuToolRef.current;
                REF.current.openMenu( event, date, entryPos );
            }}
            ref={menuToolRef}
        >
            <FontAwesomeIcon icon={ faEllipsisH } className="icon" />
        </div>
    );
}

function EntryMenu( { date, entryPos, entry } ) {

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = entry.data.id ? `calc( ${left}px - 10em )` : `calc( ${left}px - 6em )`;
    const style = { top, left };

    if ( entry.data.id ) {
        return (
            <div className='modal EntryMenu' onClick={event => REF.current.closeMenu( event, date, entryPos )}>
                <div className='menu' style={style}>
                    <div className='edit' onClick={event => {
                        event.stopPropagation();
                        REF.current.openForm( event, date, entryPos, entry );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        Edit
                    </div>
                    <div className='delete' onClick={event => {
                        event.stopPropagation();
                        REF.current.deleteEntry( date, entryPos );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        Del
                    </div>
                    <div className='cut' onClick={event => {
                        event.stopPropagation();
                        REF.current.cutEntry( date, entryPos );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        Cut
                    </div>
                    <div className='copy' onClick={event => {
                        event.stopPropagation();
                        REF.current.copyEntry( date, entryPos );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        Copy
                    </div>
                    <div className='paste' onClick={event => {
                        event.stopPropagation();
                        if ( REF.current.cutOrCopy ) {
                            REF.current.closeMenu( event, date, entryPos );
                            REF.current.pasteEntry( date, entryPos );
                        }
                    }}>
                        Paste
                    </div>
                    <div className='close' onClick={event => {
                        event.stopPropagation();
                        REF.current.closeMenu( event, date, entryPos )
                    }}>
                        X
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='modal EntryMenu' onClick={event => REF.current.closeMenu( event, date, entryPos )}>
                <div className='menu' style={style}>
                    <div className='edit' onClick={event => {
                        event.stopPropagation();
                        REF.current.openForm( event, date, entryPos, entry );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        Edit
                    </div>
                    <div className='paste' onClick={event => {
                        event.stopPropagation();
                        if ( REF.current.cutOrCopy ) {
                            REF.current.closeMenu( event, date, entryPos );
                            REF.current.pasteEntry( date, entryPos );
                        }
                    }}>
                        Paste
                    </div>
                    <div className='close' onClick={event => {
                        event.stopPropagation();
                        REF.current.closeMenu( event, date, entryPos )
                    }}>
                        X
                    </div>
                </div>
            </div>
        );
    }
}

function EntryForm( { date, entryPos, entry } ) {

    const REF = useContext( REFContext );

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    const [ data, setData ] = useState( { ...entry.data } );

    return (
        <div className='modal EntryForm'>
            <div className='form'>
                <div className="id">
                    <span>Id:</span>
                    <input 
                        value={data.id}
                        readOnly
                    />
                </div>
                <div className="date">
                    <span>Ημ/νία:</span>
                    <input 
                        value={dateInfo}
                        readOnly
                    />
                </div>
                <div className="note">
                    <span>Σημείωμα:</span>
                    <textarea
                        rows="10"
                        cols="50"
                        maxlength="1000"
                        value={data.note}
                        onChange={event => setData( { ...data, note: event.target.value } )}
                    />
                </div>
                <div className='buttons'>
                    <span></span>
                    <button onClick={event => {
                        entry.data = { ...data };
                        REF.current.saveEntry( date, entryPos, entry );
                        REF.current.closeForm( event, date, entryPos );
                    }}>ΟΚ</button>
                    <button onClick={event => REF.current.closeForm( event, date, entryPos )}>Άκυρο</button>
                </div>
            </div>
        </div>
    );
}

export default DateList;
