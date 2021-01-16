import React, { useContext, useEffect } from 'react';
import { AppContext } from '../app/AppContext';

import { ThemeProvider } from 'styled-components';
import { InitStyle } from '../libs/InitStyle';
import { light, dark } from './assets/themes';

const AppStyle = props => {

    const { state } = useContext( AppContext );
    const { settings } = state;
    const { theme } = settings;

    // useEffect( () => console.log( 'Has rendered. ', 'AppStyle' ) );

    return (
        <ThemeProvider theme={ theme === 'dark' ? dark : light }>

            <InitStyle />

            { props.children }

       </ThemeProvider>
    );
}

export default AppStyle;
export { AppStyle };
