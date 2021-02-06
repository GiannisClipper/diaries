import React, { useEffect } from 'react';
import { AppContextProvider } from './AppContext';
import { UsersContextProvider } from '../user/UsersContext';
import { DiariesContextProvider } from '../diary/DiariesContext';
import { GenresContextProvider } from '../payment/genre/GenresContext';
import { FundsContextProvider } from '../payment/fund/FundsContext';
import { LanguageContextProvider } from '../core/LanguageContext';
import AppStyle from './AppStyle';
import AppRoutes from './AppRoutes';

function App() {

    // useEffect( () => console.log( 'Has rendered. ', 'App' ) );

    return (
        <AppContextProvider>
        <UsersContextProvider>
        <DiariesContextProvider>
        <GenresContextProvider>
        <FundsContextProvider>
        <LanguageContextProvider>
            <AppStyle>
                <AppRoutes />
            </AppStyle>
        </LanguageContextProvider>
        </FundsContextProvider>
        </GenresContextProvider>
        </DiariesContextProvider>
        </UsersContextProvider>
        </AppContextProvider>
    );
}

export default App;
export { App };
