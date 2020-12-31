import React, { useState } from 'react';
import { BenchContextProvider } from './BenchContext';
import Bench from './Bench';

function BenchApp() {

    // useEffect( () => console.log( 'Has rendered. ', 'BenchApp' ) );

    return (
        <BenchContextProvider>
            <Bench />
        </BenchContextProvider>
    );
}

export default BenchApp;
export { BenchApp };
