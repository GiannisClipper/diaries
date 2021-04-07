import React, { useEffect } from 'react';
import { AppContextProvider } from './AppContext';
import { UsersContextProvider } from '../user/UsersContext';
import { DiariesContextProvider } from '../diary/DiariesContext';
import paymentGenresContext from '../payment/genre/GenresContext';
import paymentFundsContext from '../payment/fund/FundsContext';
import workoutGenresContext from '../workout/genre/GenresContext';
import workoutEquipsContext from '../workout/equip/EquipsContext';
import AppLoad from './AppLoad';
import AppRoutes from './AppRoutes';

const PaymentGenresContextProvider = paymentGenresContext.GenresContextProvider;
const PaymentFundsContextProvider = paymentFundsContext.FundsContextProvider;
const WorkoutGenresContextProvider = workoutGenresContext.GenresContextProvider;
const WorkoutEquipsContextProvider = workoutEquipsContext.EquipsContextProvider;

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
