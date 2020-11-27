import React, { useRef, createContext, useContext, useEffect } from 'react';

const ScrollContext = createContext();

// const ScrollContextProvider = props => {

//     const initRef = useRef( {
//         direction: {},  // isUp, isDown
//         scrollTop: null,  // pixels scrolled vertically of the content of `outer` element  
//         offsetHeight: null,  // total height -including padding, border- of `inner` element
//     } );

//     return (
//         <ScrollContext.Provider value={ initRef }>
//             {props.children}
//         </ScrollContext.Provider>    
//     )
// }

function ScrollHandler( { outer, inner, prev, next, doScrollUp, doScrollDown, scrollRef } ) {

//    const scrollRef = useContext( ScrollContext );
    scrollRef.direction = scrollRef.direction || {};
    scrollRef.scrollTop = scrollRef.scrollTop || 0;
    scrollRef.offsetHeight = scrollRef.offsetHeight || 0;

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

    // useEffect( () => {
    //     console.log( 'Has rendered. ', 'Scrolling' );
    // } );

    return <></>;
}

function Scrolling( { outer, inner, prev, next, doScrollUp, doScrollDown, scrollRef } ) {
    return (
        // <ScrollContextProvider>
            <ScrollHandler
                outer={outer}
                inner={inner}
                prev={prev}
                next={next}
                doScrollUp={doScrollUp}
                doScrollDown={doScrollDown}
                scrollRef={scrollRef}
            />
        // </ScrollContextProvider>
    );
}

export default Scrolling;
export { Scrolling };
