import React, { useRef, createContext, useEffect } from 'react';

const CopyPasteContext = createContext();

const CopyPasteContextProvider = ( { doCutPaste, doCopyPaste, children } ) => {

    const copyPasteRef = useRef( {
        cut: null,
        copy: null,
        paste: null,
        doCutPaste: doCutPaste,
        doCopyPaste: doCopyPaste,
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

    const isPasteEnabled = () => {
        return copyPasteMem.cut || copyPasteMem.copy;
    }

    const doPaste = payload => {
        copyPasteMem.paste = payload;
        const { cut, copy, paste } = copyPasteMem;

        if ( cut ) {
            doCutPaste( { cut, paste } );
            copyPasteMem.copy = { ...cut };
            copyPasteMem.cut = null;

        } else if ( copy ) {
            doCopyPaste( { copy, paste } );
        }
    }

    // useEffect( () => console.log( 'Has rendered. ', 'CopyPasteContextProvider' ) );

    return (
        <CopyPasteContext.Provider value={ { doCut, doCopy, isPasteEnabled, doPaste } }>
            { children }
        </CopyPasteContext.Provider>    
    )
};

export { CopyPasteContext, CopyPasteContextProvider };
