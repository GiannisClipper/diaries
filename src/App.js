import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [ dates, setDates ] = useState( [0,1,2,3,4,5,6,7,8,9] );

    return (
        <div className="App">
            <div className="title">
                diaries
            </div>
            <List dates={dates} setDates={setDates} />
        </div>
    );
}

function List( { dates, setDates } ) {
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
            addDates( -2 );
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
            addDates( 2 );
        }
    }

    const addDates = num => {
        let newDates = new Array( Math.abs( num ) ).fill( undefined );
        const start = num < 0 ? dates[ 0 ] + num : dates[ dates.length - 1 ] + 1;
        newDates = newDates.map( ( x, index ) => start + index );
        setDates( num < 0 ? [ ...newDates, ...dates ] : [ ...dates, ...newDates ] );
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
        <div className="List frame" ref={elemRef}>
            <div className="content">
                <div className="prev">
                    Load prev...
                </div>
                <ul className="items">
                    { dates.map( item => ( <ListItem key={item} date={item} /> ) ) }
                </ul>
                <div className="next">
                    Load next...
                </div>
            </div>
        </div>
    );
}

function ListItem( { date } ) {
    return (
        <li className="ListItem">
            <ItemDate date={date} />
            <ItemContent />
        </li>
    );
}

function ItemDate( { date } ) {
    return (
        <div className="ItemDate">
            { date }
        </div>
    );
}

function ItemContent() {
    return (
        <div className="ItemContent">
            Here is the content of the item...
        </div>
    );
}

export default App;
