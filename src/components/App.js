import React from 'react';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import { InitStyle } from './libs/InitStyle'; 
import Routes from './Routes';

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
            <InitStyle />
            <Routes />
        </REFContextProvider>
        </STATEContextProvider>
    );
}

export default App;
