import React, { useEffect } from 'react';
import { AppContextProvider } from './AppContext';
import { UsersContextProvider } from '../users/UsersContext';
import { DiariesContextProvider } from '../diaries/DiariesContext';
import payment_genresContext from '../payment_genres/GenresContext';
import payment_fundsContext from '../payment_funds/FundsContext';
import workout_genresContext from '../workout_genres/GenresContext';
import workout_equipsContext from '../workout_equips/EquipsContext';
import AppLoad from './AppLoad';
import AppRoutes from './AppRoutes';
import { isMonth } from '@giannisclipper/date';

console.log( 'isMonth( 12 )', isMonth( 12 ) );

const PaymentGenresContextProvider = payment_genresContext.GenresContextProvider;
const PaymentFundsContextProvider = payment_fundsContext.FundsContextProvider;
const WorkoutGenresContextProvider = workout_genresContext.GenresContextProvider;
const WorkoutEquipsContextProvider = workout_equipsContext.EquipsContextProvider;

function App() {

    // useEffect( () => console.log( 'Has rendered. ', 'App' ) );

    return (
        <AppContextProvider>
        <UsersContextProvider>
        <DiariesContextProvider>
        <PaymentGenresContextProvider>
        <PaymentFundsContextProvider>
        <WorkoutGenresContextProvider>
        <WorkoutEquipsContextProvider>
            <AppLoad>
                <AppRoutes />
            </AppLoad>
        </WorkoutEquipsContextProvider>
        </WorkoutGenresContextProvider>
        </PaymentFundsContextProvider>
        </PaymentGenresContextProvider>
        </DiariesContextProvider>
        </UsersContextProvider>
        </AppContextProvider>
    );
}

export default App;
export { App };
