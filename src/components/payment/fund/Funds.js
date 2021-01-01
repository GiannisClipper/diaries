import React, { useContext, useEffect } from 'react';

import { FundsContext } from './FundsContext';

import FundInit from './FundInit';
import Fund from './Fund';

function Funds() {

    const { state } = useContext( FundsContext );
    const { funds } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'payment/Funds' ) );

    let index = 0;

    return (
        <ul>
            <FundInit />

            { funds.map( fund => (
                <Fund 
                    index={ index++ }
                    key={ index }
                />
            ) ) }
        </ul>
    );
}

export default Funds;
export { Funds };