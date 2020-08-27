import React, { createContext, useRef } from 'react';

const REFContext = createContext();

const REFContextProvider = props => {

    const REF = useRef( {
        dragDate: null,
        dropDate: null,
        dragKey: null,
        dropKey: null,
    } );

    return (
        <REFContext.Provider value={ REF }>
            {props.children}
        </REFContext.Provider>    
    )
}

export { REFContext, REFContextProvider };