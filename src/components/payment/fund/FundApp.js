import React, { useState } from 'react';
import { FundsContextProvider } from './FundsContext';
import Funds from './Funds';

function FundApp() {

    // useEffect( () => console.log( 'Has rendered. ', 'FundApp' ) );

    return (
        <FundsContextProvider>
            <Funds />
        </FundsContextProvider>
    );
}

export default FundApp;
export { FundApp };
