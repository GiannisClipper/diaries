import React from 'react';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import { ThemeProvider } from 'styled-components';
import { InitStyle } from './libs/InitStyle';
import { light, dark } from '../storage/themes';

import Routes from './Routes';

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
        <ThemeProvider theme={light}>
            <InitStyle />
            <Routes />
        </ThemeProvider>
        </REFContextProvider>
        </STATEContextProvider>
    );
}

export default App;
