import React, { useRef, createContext, useEffect } from 'react';

const CopyPasteContext = createContext();

const CopyPasteContextProvider = ( { children } ) => {

    const copyPasteRef = useRef( {
        cut: null,
        copy: null,
        paste: null,
    } );

    const copyPasteMem = copyPasteRef.current;

    const doCut = payload => {
        copyPasteMem.cut = payload;
        copyPasteMem.copy = null;
        copyPasteMem.paste = null;
    }

    const doCopy = payload => {
        copyPasteMem.cut = null;
        copyPasteMem.copy = payload;
        copyPasteMem.paste = null;
    }

    const isCut = () => {
        return copyPasteMem.cut;
    }

    const isCopy = () => {
        return copyPasteMem.copy;
    }

    const doPaste = payload => {
        copyPasteMem.paste = payload;
        const { paste } = copyPasteMem.paste

        if ( isCut() ) {
            const data = { ...copyPasteMem.cut.data, ...copyPasteMem.paste.data };
            const payload = { data };
            paste( payload );

        } else if ( isCopy() ) {
            const data = { ...copyPasteMem.copy.data, ...copyPasteMem.paste.data };
            const payload = { data };
            paste( payload );
        }
    }

    const doPasteOk = () => {
        if ( isCut() ) {
            const { cutOk } = copyPasteMem.cut;
            const { pasteOk } = copyPasteMem.paste;
            if ( cutOk ) cutOk();
            if ( pasteOk ) pasteOk();
            copyPasteMem.cut = null;

        } else if ( isCopy() ) {
            const { pasteOk } = copyPasteMem.paste;
            if ( pasteOk ) pasteOk();
        }
    }

    const doPasteError = () => {
        const { pasteError } = copyPasteMem.paste;
        if ( pasteError ) pasteError();
    }

    // useEffect( () => console.log( 'Has rendered. ', 'CopyPasteContextProvider' ) );

    return (
        <CopyPasteContext.Provider value={ { 
            doCut, 
            doCopy, 
            isCut, 
            isCopy, 
            doPaste,
            doPasteOk,
            doPasteError
        } }>
            { children }
        </CopyPasteContext.Provider>    
    )
};

export { CopyPasteContext, CopyPasteContextProvider };
