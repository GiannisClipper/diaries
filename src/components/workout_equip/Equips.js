import React, { useContext, useEffect } from 'react';

import { EquipsContext } from './EquipsContext';
import assets from './assets/assets'; 
import EquipsLoader from './EquipsLoader';
import Equip from './Equip';

function Equips( { diary_id, lexicon } ) {

    const { state, actions } = useContext( EquipsContext );
    const { equips } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'payment/Equips' ) );

    let index = 0;

    return (
        <ul>
            <EquipsLoader 
                diary_id={ diary_id }
                state={ state }
                actions={ actions }
                assets={ assets }            
            />

            { equips.map( equip => (
                <Equip
                    equips={ equips }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                    index={ index++ }
                    key={ index }
                />
            ) ) }
        </ul>
    );
}

export default Equips;
export { Equips };