import React, { useRef, createContext, useEffect } from 'react';

const CorePasteContext = createContext();

const CorePasteContextProvider = ( { children } ) => {

    const memRef = useRef( {
        cut: null,
        copy: null,
        paste: null,
    } );

    const mem = memRef.current;

    const doCut = payload => {
        mem.cut = payload;
        mem.copy = null;
        mem.paste = null;
    }

    const doCopy = payload => {
        mem.cut = null;
        mem.copy = payload;
        mem.paste = null;
    }

    const isCut = () => {
        return mem.cut;
    }

    const isCopy = () => {
        return mem.copy;
    }

    const isPaste = () => {
        return mem.paste;
    }

    const doPaste = payload => {
        mem.paste = payload;
        const { paste } = mem.paste

        if ( isCut() ) {
            const { cutOk } = mem.cut;
            if ( cutOk ) {
                cutOk();
            }

            const data = { ...mem.cut.data, ...mem.paste.data };
            const payload = { data };
            paste( payload );

        } else if ( isCopy() ) {
            const data = { ...mem.copy.data, ...mem.paste.data };
            const payload = { data };
            paste( payload );
        }
    }

    const doPasteOk = () => {
        if ( isCut() ) {
            mem.cut = null;
        }
        if ( isPaste() ) {
            const { pasteOk } = mem.paste;
            pasteOk();
            mem.paste = null;
        }
    }

    const doPasteError = () => {
        if ( isCut() ) {
            const { cutError, data } = mem.cut;
            const payload = { data };
            cutError( payload );
            mem.cut = null;
        }
        if ( isPaste() ) {
            const { pasteError } = mem.paste;
            pasteError();
            mem.paste = null;
        }
    }

    // useEffect( () => console.log( 'Has rendered. ', 'CorePasteContextProvider' ) );

    return (
        <CorePasteContext.Provider value={ {
            doCut, 
            doCopy, 
            isCut, 
            isCopy,
            isPaste,
            doPaste,
            doPasteOk,
            doPasteError
        } }>
            { children }
        </CorePasteContext.Provider>    
    )
};

export { CorePasteContext, CorePasteContextProvider };
