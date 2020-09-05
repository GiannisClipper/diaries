import React, { createContext, useRef } from 'react';

const REFContext = createContext();

const REFContextProvider = props => {

    const initRef = useRef( {} );

    return (
        <REFContext.Provider value={ initRef }>
            {props.children}
        </REFContext.Provider>    
    )
}

export { REFContext, REFContextProvider };