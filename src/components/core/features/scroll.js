function scrollFeature( { outer, inner, prev, next, scrollMem, doScrollUp, doScrollDown, disabled } ) {

    outer = outer || document.documentElement;

    const scrollUp = event => {
        scrollMem.direction = { isUp: true };
        scrollMem.scrollTop = outer.scrollTop;

        const scrollTop = outer.scrollTop;
        const clientHeight = outer.clientHeight;

        if ( scrollTop < clientHeight * 0.1 || event.type === 'click' ) {
            doScrollUp();
        }
    }

    const scrollDown = event => {
        scrollMem.direction = { isDown: true };
        scrollMem.scrollTop = outer.scrollTop;

        const scrollHeight = outer.scrollHeight;
        const scrollTop = outer.scrollTop;
        const clientHeight = outer.clientHeight;

        if ( scrollHeight - scrollTop < clientHeight * 1.1 || event.type === 'click' ) {
            doScrollDown();
        }
    }

    const scrollUpOrDown = event => {
        outer.scrollTop < scrollMem.scrollTop
            ? scrollUp( event )
            : scrollDown( event );
    }

    const addEvents = () => {
        outer === document.documentElement
            ? document.addEventListener( 'scroll', scrollUpOrDown )
            : outer.addEventListener( 'scroll', scrollUpOrDown );
        prev.addEventListener( 'click', scrollUp );
        next.addEventListener( 'click', scrollDown );
    }

    const removeEvents = () => {
        outer === document.documentElement
            ? document.removeEventListener( 'scroll', scrollUpOrDown )
            : outer.removeEventListener( 'scroll', scrollUpOrDown );
        prev.removeEventListener( 'click', scrollUp );
        next.removeEventListener( 'click', scrollDown );
    }

    if ( ! disabled ) {
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

    } else {
        removeEvents();
    }
}

export default scrollFeature;
export { scrollFeature };
