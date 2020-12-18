import React, { useRef, createContext, useContext, useEffect } from 'react';

const ScrollContext = createContext();

const ScrollContextProvider = props => {

    const initRef = useRef( {
        direction: {},  // isUp, isDown
        scrollTop: 0,  // pixels scrolled vertically of the content of `outer` element  
        offsetHeight: 0,  // total height -including padding, border- of `inner` element
    } );

    useEffect( () => {
        console.log( 'Has rendered. ', 'ScrollContextProvider' );
    } );

    return (
        <ScrollContext.Provider value={ initRef }>
            {props.children}
        </ScrollContext.Provider>    
    )
};

function ScrollHandler( { outer, inner, prev, next, doScrollUp, doScrollDown } ) {

    const scrollContext = useContext( ScrollContext );
    const scrollRef = scrollContext.current;

    const scroll = event => {
        event.stopPropagation();

        outer.scrollTop < scrollRef.scrollTop
            ? scrollUp( event )
            : scrollDown( event );
    }

    const scrollUp = event => {
        scrollRef.direction = { isUp: true };
        scrollRef.scrollTop = outer.scrollTop;

        const outerBounds = outer.getBoundingClientRect();
        const { top, height } = prev.getBoundingClientRect();

        if ( top + ( height * 0.1 ) > outerBounds.top || event.type === 'click' ) {
            doScrollUp();
        }
    }

    const scrollDown = event => {
        scrollRef.direction = { isDown: true };
        scrollRef.scrollTop = outer.scrollTop;

        const outerBounds = outer.getBoundingClientRect();
        const { top, height } = next.getBoundingClientRect();

        if ( top + ( height * 0.9 ) < outerBounds.bottom || event.type === 'click' ) {
            doScrollDown();
        }
    }

    const addEvents = () => {
        outer.addEventListener( 'scroll', scroll );
        prev.addEventListener( 'click', scrollUp );
        next.addEventListener( 'click', scrollDown );
    }

    const removeEvents = () => {
        outer.removeEventListener( 'scroll', scroll );
        prev.removeEventListener( 'click', scrollUp );
        next.removeEventListener( 'click', scrollDown );
    }

    useEffect( () => {
        if ( outer ) {
            const direction = scrollRef.direction;

            if ( direction.isUp ) {
                console.log( 'scrollRef.offsetHeight', scrollRef.offsetHeight )
                console.log( 'inner.offsetHeight', inner.offsetHeight )

                const scrollTop = scrollRef.scrollTop;  
                const offsetHeight = scrollRef.offsetHeight;
                const offsetDiff = inner.offsetHeight - offsetHeight;
                outer.scrollTop = scrollTop + offsetDiff;
            }

            scrollRef.direction = {};
            scrollRef.scrollTop = outer.scrollTop;
            scrollRef.offsetHeight =inner.offsetHeight;
    
            addEvents();
            return () => removeEvents();
        }
    } );

    useEffect( () => {
        console.log( 'Has rendered. ', 'ScrollHandler' );
    } );

    return null;
}

function Scroll( { outer, inner, prev, next, doScrollUp, doScrollDown, scrollRef } ) {
    return (
        <ScrollContextProvider>
            <ScrollHandler
                outer={outer}
                inner={inner}
                prev={prev}
                next={next}
                doScrollUp={doScrollUp}
                doScrollDown={doScrollDown}
                scrollRef={scrollRef}
            />
        </ScrollContextProvider>
    );
}

export default Scroll;
export { Scroll };
