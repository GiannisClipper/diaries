import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { LanguageContext } from '../core/LanguageContext';
import lexicons from '../core/assets/languages';

import { ThemeProvider } from 'styled-components';
import { InitStyle } from '../libs/InitStyle';
import themes from './assets/themes';


const AppStyle = props => {

    const { settings } = useContext( AppContext ).state;
    const { theme, language } = settings;

    const { state, setState } = useContext( LanguageContext );

    if ( ! state.language || state.language !== language ) {
        setState( {
            language: language || 'EN',
            lexicon: lexicons[ language ] || lexicons[ 'EN' ],
        } );
    }

    useEffect( () => console.log( 'Has rendered. ', 'AppStyle', settings ) );

    return (
        <ThemeProvider theme={ themes[ theme ] || themes[ 'LIGHT' ] }>

            <InitStyle />

            { props.children }

       </ThemeProvider>
    );
}

export default AppStyle;
export { AppStyle };
