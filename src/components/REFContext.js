import React, { createContext, useRef, useEffect } from 'react';

const REFContext = createContext();

const REFContextProvider = props => {

    const initRef = useRef( {} );

    useEffect( () => {
        console.log( 'Has rendered. ', 'REFContextProvider' );
    } );

    return (
        <REFContext.Provider value={ initRef }>
            {props.children}
        </REFContext.Provider>    
    )
}

export { REFContext, REFContextProvider };