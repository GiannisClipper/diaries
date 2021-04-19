import React, { useContext, useEffect } from 'react';

import { ListBox } from '../commons/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../commons/BlockBox';

import { AppContext } from '../app/AppContext';

import { DiariesContext } from './DiariesContext';
import assets from './assets/assets'; 
import DiariesLoader from './DiariesLoader';
import Diary from './Diary';

function Diaries( { lexicon } ) {

    const { user_id } = useContext( AppContext ).state.signin;
    const { schema } = assets;
    assets.schema = () => ( { ...schema(), user_id } );

    const { state, actions } = useContext( DiariesContext );
    const { diaries } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Diaries' ) );

    let index = 0;

    return (
        <ListBox>
            <DiariesLoader 
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            <BlockBox>
                <BlockLabel>
                    { lexicon.diaries.diaries }
                </BlockLabel>

                <BlockValue>
                    <ul>
                        { diaries.map( diary => (
                            <Diary
                                diaries={ diaries }
                                index={ index++ }
                                actions={ actions }
                                assets={ assets }
                                lexicon={ lexicon }
                                key={ index }
                            />
                        ) ) }
                    </ul>
                </BlockValue>
            </BlockBox>
        </ListBox>
    );
}

export default Diaries;
export { Diaries };