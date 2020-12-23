import React, { useState } from 'react';
import { STATEContextProvider } from '../STATEContext';
import { REFContextProvider } from '../REFContext';
import { AppContextProvider } from './AppContext';
import Routes from './Routes';

function App() {

    // useEffect( () => console.log( 'Has rendered. ', 'App' ) );

    return (
        <STATEContextProvider>
        <REFContextProvider>
        <AppContextProvider>
            <Routes />
        </AppContextProvider>
        </REFContextProvider>
        </STATEContextProvider>
    );
}

export default App;
export { App };
