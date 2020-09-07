import React, { useEffect, useRef, useContext } from 'react';
import '../styles/DateList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dayNames, monthNames, dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import EntryList from './EntryList';

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
                    { dates.map( aDate => (
                        <ADate
                            key={aDate.data.date}
                            aDate={aDate}
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

const ADate = React.memo( ( { aDate } ) => {  // to differ from native function Date()

    const REF = useContext( REFContext );

    const { date, entries } = aDate.data;

    useEffect( () => {
        console.log( 'Has rendered. ', date );

        const { db } = aDate.uiux;

        if ( db.isRequesting && db.dateFrom.getTime() === date.getTime() ) {
            console.log( 'Requesting... ', date )

            const { dateFrom, dateTill } = db;
            const strFrom = dateToYYYYMMDD( dateFrom );
            const strTill = dateToYYYYMMDD( dateTill );

            const uri = `/.netlify/functions/retrieve-dates?range=${strFrom}-${strTill}`;
            const method = 'GET';

            realFetch( uri, { method } )
            .then( res => {
                alert( JSON.stringify( res ) );
                REF.current.retrieveDatesRequestDone( dateFrom, dateTill, res );
            } )
            .catch( err => {
                alert( `${err} (${method} ${uri}).` );
                console.log( `${err} (${method} ${uri}).` );
                REF.current.retrieveDatesRequestDone( dateFrom, dateTill, [] );
            } );
        }

    } );

    return (
        <li className="ADate">
            <DateInfo date={date} />
            <EntryList date={date} entries={entries} />
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

            <span className="year-month">
                { `${yearNum} ${monthName}` }
            </span>

            <span className="dateNum">
                { `${dateNum}` }
            </span>

            <span className="day">
                { `${dayName}` }
            </span>
        </div>
    );
}

export default DateList;
