import React, { createContext, useRef } from 'react';

const REFContext = createContext();

const REFContextProvider = props => {

    const initRef = useRef( {
        openForm: null,
        closeForm: null,

        openMenu: null,
        closeMenu: null,

        toolMenu: null,

        date : null,
        entryPos: null,

        departDate: null,
        departEntryPos: null,

        arriveDate: null,
        arriveEntryPos: null,

        cutOrCopy: null,
    } );

    return (
        <REFContext.Provider value={ initRef }>
            {props.children}
        </REFContext.Provider>    
    )
}

export { REFContext, REFContextProvider };