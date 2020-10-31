import React from 'react';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import Routes from './Routes';

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
            <Routes />
        </REFContextProvider>
        </STATEContextProvider>
    );
}

export default App;
