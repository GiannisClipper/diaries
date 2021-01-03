import React, { useState } from 'react';
import { REFContextProvider } from '../REFContext';
import { AppContextProvider } from './AppContext';
import AppStyle from './AppStyle';
import AppRoutes from './AppRoutes';

function App() {

    //useEffect( () => console.log( 'Has rendered. ', 'App' ) );

    return (
        <REFContextProvider>
        <AppContextProvider>
            <AppStyle>
                <AppRoutes />
            </AppStyle>
        </AppContextProvider>
        </REFContextProvider>
    );
}

export default App;
export { App };
