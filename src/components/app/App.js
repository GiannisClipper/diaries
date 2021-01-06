import React, { useState } from 'react';
import { REFContextProvider } from '../REFContext';
import { AppContextProvider } from './AppContext';
import { UsersContextProvider } from '../user/UsersContext';
import { DiariesContextProvider } from '../diary/DiariesContext';
import { BenchContextProvider } from '../bench/BenchContext';
import { GenresContextProvider } from '../payment/genre/GenresContext';
import { FundsContextProvider } from '../payment/fund/FundsContext';
import AppStyle from './AppStyle';
import AppRoutes from './AppRoutes';

function App() {

    //useEffect( () => console.log( 'Has rendered. ', 'App' ) );

    return (
        <REFContextProvider>
        <AppContextProvider>
        <UsersContextProvider>
        <DiariesContextProvider>
        <BenchContextProvider>
        <GenresContextProvider>
        <FundsContextProvider>
            <AppStyle>
                <AppRoutes />
            </AppStyle>
        </FundsContextProvider>
        </GenresContextProvider>
        </BenchContextProvider>
        </DiariesContextProvider>
        </UsersContextProvider>
        </AppContextProvider>
        </REFContextProvider>
    );
}

export default App;
export { App };
