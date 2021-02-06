import React, { createContext, useState, useEffect } from 'react';

import lexicons from './assets/languages';

const LanguageContext = createContext();

const LanguageContextProvider = ( { children } ) => {

    const language = 'EN';
    const schema = {
        language,
        lexicon: lexicons[ language ],
    };

    const [ state, setState ] = useState( schema );

    useEffect( () => console.log( 'Has rendered. ', 'LanguageContextProvider' ) );

    return (
        <LanguageContext.Provider value={ { state, setState } }>
            { children }
        </LanguageContext.Provider>
    )
}

export { LanguageContext, LanguageContextProvider };