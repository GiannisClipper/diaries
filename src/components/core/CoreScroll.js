import { useRef, useEffect } from 'react';

function CoreScroll( { outer, inner, prev, next, doScrollUp, doScrollDown } ) {

    outer = outer || document.documentElement;

    const scrollRef = useRef( {
        direction: {},  // isUp, isDown
        scrollTop: 0,  // `outer` element: how many pixels have scrolled vertically 
        offsetHeight: 0,  // `inner` element: the total height -including padding, border
    } );

    const scrollMem = scrollRef.current;

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

        outer.scrollTop < scrollMem.scrollTop
            ? scrollUp( event )
            : scrollDown( event );
    }

    const scrollUp = event => {
        scrollMem.direction = { isUp: true };
        scrollMem.scrollTop = outer.scrollTop;

        const { bottom, height } = prev.getBoundingClientRect();

        if ( bottom > height * 0.5 || event.type === 'click' ) {
            doScrollUp();
        }
    }

    const scrollDown = event => {
        scrollMem.direction = { isDown: true };
        scrollMem.scrollTop = outer.scrollTop;

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
            const direction = scrollMem.direction;

            if ( direction.isUp ) {
                const scrollTop = scrollMem.scrollTop;  
                const offsetHeight = scrollMem.offsetHeight;
                const offsetDiff = inner.offsetHeight - offsetHeight;
                outer.scrollTop = scrollTop + offsetDiff;
            }

            scrollMem.direction = {};
            scrollMem.scrollTop = outer.scrollTop;
            scrollMem.offsetHeight = inner.offsetHeight;
    
            addEvents();
            return () => removeEvents();
        }
    } );

    // useEffect( () => console.log( 'Has rendered. ', 'CoreScroll' ) );

    return null;
}

export default CoreScroll;
export { CoreScroll };
