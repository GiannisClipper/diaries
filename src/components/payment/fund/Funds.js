import React, { useContext, useEffect } from 'react';

import { FundsContext } from './FundsContext';
import assets from './assets/assets';
import FundsLoader from './FundsLoader';
import Fund from './Fund';

function Funds( { diary_id } ) {

    const { state, actions } = useContext( FundsContext );
    const { funds } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'payment/Funds' ) );

    let index = 0;

    return (
        <ul>
            <FundsLoader 
                diary_id={ diary_id }
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            { funds.map( fund => (
                <Fund
                    funds={ funds }
                    actions={ actions }
                    assets={ assets }
                    index={ index++ }
                    key={ index }
                />
            ) ) }
        </ul>
    );
}

export default Funds;
export { Funds };