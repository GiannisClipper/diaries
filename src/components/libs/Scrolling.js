import React, { useEffect } from 'react';

function Scrolling( { outer, inner, prev, next, doScrollUp, doScrollDown } ) {

    const scroll = event => {
        event.stopPropagation();

        outer.scrollTop < outer.getAttribute( 'data-scrollTop' )
            ? scrollUp( event )
            : scrollDown( event );
    }

    const scrollUp = event => {
        outer.setAttribute( 'data-direction', 'up' );
        outer.setAttribute( 'data-scrollTop', outer.scrollTop );
        inner.setAttribute( 'data-offsetHeight', inner.offsetHeight );

        const outerBounds = outer.getBoundingClientRect();
        const { top, height } = prev.getBoundingClientRect();

        if ( top + ( height * 0.1 ) > outerBounds.top || event.type === 'click' ) {
            doScrollUp();
        }
    }

    const scrollDown = event => {
        outer.setAttribute( 'data-direction', 'down' );
        outer.setAttribute( 'data-scrollTop', outer.scrollTop );
        inner.setAttribute( 'data-offsetHeight', inner.offsetHeight );

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
            const direction = outer.getAttribute( 'data-direction' );

            if ( direction === 'up' ) {
                const scrollTop = outer.getAttribute( 'data-scrollTop' );  
                // pixels scrolled vertically of the content of `outer` element  
                const offsetHeight = inner.getAttribute( 'data-offsetHeight' );  
                // total height -including padding, border- of `inner` element

                const offsetDiff = inner.offsetHeight - offsetHeight;
                console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>outer.scrollTop = scrollTop + offsetDiff', outer.scrollTop, scrollTop, offsetDiff ); 
                outer.scrollTop = scrollTop + offsetDiff;
            }

            outer.setAttribute( 'data-direction', '' );
            outer.setAttribute( 'data-scrollTop', outer.scrollTop );
            inner.setAttribute( 'data-offsetHeight', inner.offsetHeight );

            addEvents();
            return () => removeEvents();
        }
    } );

    useEffect( () => {
        console.log( 'Has rendered. ', 'Scroll' );
    } );

    return <></>;
}

export { Scrolling };
export default Scrolling;