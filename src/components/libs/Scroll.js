import React, { useRef, createContext, useContext, useEffect } from 'react';

const ScrollContext = createContext();

const ScrollContextProvider = props => {

    const initRef = useRef( {
        direction: {},  // isUp, isDown
        scrollTop: 0,  // `outer` element: how many pixels have scrolled vertically 
        offsetHeight: 0,  // `inner` element: the total height -including padding, border
    } );

    //useEffect( () => console.log( 'Has rendered. ', 'ScrollContextProvider' ) );

    return (
        <ScrollContext.Provider value={ initRef }>
            { props.children }
        </ScrollContext.Provider>    
    )
};

function ScrollHandler( { outer, inner, prev, next, doScrollUp, doScrollDown } ) {

    outer = outer || document.documentElement;

    const scrollContext = useContext( ScrollContext );
    const scrollRef = scrollContext.current;

    const scroll = event => {
        // console.log( 
        //     outer.scrollTop, 
        //     prev.getBoundingClientRect().top, 
        //     prev.getBoundingClientRect().height, 
        //     outer.clientHeight,
        //     next.getBoundingClientRect().bottom,
        //     next.getBoundingClientRect().height,
        //     inner.scrollHeight 
        // )
        // event.stopPropagation();

        outer.scrollTop < scrollRef.scrollTop
            ? scrollUp( event )
            : scrollDown( event );
    }

    const scrollUp = event => {
        scrollRef.direction = { isUp: true };
        scrollRef.scrollTop = outer.scrollTop;

        const { bottom, height } = prev.getBoundingClientRect();

        if ( bottom > height * 0.5 || event.type === 'click' ) {
            doScrollUp();
        }
    }

    const scrollDown = event => {
        scrollRef.direction = { isDown: true };
        scrollRef.scrollTop = outer.scrollTop;

        const clientHeight = outer.clientHeight;
        const { top, height } = next.getBoundingClientRect();

        if ( top + height * 0.5 < clientHeight || event.type === 'click' ) {
            doScrollDown();
        }
    }

    const addEvents = () => {
        outer === document.documentElement
            ? document.addEventListener( 'scroll', scroll )
            : outer.addEventListener( 'scroll', scroll );
        prev.addEventListener( 'click', scrollUp );
        next.addEventListener( 'click', scrollDown );
    }

    const removeEvents = () => {
        outer === document.documentElement
            ? document.removeEventListener( 'scroll', scroll )
            : outer.removeEventListener( 'scroll', scroll );
        prev.removeEventListener( 'click', scrollUp );
        next.removeEventListener( 'click', scrollDown );
    }

    useEffect( () => {
        if ( inner ) {
            const direction = scrollRef.direction;

            if ( direction.isUp ) {
                const scrollTop = scrollRef.scrollTop;  
                const offsetHeight = scrollRef.offsetHeight;
                const offsetDiff = inner.offsetHeight - offsetHeight;
                outer.scrollTop = scrollTop + offsetDiff;
            }

            scrollRef.direction = {};
            scrollRef.scrollTop = outer.scrollTop;
            scrollRef.offsetHeight = inner.offsetHeight;
    
            addEvents();
            return () => removeEvents();
        }
    } );

    //useEffect( () => console.log( 'Has rendered. ', 'ScrollHandler' ) );

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
