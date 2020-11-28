import React, { useRef, createContext, useEffect } from 'react';

const CopyPasteContext = createContext();

const CopyPasteContextProvider = ( { doCutPaste, doCopyPaste, children } ) => {

    const copyPasteRef = useRef( {
        cut: null,
        copy: null,  
        paste: null,
        saved: null,
    } );

    const doCut = payload => {
        copyPasteRef.current.cut = payload;
        copyPasteRef.current.copy = null;
        copyPasteRef.current.paste = null;
        copyPasteRef.current.saved = payload;
    }

    const doCopy = payload => {
        copyPasteRef.current.cut = null;
        copyPasteRef.current.copy = payload;
        copyPasteRef.current.paste = null;
        copyPasteRef.current.saved = payload;
    }

    const doPaste = payload => {
        copyPasteRef.current.paste = payload;
        const { cut, copy, paste } = copyPasteRef.current;

        if ( cut ) {
            doCutPaste( { cut, paste } );
            copyPasteRef.current.copy = { ...cut };
            copyPasteRef.current.cut = null;

        } else if ( copy ) {
            doCopyPaste( { copy, paste } );
        }
    }

    const isAbleToPaste = () => {
        return copyPasteRef.current.cut || copyPasteRef.current.copy;
    }

    useEffect( () => {
        console.log( 'Has rendered. ', 'CopyPasteContextProvider' );
    } );

    return (
        <CopyPasteContext.Provider value={{ doCut, doCopy, doPaste, isAbleToPaste }}>
            {children}
        </CopyPasteContext.Provider>    
    )
};

export { CopyPasteContext, CopyPasteContextProvider };
