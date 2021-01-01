import React, { useState } from 'react';
import { GenresContextProvider } from '../payment/genre/GenresContext';
import { FundsContextProvider } from '../payment/fund/FundsContext';
import { BenchContextProvider } from './BenchContext';
import Bench from './Bench';

function BenchApp() {

    //useEffect( () => console.log( 'Has rendered. ', 'BenchApp' ) );

    return (
        <GenresContextProvider>
        <FundsContextProvider>
        <BenchContextProvider>
            <Bench />
        </BenchContextProvider>
        </FundsContextProvider>
        </GenresContextProvider>
    );
}

export default BenchApp;
export { BenchApp };
