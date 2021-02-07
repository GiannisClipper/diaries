import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';

import { ThemeProvider } from 'styled-components';
import { InitStyle } from '../libs/InitStyle';
import themes from './assets/themes';

const AppLoad = props => {

    const { state, actions } = useContext( AppContext );
    const { settings, _uiux } = state;
    const { theme, language } = settings;
    const { lexicon } = _uiux;

    if ( language !== lexicon.language ) {
        actions.handleLexicon( { language } );
    }

    // useEffect( () => console.log( 'Has rendered. ', 'AppLoad' ) );

    return (
        <ThemeProvider theme={ themes[ theme ] || themes[ 'LIGHT' ] }>

            <InitStyle />

            { props.children }

       </ThemeProvider>
    );
}

export default AppLoad;
export { AppLoad };
