import React, { useEffect, useState, useRef, useContext } from 'react';
import '../styles/DateList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dayNames, monthNames, dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt, faCut, faCamera, faClone, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';


function DateList() {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const { dates } = STATE.state;

    const elemRef = useRef( null );
    const scrollTop = useRef( 0 );
    const scrollDirection = useRef( {} );
    const offsetHeight = useRef( 0 ); 

    const handleScroll = event => {
        event.stopPropagation();
        const frame = elemRef.current;
        if ( frame.scrollTop < scrollTop.current ) {
            handleScrollUp( event );
        } else {
            handleScrollDown( event );
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
            console.log( 'add_prev_dates' )
            STATE.dispatch( { type: 'ADD_PREV_DATES', payload: { num: 7 } } );
        }
    }

    const handleScrollDown = event => {
        event.stopPropagation();
        const frame = elemRef.current;
        scrollDirection.current = { isDown: true };
        scrollTop.current = frame.scrollTop;
        const content = frame.querySelector( '.content' );
        offsetHeight.current = content.offsetHeight;

        const next = frame.querySelector( '.next' );
        const frameBounds = frame.getBoundingClientRect();
        const { top, height } = next.getBoundingClientRect();
        if ( top + ( height * 0.9 ) < frameBounds.bottom ) {
            console.log( 'add_next_dates' )
            STATE.dispatch( { type: 'ADD_NEXT_DATES', payload: { num: 7 } } );
        }
    }

    REF.current.retrieveDatesRequestDone = ( dateFrom, dateTill, dataFromDB ) => {

        STATE.dispatch( { 
            type: 'RETRIEVE_DATES_REQUEST_DONE',
            payload: { dateFrom, dateTill, dataFromDB },

        } );
    }

    useEffect( () => {
        if ( dates.length === 0 ) {
            console.log( 'add_init_dates' )
            STATE.dispatch( { type: 'ADD_INIT_DATES', payload: { num: 7 } } );
        }

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

    useEffect( () => {
        console.log( 'Has rendered. ', 'DateList' );
    } );

    return (
        <div className="DateList frame" ref={elemRef}>
            <div className="content">
                <div className="prev">
                    <FontAwesomeIcon icon={ faBackward } className="icon" />
                    Προηγούμενες ημ/νίες
                </div>
                <ul>
                    { dates.map( dateItem => (
                        <DateItem 
                            key={dateItem.data.date}
                            dateItem={dateItem}
                        /> 
                    ) ) }
                </ul>
                <div className="next">
                    Επόμενες ημ/νίες
                    <FontAwesomeIcon icon={ faForward } className="icon" />
                </div>
            </div>
        </div>
    );
}

const DateItem = React.memo( ( { dateItem } ) => {

    const REF = useContext( REFContext );

    useEffect( () => {
        const { date } = dateItem.data;
        const { request } = dateItem.uiux;
        console.log( 'Has rendered. ', date );

        if ( request.isDoing && request.dateFrom.getTime() === date.getTime() ) {
            console.log( 'Requesting... ', date )

            const { dateFrom, dateTill } = request;
            const strFrom = dateToYYYYMMDD( dateFrom );
            const strTill = dateToYYYYMMDD( dateTill );

            realFetch( `/.netlify/functions/retrieve-dates?range=${strFrom}-${strTill}`, { method: 'GET' } )
            .then( dataFromDB => {
                if ( !Array.isArray( dataFromDB ) ) {
                    throw new Error( 'Uknown error while requesting data!' );
                }
                REF.current.retrieveDatesRequestDone( dateFrom, dateTill, dataFromDB );
            } )
            .catch( err => {
                alert( err );
                REF.current.retrieveDatesRequestDone( dateFrom, dateTill, [] );
            } );
        }

    } );

    return (
        <li className="DateItem">
            <DateInfo date={dateItem.data.date} />
            {dateItem.uiux.request.isDoing
                ?  <div className="loader"></div> 
                : <DateEntries date={dateItem.data.date} entries={dateItem.data.entries} />
            }
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

function DateEntry( { date, entry, entryPos } ) {

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

    REF.current.requestingForm = ( date, entryPos, entry ) => {

        STATE.dispatch( { 
            type: 'REQUESTING_ENTRY_FORM',
            payload: { date, entryPos, entry },
        } );
    }

    REF.current.createEntryRequestDone = ( date, entryPos, dataFromDB ) => {

        STATE.dispatch( { 
            type: 'CREATE_ENTRY_REQUEST_DONE',
            payload: { date, entryPos, dataFromDB },
        } );
    }

    REF.current.deleteEntry = ( date, entryPos ) => {
        STATE.dispatch( { 
            type: 'DELETE_ENTRY',
            payload: { date, entryPos },
        } );
    }

    const className = entry.data.id ? 'DateEntry' : 'DateEntry init';
    const draggable = entry.data.id ? 'true' : 'false';
    const onDragStart = entry.data.id ? event => dragStart( event, date, entryPos ) : null;

    return (
        <li 
            className={className}
            key={entryPos}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragOver={event => allowDrop( event )}
            onDrop={event => drop( event, date, entryPos )}
            //onDoubleClick={event => REF.current.openForm( event, date, entryPos )}
        >
            <div className='data'>
                {entryPos + '/' + entry.data.id + '/' + entry.data.note}
            </div>

            <MenuTool date={date} entry={entry} entryPos={entryPos} />

            {entry.uiux.menu.isOpen ? ( <EntryMenu date={date} entry={entry} entryPos={entryPos} /> ) : null}

            {entry.uiux.form.isOpen ? ( <EntryForm date={date} entry={entry} entryPos={entryPos} /> ) : null}

        </li> 
    );
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
                        <FontAwesomeIcon icon={ faEdit } className="icon" title="Επεξεργασία" />
                    </div>
                    <div className='delete' onClick={event => {
                        event.stopPropagation();
                        REF.current.deleteEntry( date, entryPos );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        <FontAwesomeIcon icon={ faTrashAlt } className="icon" title="Διαγραφή" />
                    </div>
                    <div className='cut' onClick={event => {
                        event.stopPropagation();
                        REF.current.cutEntry( date, entryPos );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        <FontAwesomeIcon icon={ faCut } className="icon" title="Αποκοπή" />
                    </div>
                    <div className='copy' onClick={event => {
                        event.stopPropagation();
                        REF.current.copyEntry( date, entryPos );
                        REF.current.closeMenu( event, date, entryPos );
                    }}>
                        <FontAwesomeIcon icon={ faCamera } className="icon" title="Αντιγραφή" />
                    </div>
                    <div className='paste' onClick={event => {
                        event.stopPropagation();
                        if ( REF.current.cutOrCopy ) {
                            REF.current.closeMenu( event, date, entryPos );
                            REF.current.pasteEntry( date, entryPos );
                        }
                    }}>
                        <FontAwesomeIcon icon={ faClone } className="icon" title="Επικόλληση" />
                    </div>
                    <div className='close' onClick={event => {
                        event.stopPropagation();
                        REF.current.closeMenu( event, date, entryPos )
                    }}>
                        <FontAwesomeIcon icon={ faTimes } className="icon" title="Κλείσιμο" />
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
                        <FontAwesomeIcon icon={ faEdit } className="icon" title="Επεξεργασία" />
                    </div>
                    <div className='paste' onClick={event => {
                        event.stopPropagation();
                        if ( REF.current.cutOrCopy ) {
                            REF.current.closeMenu( event, date, entryPos );
                            REF.current.pasteEntry( date, entryPos );
                        }
                    }}>
                        <FontAwesomeIcon icon={ faClone } className="icon" title="Επικόλληση" />
                    </div>
                    <div className='close' onClick={event => {
                        event.stopPropagation();
                        REF.current.closeMenu( event, date, entryPos )
                    }}>
                        <FontAwesomeIcon icon={ faTimes } className="icon" title="Κλείσιμο" />
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

    useEffect( () => {

        if ( entry.uiux.form.isRequesting ) {
            console.log( 'Requesting... ', data.id )

            const dataToDB = {
                date: dateToYYYYMMDD( date ),
                note: data.note,
                entryPos: entryPos
            };

            realFetch( `/.netlify/functions/create-entry`, {
                method: 'POST',
                body: JSON.stringify( dataToDB )
            } )
            .then( res => {
                alert( JSON.stringify( res ) );
                const dataFromDB = { ...dataToDB, _id: res.insertedId };
                REF.current.createEntryRequestDone( date, entryPos, dataFromDB );
            } )
            .catch( err => { 
                alert( err );
                REF.current.createEntryRequestDone( date, entryPos, {} );
            } );
        }

    } );
    
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
                        REF.current.requestingForm( date, entryPos, entry );
                        //REF.current.closeForm( event, date, entryPos );
                    }}>
                        {entry.uiux.form.isRequesting 
                            ? <div className="loader icon"></div> 
                            : <FontAwesomeIcon icon={ faCheck } className="icon" />}
                        ΟΚ
                    </button>
                    <button
                        onClick={event => REF.current.closeForm( event, date, entryPos )}
                    >
                        <FontAwesomeIcon icon={ faTimes } className="icon" />
                        Άκυρο
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DateList;
