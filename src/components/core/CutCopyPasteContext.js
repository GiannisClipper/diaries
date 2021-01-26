import React, { useRef, createContext, useEffect } from 'react';

const CutCopyPasteContext = createContext();

const CutCopyPasteContextProvider = ( { children } ) => {

    const memRef = useRef( {
        cut: null,
        copy: null,
        paste: null,
    } );

    const mem = memRef.current;

    const setCut = payload => {
        mem.cut = payload;
        mem.copy = null;
        mem.paste = null;
    }

    const setCopy = payload => {
        mem.cut = null;
        mem.copy = payload;
        mem.paste = null;
    }

    const setPaste = payload => {
        mem.paste = payload;
    }

    const getCut = () => {
        return mem.cut;
    }

    const getCopy = () => {
        return mem.copy;
    }

    const getPaste = () => {
        return mem.paste;
    }

    const setPasteProcess = () => {
        if ( getCut() ) {
            const { cutOk } = mem.cut;
            if ( cutOk ) {
                cutOk();
            }
        }

        const data = getCut()
            ? { ...mem.cut.data, ...mem.paste.data }
            : getCopy()
            ? { ...mem.copy.data, ...mem.paste.data }
            : null;

        const { paste } = mem.paste;
        const payload = { data };
        paste( payload );
    }

    const setPasteOk = () => {
        mem.cut = null;
        const { pasteOk } = mem.paste;
        pasteOk();
        mem.paste = null;
    }

    const setPasteError = () => {
        if ( getCut() ) {
            const { cutError, data } = mem.cut;
            if ( cutError ) {
                const payload = { data };
                cutError( payload );
            }
            mem.cut = null;
        }

        const { pasteError } = mem.paste;
        pasteError();
        mem.paste = null;
    }

    // useEffect( () => console.log( 'Has rendered. ', 'CutCopyPasteContextProvider' ) );

    return (
        <CutCopyPasteContext.Provider value={ {
            setCut, 
            setCopy, 
            setPaste,
            getCut, 
            getCopy,
            getPaste,
            setPasteProcess,
            setPasteOk,
            setPasteError,
        } }>
            { children }
        </CutCopyPasteContext.Provider>    
    )
};

export { CutCopyPasteContext, CutCopyPasteContextProvider };
