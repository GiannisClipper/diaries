import React, { useContext, useEffect } from 'react';

import { FundsContext } from './FundsContext';
import assets from './assets/assets';
import FundsInit from './FundsInit';
import Fund from './Fund';

function Funds( { diary_id } ) {

    const { state, actions } = useContext( FundsContext );
    const { funds } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'payment/Funds' ) );

    let index = 0;

    return (
        <ul>
            <FundsInit 
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