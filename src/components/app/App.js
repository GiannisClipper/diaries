import React, { useState } from 'react';
import { REFContextProvider } from '../REFContext';
import { AppContextProvider } from './AppContext';
import Routes from './Routes';

function App() {

    //useEffect( () => console.log( 'Has rendered. ', 'App' ) );

    return (
        <REFContextProvider>
        <AppContextProvider>
            <Routes />
        </AppContextProvider>
        </REFContextProvider>
    );
}

export default App;
export { App };
