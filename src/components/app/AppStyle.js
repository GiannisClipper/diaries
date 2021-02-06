import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';

import { ThemeProvider } from 'styled-components';
import { InitStyle } from '../libs/InitStyle';
import themes from './assets/themes';


const AppStyle = props => {

    const { settings } = useContext( AppContext ).state;
    const { theme } = settings;

    // useEffect( () => console.log( 'Has rendered. ', 'AppStyle' ) );

    return (
        <ThemeProvider theme={ themes[ theme ] || themes[ 'LIGHT' ] }>

            <InitStyle />

            { props.children }

       </ThemeProvider>
    );
}

export default AppStyle;
export { AppStyle };
