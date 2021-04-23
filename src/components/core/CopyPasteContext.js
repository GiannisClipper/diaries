import React, { useRef, createContext, useEffect } from 'react';

const CopyPasteContext = createContext();

const CopyPasteContextProvider = ( { children } ) => {

    const memRef = useRef( {
        cut: null,
        copy: null,
    } );

    const mem = memRef.current;

    const setCut = payload => {
        mem.cut = payload;
        mem.copy = null;
    }

    const setCopy = payload => {
        mem.cut = null;
        mem.copy = payload;
    }

    const getCut = () => {
        return mem.cut;
    }

    const getCopy = () => {
        return mem.copy;
    }

    const isCut = () => {
        return mem.cut ? true : false;
    }

    const isCopy = () => {
        return mem.copy ? true : false;
    }

    //useEffect( () => console.log( 'Has rendered. ', 'CopyPasteContextProvider' ) );

    return (
        <CopyPasteContext.Provider value={ {
            setCut, 
            setCopy, 
            getCut,
            getCopy,
            isCut,
            isCopy,
        } }>
            { children }
        </CopyPasteContext.Provider>    
    )
};

export { CopyPasteContext, CopyPasteContextProvider };
